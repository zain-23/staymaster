import { connectDB } from "@/config/db";
import { ROOMTYPE } from "@/model/roomtype.model";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: Response) => {
  await connectDB();
  try {
    const { roomType, description } = await request.json();

    const existingRoomType = await ROOMTYPE.findOne({
      roomType,
    });
    if (existingRoomType) {
      return NextResponse.json(
        {
          success: false,
          message: "This room type is already exist",
        },
        {
          status: 400,
        }
      );
    }

    const newRoom = await ROOMTYPE.create({
      roomType,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room type successfully created",
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
