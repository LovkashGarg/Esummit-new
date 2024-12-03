const { Schema, model, models } = require("mongoose");

const UpdatedUserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  image: { type: String },
  scoutId: { type: String },
  referralUsers: { type: [Schema.Types.ObjectId], ref: 'User' },
  referralCount: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ["user", "admin","superadmin"],
    default: "user"
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

// Pre-save hook to update referral count based on referralUsers
UpdatedUserSchema.pre('save', function (next) {
  this.referralCount = this.referralUsers.length; // Update referralCount based on referralUsers length
  next();
});

// Create or use the existing model
const UpdatedUser = models.UpdatedUser || model("UpdatedUser", UpdatedUserSchema);

export default UpdatedUser;
