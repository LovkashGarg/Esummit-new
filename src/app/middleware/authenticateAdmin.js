import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req) => {
  try {
    // Check for JWT token in the Authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Authorization token is missing." }),
        { status: 401 }
      );
    }

    // Verify JWT token and decode user data
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user from token to request
      console.log("Decoded user from JWT:", req.user);

      // Check if the user is a superadmin
      if (req.user.role === "user") {
        console.log("User is not an admin");
        return new Response(
          JSON.stringify({ error: "Only admin has access for it" }),
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
  } catch (error) {
    console.error("Authentication Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error during authentication." }),
      { status: 500 }
    );
  }
};
