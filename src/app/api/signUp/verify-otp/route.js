import Otp from "@/app/models/updatedOtp"; // Import your OTP model
import { connectToDB } from "@/app/utils/database"; // Assuming you have a utility to connect to DB

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract email and OTP from the request body
    const { email, otp } = await req.json(); // Next.js uses req.json() for parsing JSON body

    // Check if email or OTP is missing
    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: 'Email and OTP are required.' }),
        { status: 400 }
      );
    }

    // Check OTP in the database
    const storedOtp = await Otp.findOne({ email, otp });

    if (!storedOtp) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP.' }),
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (new Date() > storedOtp.expiresAt) {
      return new Response(
        JSON.stringify({ error: 'OTP expired.' }),
        { status: 400 }
      );
    }

    // OTP is valid, proceed to next step
    return new Response(
      JSON.stringify({ message: 'OTP verified. Proceed to create password.' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      { status: 500 }
    );
  }
};
