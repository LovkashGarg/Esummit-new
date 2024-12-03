import { model, models, Schema } from "mongoose";

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true, // Ensure email is always provided
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: { 
    type: Date, 
    required: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// Create or use the existing OTP model
const Otp = models.Otp || model("Otp", OtpSchema);

export default Otp;
