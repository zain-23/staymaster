import { connectDB } from "@/config/db";
import { ROOM } from "@/model/room.model";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: Response) => {
  await connectDB();
  try {
    const { roomNumber, roomType, status, price } = await request.json();

    const room = await ROOM.findOne({
      roomNumber,
    });

    if (room) {
      return NextResponse.json(
        {
          success: false,
          message: "This room number is already exists",
        },
        {
          status: 400,
        }
      );
    }

    const newRoom = await ROOM.create({
      roomNumber,
      roomType,
      status,
      price,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room added successfully",
        data: newRoom,
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
