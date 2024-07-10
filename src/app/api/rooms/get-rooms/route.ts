import { connectDB } from "@/config/db";
import { ROOM } from "@/model/room.model";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: Response) => {
  await connectDB();
  try {
    const rooms = await ROOM.aggregate([
      {
        $lookup: {
          from: "roomtypes",
          localField: "roomType",
          foreignField: "_id",
          as: "roomCategory",
        },
      },
      {
        $lookup: {
          from: "roomstatuses",
          localField: "status",
          foreignField: "_id",
          as: "roomStatus",
        },
      },
      {
        $addFields: {
          roomCategory: { $arrayElemAt: ["$roomCategory", 0] },
          roomStatus: { $arrayElemAt: ["$roomStatus", 0] },
        },
      },
      {
        $project: {
          roomNumber: 1,
          price: 1,
          roomCategory: 1,
          roomStatus: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return NextResponse.json({
      data: rooms,
      success: true,
      message: "Successfully fetch rooms",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching rooms",
      },
      {
        status: 500,
      }
    );
  }
};
