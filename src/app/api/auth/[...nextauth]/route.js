import { connectToDB } from "@/app/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"; // Import JWT library
import FinalUser from "@/app/models/finalUser";

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
      authorization: {
        params: {
          scope: "openid email profile",
        },
    }}),
  ],
  callbacks: {
    async session({ session }) {
      // Connect to the database and fetch user details
      await connectToDB();
      try {
        
        const sessionUser = await FinalUser.findOne({ email: session.user.email });
  
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.scoutId = sessionUser.scoutId;
          session.user.role = sessionUser.role; // Add role to the session
          session.user.referralUsers = sessionUser.referralUsers.length;
          session.user.username = sessionUser.username;
          session.user.jwt =sessionUser.jwtToken; // Attach the JWT to the session for client-side access
        }
  
        return session;
      } catch (error) {
        console.error("Error during session: ", error.message);
        return false;
      }
    },
    async signIn({account, profile }) {
      try {
       // Log the account and profile objects for debugging
    console.log('account:', account);
    console.log('profile:', profile);
        await connectToDB();

        const email = profile?.email || account?.email;
        if (!email) {
          console.error("Email not found in profile or account.");
          return false; // Abort sign-in if email is missing
        }

        // Check if the user already exists
        let user = await FinalUser.findOne({ email:email });
        if (!user) {
          // If the user does not exist, create a new user with the default role "user"
          const randomScoutId = generateUniqueId();
          user = await FinalUser.create({
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

        const jwtToken = jwt.sign({ email: user.email, name: user.username, role: user.role}, process.env.JWT_SECRET, {
          expiresIn: "7d", // Expiration time (optional)
        });

        user.jwtToken=jwtToken
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
