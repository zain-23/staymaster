import mongoose, { Schema } from "mongoose";

const roomTypeSchema = new Schema(
  {
    roomType: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ROOMTYPE =
  mongoose.models.Roomtype || mongoose.model("Roomtype", roomTypeSchema);
