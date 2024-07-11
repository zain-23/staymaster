import { ROOM } from "@/model/room.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const rooms = await ROOM.aggregate([
      {
        $lookup: {
          from: "roomtypes",
          foreignField: "_id",
          localField: "roomType",
          as: "roomCategory",
        },
      },
      {
        $lookup: {
          from: "roomstatuses",
          foreignField: "_id",
          localField: "status",
          as: "roomStatus",
        },
      },
      {
        $addFields: {
          roomStatus: { $arrayElemAt: ["$roomStatus", 0] },
          roomCategory: { $arrayElemAt: ["$roomCategory", 0] },
        },
      },
      {
        $match: {
          "roomStatus.status": "Available",
        },
      },
      {
        $project: {
          roomNumber: 1,
          price: 1,
          roomCategory: 1,
          roomStatus: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "get available rooms successfully",
        data: rooms,
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
        message: "Something went wrong while fetching available room",
      },
      {
        status: 500,
      }
    );
  }
};
