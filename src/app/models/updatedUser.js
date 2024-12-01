const { Schema, model, models } = require("mongoose");
const bcrypt = require('bcrypt');

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
    enum: ["user", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: function() {
      return this.role === "admin"; // Password is required only if role is "admin"
    },
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

// Pre-save hook to hash password if it's an admin
UpdatedUserSchema.pre('save', async function (next) {
  if (this.role === "admin" && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12); // Hash password with salt rounds (12 is recommended)
  }
  next();
});

// Pre-save hook to update referral count based on referralUsers
UpdatedUserSchema.pre('save', function (next) {
  this.referralCount = this.referralUsers.length; // Update referralCount based on referralUsers length
  next();
});


// Create or use the existing model
const UpdatedUser = models.UpdatedUser || model("UpdatedUser", UpdatedUserSchema);

export default UpdatedUser;
