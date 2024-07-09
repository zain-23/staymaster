import mongoose, { Schema } from "mongoose";

const roomStatusSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ROOM_STATUS =
  mongoose.models.Roomstatus || mongoose.model("Roomstatus", roomStatusSchema);
