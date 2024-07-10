import { ROOM } from "@/model/room.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const roomStats = await ROOM.aggregate([
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
          roomStatus: { $arrayElemAt: ["$roomStatus", 0] },
        },
      },
      {
        $project: {
          roomStatus: 1,
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: "$roomStatus.status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    console.log(roomStats);

    return NextResponse.json(
      {
        success: true,
        message: "get room stats successfully",
        data: roomStats,
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
        message: "Something went wrong when fetching room stats",
      },
      {
        status: 500,
      }
    );
  }
};
