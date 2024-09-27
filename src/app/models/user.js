import { type } from "os";

const { Schema, model, models } = require("mongoose");

const UserSchema=new Schema({
    email:{
        type: String,
        unique:[true, 'Email already exists'],
        required:[true, 'Email is required']
    },
    username:{
        type:String,
        required:[true,'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String,
    },
    scoutId:{
        type:String,
    },
    referralUsers:{
        type:[Schema.Types.ObjectId],
        ref: 'User'
    },
    referralCount: {
        type: Number,
        default: 0, // default to 0 referrals
      },
})

UserSchema.pre('save', function (next) {
    this.referralCount = this.referralUsers.length; // update referralCount based on referralUsers length
    next();
  });
  

//Models object is given by mongoose which will store all the registered models.If a model name "user" exists it will assign that existing model to User Variable. If not then model function from mongoose is called to create new model

const User=models.User || model("User",UserSchema);

export default User;