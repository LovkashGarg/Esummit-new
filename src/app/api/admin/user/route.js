import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/utils/database";
import { authenticateAdmin } from "@/app/middleware/authenticateAdmin";
import { authenticateSuperAdmin } from "@/app/middleware/authenticateSuperAdmin";
import FinalUser from "@/app/models/finalUser";
export const GET = async (req, res) => {
  try {
    // Authenticate the admin user
    const authResponse = await authenticateAdmin(req, res);
    if (authResponse) {
      return authResponse; // Return the response if authentication fails
    }

    const { user } = req; // Extract the authenticated user from the request
    console.log("Authenticated User:", user);

    // Check if the authenticated user has the admin role
    if (!user || user.role === "user") {
      return new Response(
        JSON.stringify({ error: "Unauthorized access: Admin role required." }),
        { status: 403 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Fetch all users, excluding the `password` field for security
    const users = await FinalUser.find({}, "-password");

    // Respond with the user data
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error." }),
      { status: 500 }
    );
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

    const { email, username, scoutId ,password} = await req.json(); // Get form data

    // Validate required fields
    if (!email || !username || !password  ) {
      return new Response(JSON.stringify({ error: "All fields (email, username, password) are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Check if the user already exists
    const existingUser = await FinalUser.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a unique scoutId if not provided
    const newScoutId = scoutId || generateUniqueId();

    // Create a new user
    const user = await FinalUser.create({
      email,
      username,
      scoutId: newScoutId,
      referralUsers: [],
      referralCount: 0,
      password:hashedPassword,
      role:"user"
    });

    return new Response(JSON.stringify(user), {
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
    const authResponse = await authenticateSuperAdmin(req);
    if (authResponse) {
      return authResponse; // Return the response if authentication fails
    } // Ensure the request is from an admin or superadmin

    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required." }), { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Fetch the requesting user (admin or superadmin)
    const requestingUser = await FinalUser.findById(req.user.id);
    if (!requestingUser) {
      return new Response(JSON.stringify({ error: "Requesting user not found." }), { status: 404 });
    }

    // Fetch the user to be deleted
    const userToDelete = await FinalUser.findById(userId);
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


    // Perform the deletion
    await userToDelete.deleteOne();

    return new Response(JSON.stringify({ message: "User deleted successfully." }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

