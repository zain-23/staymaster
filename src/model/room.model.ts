import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    roomType: {
      type: Schema.Types.ObjectId,
      ref: "Roomtype",
      required: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Roomstatus",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ROOM = mongoose.models.Room || mongoose.model("Room", roomSchema);
