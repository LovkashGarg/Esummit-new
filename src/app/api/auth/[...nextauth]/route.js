import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

// Generate a unique referral ID
const generateUniqueId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
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
  callbacks: {
    async session({ session }) {
      // Connect to DB and fetch user
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      // Set session data
      if (sessionUser) {
        session.user.scoutId = sessionUser.scoutId;
        session.user.referralUsers = sessionUser.referralUsers.length;
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username;
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Check if the user exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // Create a new user if not already exists
        if (!userExists) {
          const random = generateUniqueId();
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            scoutId: random,
            referralUsers: [],
            referralCount: 0,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
