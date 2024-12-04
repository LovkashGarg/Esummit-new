import { connectToDB } from "@/app/utils/database";
import { authenticateSuperAdmin } from "@/app/middleware/authenticateSuperAdmin";
import nodemailer from "nodemailer"; // For sending emails
import UpdatedUser from "@/app/models/updatedUsers";
import FinalUser from "@/app/models/finalUser";

// Send email notification to the user when their role changes to "admin"
const sendRoleChangeEmail = async (email) => {
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
    subject: 'Role Update: Admin Access Granted',
    text: 
      `Hello,

      Your role has been updated to "Admin" on Esummit 2k24 IIITP website.

      You now have admin privileges. Please ensure you are aware of your responsibilities.

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

export const PUT = async (req) => {
  try {
    // Ensure the request is made by a superadmin
    const authResponse = await authenticateSuperAdmin(req);
    if (authResponse) {
      return authResponse; // Return the response if authentication fails
    }

    const { userId, newRole } = await req.json();

    if (!userId || !newRole) {
      return new Response(
        JSON.stringify({ error: "Missing userId or newRole." }),
        { status: 400 }
      );
    }

    if (!["user", "admin"].includes(newRole)) {
      return new Response(
        JSON.stringify({ error: "Invalid role provided." }),
        { status: 400 }
      );
    }

    await connectToDB();
    const user = await FinalUser.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), { status: 404 });
    }

    // Prevent changing the role of a superadmin
    if (user.role === "superadmin") {
      return new Response(
        JSON.stringify({ error: "Cannot change the role of superadmin." }),
        { status: 403 }
      );
    }

    // If promoting to admin, do not generate a password
    if (newRole === "admin" && user.role !== "admin") {
      user.role = newRole;
      await user.save();

      try {
        await sendRoleChangeEmail(user.email); // Send email notification
        return new Response(
          JSON.stringify({ message: "User role updated to admin and email sent successfully.", user }),
          { status: 200 }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ message: "User role updated, but email sending failed.", user }),
          { status: 206 } // Partial success
        );
      }
    }

    // In case the role is not being changed to admin, just update the role
    user.role = newRole;
    await user.save();

    return new Response(
      JSON.stringify({ message: "User role updated successfully.", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), { status: 500 });
  }
};
