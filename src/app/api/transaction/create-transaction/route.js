
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
        
        const checkUser=await Transaction.findOne(
            {
                email:email
            }
        )

        if(checkUser)
        {
            return new Response(JSON.stringify({error: 'Use another account to book ticket'}),{status:406});
        }
        const checkScoutId= await User.findOne({
            scoutId:scoutid
        })
     
        if(!checkScoutId)
        {
            return new Response(JSON.stringify({error: 'Scout Id is incorrect'}),{status:402});
        }
        const checkTransactionId= await Transaction.findOne({
            transactionId: transactionid
        })

        if(checkTransactionId)
        {
            return new Response(JSON.stringify({error: 'Transaction Id is already exists'}), {status:403});
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

        if (scoutid) {
            const referringUser = await User.findOne({ scoutId: scoutid });
      
            if (!referringUser) {
              return new Response(JSON.stringify({ error: 'Scout Id is incorrect' }), { status: 402 });
            }
      
           
            const referredUser = await User.findOne({ email });
            console.log("New referred user:", referredUser);
      
            if (referredUser) {

                if (!Array.isArray(referringUser.referralUsers)) {
                    referringUser.referralUsers = [];
                  }
      
              referringUser.referralUsers.push(referredUser._id);
              await referringUser.save();

              console.log("Updated referringUser:", referringUser);

              console.log(`Added ${referredUser._id} to ${referringUser._id}'s referralUsers list.`);
            }
          }

        return new Response(JSON.stringify(newTransaction),{status:201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new transaction",{status:500});
    }

}