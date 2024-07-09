import { ROOM } from "@/model/room.model";

export const GET = async () => {
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
    ]);
    console.log(rooms);
  } catch (error) {}
};
