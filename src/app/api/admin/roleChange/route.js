import User from "@/app/models/updatedUser";
import { connectToDB } from "@/app/utils/database";
import bcrypt from "bcrypt";
import crypto from "crypto"; // To generate a random password
import { authenticateAdmin } from "@/app/middleware/authenticateAdmin"; // Import your middleware
import nodemailer from "nodemailer" // Import nodemailer for email functionality

// Function to send the role update email
const sendRoleChangeEmail = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail or any other email service provider
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email
      pass: process.env.EMAIL_PASS, // Use environment variable for password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email from environment variable
    to: email, // Receiver's email
    subject: 'Role Update: Admin Access Granted',
    text: `
      Hello,

      Your role has been updated to "Admin" on Esummit 2k24 IIITP website.

      You can now sign in with the following credentials:
      Email: ${email}
      Password: ${password}  

      Now you can get all type of transaction history and have access to demote or promote any user to admin role. Utilize this role properly and also you can verify transactions also.
      Please keep your credentials safe.
      Best regards,
      Esummit 2k24 IIITP Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// PUT route to handle role change
export const PUT = async (req) => {
  try {
    authenticateAdmin(req);

    const { userId, newRole } = await req.json();

    if (!userId || !newRole) {
      return new Response(JSON.stringify({ error: "Missing userId or newRole." }), { status: 401 });
    }

    if (!["user", "admin"].includes(newRole)) {
      return new Response(JSON.stringify({ error: "Invalid role provided." }), { status: 402 });
    }

    if (req.user.userId === userId && newRole !== "admin") {
      return new Response(
        JSON.stringify({ error: "Admins cannot demote themselves." }),
        { status: 403 }
      );
    }

    await connectToDB();
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), { status: 405 });
    }

    if (user.role === "superadmin") {
      return new Response(JSON.stringify({ error: "You can't change the role of superadmin" }), { status: 408 });
    }

    let tempPassword = '';
    if (newRole === "admin" && !user.password) {
      tempPassword = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      user.password = hashedPassword;
    }

    user.role = newRole;
    await user.save();

    if (newRole === "admin" && tempPassword) {
      try {
        await sendRoleChangeEmail(user.email, tempPassword);
        return new Response(
          JSON.stringify({ message: "User role updated and email sent successfully.", user }),
          { status: 200 }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ message: "User role updated, but email sending failed.", user }),
          { status: 206 } // Partial success
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "User role updated successfully.", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), { status: 500 });
  }
};
