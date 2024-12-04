import Otp from '@/app/models/updatedOtp';
import { connectToDB } from '@/app/utils/database';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import FinalUser from '@/app/models/finalUser';

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

const generateOtp = () => {
  return crypto.randomInt(1000, 9999).toString(); // Generates a 4-digit numeric OTP
};

export const POST = async (req) => {
  try {
    await connectToDB();

    const { email, username } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required.' }),
        { status: 400 }
      );
    }

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required.' }),
        { status: 401 }
      );
    }

    // Check if the email already exists in the database
    const existingEmail= await FinalUser.findOne({ email });
    if (existingEmail) {
      return new Response(
        JSON.stringify({ error: 'Email already exists.' }),
        { status: 409 } // Conflict
      );
    }

    // Check for recent OTP requests
    const lastOtpRequest = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (
      lastOtpRequest &&
      Date.now() - new Date(lastOtpRequest.createdAt).getTime() < 60 * 1000
    ) {
      return new Response(
        JSON.stringify({
          error: 'Please wait a minute before requesting another OTP.',
        }),
        { status: 403 }
      );
    }

    // Generate OTP and expiration time
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP to the database
    const newOtp = new Otp({ email, otp, expiresAt });
    await newOtp.save();

    // Send OTP via email
    await sendOtp(email, otp);

    return new Response(
      JSON.stringify({ message: 'OTP sent successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating OTP:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      { status: 500 }
    );
  }
};
