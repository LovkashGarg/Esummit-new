import transaction from "@/app/models/transaction";
import { connectToDB } from "@/app/utils/database";


export const POST=async(req,session)=>
{

    const {transactionid,contactnumber, scoutid}=req.body;
    const {email,username}=session.user;
    try {
        await connectToDB();

        const newTransaction=new transaction(
            {
                email:email,
                contactnumber:contactnumber,
                username:username,
                transactionId:transactionid,
                referralId:scoutid
            }
        )

        await newTransaction.save();

        return new Response(JSON.stringify(newTransaction),{status:201});
    } catch (error) {
        return new Response("Failed to create new transaction",{status:500});
    }

}