import { connectDB } from "@/config/db";
import { ROOM_STATUS } from "@/model/roomstatus.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const status = await ROOM_STATUS.find({});
    return NextResponse.json(
      {
        success: true,
        message: "All room status get successfully",
        data: status,
      },
      {
        status: 200,    
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};
