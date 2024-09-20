import { model, models, Schema } from "mongoose";

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
        }

    }
)

export default Transaction=models.Transaction || model("Transaction",TransactionSchema);