import Transaction from "@/app/models/transaction";
import { connectToDB } from "@/app/utils/database";
import { getServerSession } from "next-auth";
import User from "@/app/models/user";
import { error } from "console";

export const POST = async (req) => {
  const session = await getServerSession();

  // Check for valid session
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { email, contactnumber, username, transactionid, scoutid, amount } = await req.json();

  // Input validation (add your validation logic here)
  if (!email || !transactionid || !contactnumber) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    await connectToDB();

    // Check if the user already exists in Transaction
    const existingTransaction = await Transaction.findOne({ email});
    if (existingTransaction) {

      if(existingTransaction.amount===amount)
      {
        return new Response(JSON.stringify({ error: 'Cannot book the same amount ticket twice' }), { status: 406 });
      }
    }

    // Check if the scoutId is valid
    if(scoutid)
    {
      const scoutUser = await User.findOne({ scoutId: scoutid });
      if (!scoutUser) {
        return new Response(JSON.stringify({ error: 'Scout Id is not found' }), { status: 402 });
      }
      if(scoutUser.email===email)
      {
        return new Response(JSON.stringify({
          error: 'You are not allowed to buy tickets with your own referral ID'
        }),{status:406})
      }
    }


    // Check if the transactionId is unique
    const existingTransactionId = await Transaction.findOne({ transactionId: transactionid });
    if (existingTransactionId) {
      return new Response(JSON.stringify({ error: 'Transaction Id already exists' }), { status: 403 });
    }

    // Create new transaction
    const newTransaction = new Transaction({
      email,
      contactNumber: contactnumber,
      name: username,
      transactionId: transactionid,
      referralId: scoutid || null,
      amount:amount
    });

    await newTransaction.save();

    // Update referring user
    if (scoutid) {
      const referringUser = await User.findOne({ scoutId: scoutid });
      const referredUser = await User.findOne({ email });

      if (referredUser && referringUser) {
        if (!Array.isArray(referringUser.referralUsers)) {
          referringUser.referralUsers = [];
        }
        referringUser.referralUsers.push(referredUser._id);
        await referringUser.save();
      }
    }

    return new Response(JSON.stringify(newTransaction), { status: 201 });
  } catch (error) {
    console.error("Transaction creation failed: ", error);
    return new Response(JSON.stringify({ error: "Failed to create new transaction" }), { status: 500 });
  }
};
