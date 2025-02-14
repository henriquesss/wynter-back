import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetAttempts: {
    type: Number,
    default: 0,
  },
  resetLocked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);