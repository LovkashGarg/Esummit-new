import Transaction from "@/app/models/transaction";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    // Search functionality parameters
    const event = searchParams.get("event");
    const eventPass = searchParams.get("eventPass");
    const username = searchParams.get("username");
    const transactionId = searchParams.get("transactionId");
    const verificationStatus = searchParams.get("verificationStatus");
    const currentPage = parseInt(searchParams.get("page")) || 1;  // Default to page 1 if not provided
    const transactionsPerPage = parseInt(searchParams.get("limit")) || 10;  // Default to 10 per page if not provided

    const query = {};

    // Add search filter conditions to query only if a filter parameter is provided
    if (event) query.eventNames = { $regex: event, $options: "i" };
    if (eventPass) query.eventPass = { $regex: eventPass, $options: "i" };
    if (username) query.name = { $regex: username, $options: "i" };
    if (transactionId) query.transactionId = { $regex: transactionId, $options: "i" };
    if (verificationStatus === "verified") query.verified = true;
    if (verificationStatus === "unverified") query.verified = false;
    // Fetch the transactions with pagination
    const transactions = await Transaction.find(query)
      .skip((currentPage - 1) * transactionsPerPage) // Skip to the appropriate page
      .limit(transactionsPerPage) // Limit the results to the page size
      .sort({ date: -1 }); // Adjust sorting as needed

    // Count the total number of matching transactions
    const total = await Transaction.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(total / transactionsPerPage);

    // Check if transactions are found and return a valid response
    if (!transactions || transactions.length === 0) {
      return new Response(JSON.stringify({ message: "No transactions found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" } // Ensure proper Content-Type header
      });
    }

    // Include verification status in the transaction data
    const transactionsWithStatus = transactions.map(transaction => ({
      ...transaction.toObject(),
      verificationStatus: transaction.verified ? 'verified' : 'unverified', // Add verification status
    }));

    // Return the transactions along with total count and total pages
    return new Response(JSON.stringify({
      transactions: transactionsWithStatus,
      total,
      totalPages
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" } // Ensure proper Content-Type header
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({
      message: "Failed to fetch transactions",
      error: error.message
    }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } // Ensure proper Content-Type header
    });
  }
};


export const POST = async (req) => {
  const session = await getServerSession();

  // Check for valid session
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { email, contactnumber, username, transactionid, scoutid, amount, eventnames } = await req.json();

  // Input validation
  if (!email || !transactionid || !contactnumber) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    await connectToDB();

    // Check if the user already exists in Transaction
    const existingTransaction = await Transaction.findOne({ email });
    if (existingTransaction && existingTransaction.amount === amount) {
      return new Response(JSON.stringify({ error: "Cannot book the same amount ticket twice" }), { status: 407});
    }

    // Validate scoutId if provided
    if (scoutid) {
      const scoutUser = await User.findOne({ scoutId: scoutid });
      if (!scoutUser) {
        return new Response(JSON.stringify({ error: "Scout ID not found" }), { status: 402 });
      }
      if (scoutUser.email === email) {
        return new Response(JSON.stringify({ error: "You cannot use your own referral ID" }), { status: 406 });
      }
    }

    // Ensure transactionId is unique
    const existingTransactionId = await Transaction.findOne({ transactionId: transactionid });
    if (existingTransactionId) {
      return new Response(JSON.stringify({ error: "Transaction ID already exists" }), { status: 403 });
    }

    // Create new transaction
    const newTransaction = new Transaction({
      email,
      contactNumber: contactnumber,
      name: username,
      transactionId: transactionid,
      referralId: scoutid || null,
      amount,
      eventNames: eventnames,
      verified: false,
    });

    await newTransaction.save();

    // Handle referral logic
    if (scoutid) {
      const referringUser = await User.findOne({ scoutId: scoutid });
      const referredUser = await User.findOne({ email });

      if (referringUser && referredUser) {
        if (!Array.isArray(referringUser.referralUsers)) {
          referringUser.referralUsers = [];
        }
        if (!referringUser.referralUsers.includes(referredUser._id)) {
          referringUser.referralUsers.push(referredUser._id);
          await referringUser.save();
        }
      }
    }

    return new Response(JSON.stringify(newTransaction), { status: 201 });
  } catch (error) {
    console.error("Transaction creation failed: ", error);
    return new Response(JSON.stringify({ error: "Failed to create new transaction" }), { status: 500 });
  }
};

export const PATCH = async (req) => {
  const { transactionId } = await req.json();

  try {
    await connectToDB();

    // Find the transaction by transactionId
    const transaction = await Transaction.findOne({ transactionId });

    if (!transaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
    }

    // Verify the transaction
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transactionId },
      { verified: true },
      { new: true, runValidators: true }
    );

    // Handle referral logic
    if (transaction.referralId) {
      const referringUser = await User.findOne({ scoutId: transaction.referralId });
      const referredUser = await User.findOne({ email: transaction.email });

      if (referringUser && referredUser) {
        if (!Array.isArray(referringUser.referralUsers)) {
          referringUser.referralUsers = [];
        }
        if (!referringUser.referralUsers.includes(referredUser._id)) {
          referringUser.referralUsers.push(referredUser._id);
          await referringUser.save();
        }
      }
    }

    return new Response(JSON.stringify({ message: "Transaction verified successfully", transaction: updatedTransaction }), { status: 200 });
  } catch (error) {
    console.error("Error updating the transaction", error);
    return new Response(JSON.stringify({ error: "Failed to update transaction" }), { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connectToDB();

    const { transactionId } = await req.json();

    // Find and delete the transaction
    const deletedTransaction = await Transaction.findOneAndDelete({ transactionId });

    if (!deletedTransaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Transaction deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction", error);
    return new Response(JSON.stringify({ error: "Failed to delete transaction" }), { status: 500 });
  }
};
