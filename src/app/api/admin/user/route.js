import User from "@/app/models/updatedUser";
import { connectToDB } from "@/app/utils/database";
import { authenticateAdmin } from "@/app/middleware/authenticateAdmin";

export const GET = async (req, res) => {
  try {
    // Pass 'res' to middleware for direct response handling
    const authResponse = await authenticateAdmin(req, res);
    if (authResponse) {
      return authResponse; // If response exists (like 401 or 403), return it
    }

    const { user } = req; // Now req.user should be populated
    console.log("User:-  ",user);
    if (!user || user.role === "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized access: Admin role required." }),
        { status: 403 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Fetch all users, excluding the `password` field for security
    const users = await User.find({}, "-password");

    // Respond with the user data
    return new Response(JSON.stringify({ users }), { status: 200 });
  } 
  catch (error) 
  {
    console.error("Error fetching users:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
    });
  }
};



// Generate a unique referral ID
const generateUniqueId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const POST = async (req) => {
  try {
    await connectToDB(); // Connect to the database

    const { email, username, scoutId } = await req.json(); // Get form data

    // Validate required fields
    if (!email || !username  ) {
      return new Response(JSON.stringify({ error: "All fields (email, username) are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Hash the password before saving it to the database
  
    // Generate a unique scoutId if not provided
    const newScoutId = scoutId || generateUniqueId();

    // Create a new user
    const newUser = await User.create({
      email,
      username,
    
      scoutId: newScoutId,
      referralUsers: [],
      referralCount: 0,
      role:"user"
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding user: ", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};


export const DELETE = async (req) => {
  try {
    authenticateAdmin(req); // Ensure the request is from an admin or superadmin

    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required." }), { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Fetch the requesting user (admin or superadmin)
    const requestingUser = await User.findById(req.user.userId);
    if (!requestingUser) {
      return new Response(JSON.stringify({ error: "Requesting user not found." }), { status: 404 });
    }

    // Fetch the user to be deleted
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return new Response(JSON.stringify({ error: "User to delete not found." }), { status: 404 });
    }

    // Ensure superadmin can't be deleted and admins can't delete other admins
    if (userToDelete.role === "superadmin") {
      return new Response(JSON.stringify({ error: "Cannot delete superadmin." }), { status: 403 });
    }

    if (requestingUser.role === "admin" && userToDelete.role === "admin") {
      return new Response(JSON.stringify({ error: "Admins cannot delete other admins." }), { status: 403 });
    }

    i

    // Perform the deletion
    await userToDelete.deleteOne();

    return new Response(JSON.stringify({ message: "User deleted successfully." }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), { status: 500 });
  }
};

