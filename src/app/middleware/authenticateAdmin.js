import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req, res) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log(req);
    if (!token) {
      console.log("No token found"); // Log if no token is found
      return new Response(
        JSON.stringify({ error: "Unauthorized access" }),
        { status: 403 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded user:", req.user); // Log decoded user info

    if (req.user.role === "user") {
      console.log("User is not an admin"); // Log if user role is not admin
      return new Response(JSON.stringify({error:" Forbidden: Admins only."}),{status:401}) 
    }

    return null; // success
  } catch (error) {
    console.error("Authentication Error:", error); // Log any errors
    return new Response(JSON.stringify({error:"Unauthorized"},{status:405}))
  }
};
