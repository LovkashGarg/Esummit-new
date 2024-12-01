import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
  scoutId: {
    type: String,
  },
  referralUsers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  referralCount: {
    type: Number,
    default: 0, // default to 0 referrals
  },
  role: {
    type: String,
    enum: ['user', 'admin','superadmin'],
    default: 'user',
  }
//   password: {
//     type: String,
//     required: function () {
//       // Only require password if the role is 'admin'
//       return this.role === 'admin';
//     },
//   },
});

// Pre-save hook to update referralCount
UserSchema.pre('save', function (next) {
  this.referralCount = this.referralUsers.length; // update referralCount based on referralUsers length
  next();
});

// Models object is given by mongoose which will store all the registered models
const User = models.User || model('User', UserSchema);

export default User;
