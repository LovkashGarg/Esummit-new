import { connectToDB } from "@/app/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"; // Import JWT library
import NewUser from "@/app/models/newUser";

// Generate a unique referral ID
const generateUniqueId = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// NextAuth configuration
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callback: {
    async session({ session, token }) {
      // Connect to the database and fetch user details
      await connectToDB();
      const sessionUser = await NewUser.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
        session.user.scoutId = sessionUser.scoutId;
        session.user.role = sessionUser.role; // Add role to the session
        session.user.referralUsers = sessionUser.referralUsers.length;
        session.user.username = sessionUser.username;
        session.user.jwt = token.jwt; // Attach the JWT to the session for client-side access
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user already exists
        let user = await NewUser.findOne({ email: profile.email });

        if (!user) {
          // If the user does not exist, create a new user with the default role "user"
          const randomScoutId = generateUniqueId();
          user = await NewUser.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
            scoutId: randomScoutId,
            referralUsers: [],
            referralCount: 0,
            role: "user", // Default role
            isOAuthUser: true, // Indicate Google OAuth user
          });
        }

        const jwtToken = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
          expiresIn: "7d", // Expiration time (optional)
        });
        user.jwtToken = jwtToken;  // Save the JWT token to the user's document
        await user.save();
    
        // Log admin sign-ins
        if (user.role === "admin") {
          console.log(`Admin signed in: ${user.email}`);
          // Optionally, update admin's last login time
          user.lastLogin = new Date();
          await user.save();
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error.message);
        return false;
      }
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
