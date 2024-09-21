
import Transaction from "@/app/models/transaction";
import { connectToDB } from "@/app/utils/database";
import { getServerSession } from "next-auth";
import {handler} from "@/app/api/auth/[...nextauth]/route"
import User from "@/app/models/user";
import { error } from "console";

export const POST=async(req)=>
{
const session= await getServerSession(handler)

    if(!session|| !session.user)
    {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const {email,contactnumber,username,transactionid,scoutid}=await req.json();

    try {
        await connectToDB();
        
        const checkScoutId= await User.findOne({
            scoutId:scoutid
        })
    
        if(!checkScoutId)
        {
            return new Response(JSON.stringify({error: 'Scout Id is incorrect'}),{status:402});
        }


        const newTransaction=new Transaction(
            {
                email:email,
                contactNumber:contactnumber,
                name:username,
                transactionId:transactionid,
                referralId:scoutid
            }
        )

        await newTransaction.save();

        return new Response(JSON.stringify(newTransaction),{status:201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new transaction",{status:500});
    }

}