import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://img.lovepik.com/element/45001/3052.png_860.png",
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default to false for regular users
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
