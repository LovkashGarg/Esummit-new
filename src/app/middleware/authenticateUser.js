import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing." });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    await connectToDB();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
