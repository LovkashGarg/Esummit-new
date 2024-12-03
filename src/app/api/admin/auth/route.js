import UpdatedUser from "@/app/models/updatedUsers"; // Import the UpdatedUser model
import bcrypt from "bcrypt"; // Import bcrypt for password comparison
import { connectToDB } from "@/app/utils/database"; // DB connection utility
import { sign } from "jsonwebtoken"; // For creating a JWT token
import { setCookie } from "nookies"; // Cookie utility to store the session token

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const POST = async (req) => {
  try {
    const { email, password } = await req.json(); // Parse request body

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 }
      );
    }

    await connectToDB(); // Connect to the database

    // Find user by email
    const user = await UpdatedUser.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404 }
      );
    }

    // Validate password for admin users
    if (user.role !== "user") {
      console.log("Password from request:", password);
  console.log("Hashed password from DB:", user.password);

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  if (password===user.password) {
    return new Response(
      JSON.stringify({ error: "Invalid credentials." }),
      { status: 401 }
    );
      }
    } else {
      // For non-admin roles, customize behavior here if needed
      return new Response(
        JSON.stringify({ error: "Unauthorized access for non-admin users." }),
        { status: 403 }
      );
    }

    // Generate a session token
    const sessionToken = sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set the session token in cookies
    setCookie({ res: req }, "auth_token", sessionToken, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      httpOnly: true, // Secure cookie
    });

    // Respond with success and user info
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
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
};
