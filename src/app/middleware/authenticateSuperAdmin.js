import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import jwt from 'jsonwebtoken'
export const authenticateSuperAdmin = async (req) => {
  try {
    // Check for JWT token in the Authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user from token to request
        console.log("Decoded user from JWT:", req.user);

        if (req.user.role !== "superadmin") {
          console.log("User is not a superadmin");
          return new Response(
            JSON.stringify({ error: "Only superadmin has access for it" }),
            { status: 403 }
          );
        }

        return null; // Authentication successful with JWT
      } catch (error) {
        console.error("Invalid JWT token:", error);
        return new Response(
          JSON.stringify({ error: "Unauthorized: Invalid or expired token." }),
          { status: 401 }
        );
      }
    }

    // If no token, check NextAuth session
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== "superadmin") {
      console.log("Unauthorized: No super admin session found");
      return new Response(
        JSON.stringify({ error: "This activity is done only by super admins" }),
        { status: 403 }
      );
    }

    // Attach user from session to request
    req.user = session.user;
    console.log("User from NextAuth session:", req.user);

    return null; // Authentication successful with session
  } catch (error) {
    console.error("Authentication Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error during authentication." }),
      { status: 500 }
    );
  }
};
