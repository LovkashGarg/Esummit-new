import { connectToDB } from "@/app/utils/database";
import VisitorCount from "@/app/models/visitors";

export const POST = async () => {
  await connectToDB();
  try {
    let visitorRecord = await VisitorCount.findOne({});
    
    if (!visitorRecord) {
      visitorRecord = new VisitorCount({ count: 1 });
    } else {
     
      visitorRecord.count += 1;
    }

    await visitorRecord.save();

    return new Response(JSON.stringify({ count: visitorRecord.count }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};
