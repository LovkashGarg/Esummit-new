import UpdatedUser from "@/app/models/updatedUser";
import { connectToDB } from "@/app/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  callbacks: {
    async session({ session }) {
      // Connect to the database and fetch user details
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
        session.user.scoutId = sessionUser.scoutId;
        session.user.role = sessionUser.role; // Add role to the session
        session.user.referralUsers = sessionUser.referralUsers.length;
        session.user.username = sessionUser.username;
      }

      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();

        // Check if the user already exists
        let user = await User.findOne({ email: profile.email });

        if (!user) {
          // If the user does not exist, create a new user with the default role "user"
          const randomScoutId = generateUniqueId();
          user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            scoutId: randomScoutId,
            referralUsers: [],
            referralCount: 0,
            role: "user", // Default role
          });
        }

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
