import Otp from "@/app/models/updatedOtp";
import nodemailer from 'nodemailer'

const generateOtp=()=>{
    return crypto.randomInt(1000, 9999).toString();

}

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


export const POST= async (req, res) => {
    const { email } = req.body;
  
    // Check if the OTP already exists in the database for the given email
    const existingOtp = await Otp.findOne({ where: { email } });
  
    // If an OTP exists and it's still valid, don't resend it
    if (existingOtp && new Date() < existingOtp.expiresAt) {
      return res.status(400).json({ error: 'OTP is still valid. Please check your email.' });
    }
  
    // Generate a new OTP
    const otp = generateOtp();
  
    // Set OTP expiration (e.g., 5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
    // Save the new OTP in the database
    if (existingOtp) {
      // Update the existing OTP if it has expired
      await Otp.update({ otp, expiresAt }, { where: { email } });
    } else {
      // If no OTP exists, create a new record
      await Otp.create({ email, otp, expiresAt });
    }
  
    // Send OTP to user's email
    await sendOtp(email, otp);
  
    res.status(200).json({ message: 'OTP resent successfully.' });
  };
  