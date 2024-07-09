import { connectDB } from "@/config/db";
import { ROOM_STATUS } from "@/model/roomstatus.model";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: Response) => {
  await connectDB();
  try {
    const { status } = await request.json();

    const roomStatus = await ROOM_STATUS.findOne({
      status,
    });

    if (roomStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "Room status already exist",
        },
        {
          status: 401,
        }
      );
    }

    const newRoomStatus = await ROOM_STATUS.create({ status });
    return NextResponse.json(
      {
        success: true,
        message: "Room status added successfully",
        data: newRoomStatus,
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
