import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/utils/database";
import Otp from "@/app/models/updatedOtp"; // Assuming you have this model for OTP
import NewUser from "@/app/models/newUser";

const generateUniqueId = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract email and password from the request body
    const { email, password, username } = await req.json();

    // Validate input
    if (!email ) {
      return new Response(
        JSON.stringify({ error: 'Email  are required.' }),
        { status: 402 }
      );
    }
    if (!password) {
      return new Response(
        JSON.stringify({ error: 'password  are required.' }),
        { status: 402 }
      );
    }
    if (!username) {
      return new Response(
        JSON.stringify({ error: 'username are required.' }),
        { status: 402 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const randomScoutId=generateUniqueId()
    // Create the user in the database
    const user = await NewUser.create({ email, username,scoutId: randomScoutId ,password: hashedPassword});

    // Clean up OTP from the database for this email
    await Otp.deleteOne({ email }); // Remove OTP related to this email

    // Return success message with the created user data (without sensitive password)
    return new Response(
      JSON.stringify({ message: 'Account created successfully!', user: { email: user.email } }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
};
