import { model, models, Schema } from "mongoose";
import { type } from "os";
import { eventNames } from "process";

const TransactionSchema=new Schema(
    {
        date:{
            type:Date,
            default:Date.now()
        },
        email:
        {
            type:String,
            required:true
        },
        contactNumber:
        {
            type:String,
            required:true
        },
        name:
        {
            type:String,
            required:true
        },
        transactionId:
        {
            type:String,
            required:true,
        },
        referralId:{
            type:String,
        },
        amount:{
            type:String
        },
        eventNames:{
            type:[String]
        }
    }
)

const Transaction=models.Transaction || model("Transaction",TransactionSchema);

export default Transaction;