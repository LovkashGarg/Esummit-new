import session from 'next-session';
import { connectToDB } from '@/app/utils/database'; // Assuming you have a DB utility for fetching user data
import bcrypt from 'bcrypt';
import UpdatedUser from '@/app/models/updatedUsers';
import jwt from 'jsonwebtoken'; // Use this to generate JWT

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    // Validate input
    await connectToDB();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Check user in database
    const user = await UpdatedUser.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Account not exist' }),
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 402 }
      );
    }

    // Generate JWT token with user data and role
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, scoutId: user.scoutId, name: user.username },
      process.env.JWT_SECRET, // Replace with your JWT secret
      { expiresIn: '7d' } // JWT expiration time
    );

    // Set user session
    const handler = session();
    await handler(req, res);
    req.session.user = { id: user.id, role: user.role, scoutId: user.scoutId };

    return new Response(
      JSON.stringify({
        message: 'Sign-in successful',
        role: user.role,
        token: token, // Send token back to the client
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in sign-in:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
};
