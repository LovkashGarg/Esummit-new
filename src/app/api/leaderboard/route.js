import User from '@/app/models/user';
import { connectToDB } from '@/app/utils/database';
export const revalidate = 20

export const GET=async(req)=>{
  await connectToDB();

  try {
    console.log("fetching from DB")
    const leaderboard=await User.find({})
    .sort({referralCount:-1})
    .select('username referralCount image email')
    .exec();
    return new Response(JSON.stringify({ success: true, data: leaderboard }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}
