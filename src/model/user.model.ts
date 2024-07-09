import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username already exist"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["guest", "admin", "staff"],
      default: "guest",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const USER = mongoose.models.User || mongoose.model("User", userModel);
