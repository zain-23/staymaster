import { connectDB } from "@/config/db";
import { ROOMTYPE } from "@/model/roomtype.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const roomsTypes = await ROOMTYPE.find({});
    return NextResponse.json(
      {
        success: true,
        message: "All room types get successfully",
        data: roomsTypes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
};
