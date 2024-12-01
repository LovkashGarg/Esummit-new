import UpdatedUser from "@/app/models/updatedUser"; // Import the UpdatedUser model
import bcrypt from "bcrypt";  // Import bcrypt for password comparison
import { connectToDB } from "@/app/utils/database";  // DB connection utility
import { sign } from "jsonwebtoken";  // For creating a JWT token
import { setCookie } from "nookies";  // Cookie utility to store the session token

const JWT_SECRET = process.env.JWT_SECRET;  // Add your secret key in env

export const POST = async (req) => {
  try {
    const { email, password } = await req.json(); // Get email and password from the request body

    console.log('Password from request:', password);  // Debug log for incoming password

    await connectToDB(); // Connect to the database

    // Find the user from the UpdatedUser model
    const user = await UpdatedUser.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404 }
      );
    }

    console.log('User password from DB:', user.password);  // Debug log for password in DB

    // If the user is an admin, check the password
    if (user.role === "admin") {
      if (!password) {
        return new Response(
          JSON.stringify({ error: "Password is required for admin." }),
          { status: 400 }
        );
      }

      // Compare the provided password with the stored password hash using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ error: "Invalid credentials." }),
          { status: 401 }
        );
      }
    }

    // Create a session token (JWT)
    const sessionToken = sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" } // Set token expiry time (1 day in this case)
    );

    // Set the session token as a cookie
    setCookie({ res: req }, "auth_token", sessionToken, {
      maxAge: 60 * 60 * 24,  // 1 day
      path: "/",
      httpOnly: true,  // Ensures it's secure and cannot be accessed via JavaScript
    });

    // Return the user data including role (for frontend usage)
    return new Response(
      JSON.stringify({
        message: "Login successful.",
        token: sessionToken,
        user: { email: user.email, role: user.role },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error." }),
      { status: 500 }
    );
  }
};
