import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const POST = () => {
  deleteSession();
  return NextResponse.json(
    {
      success: true,
      message: "Logout successfully",
    },
    {
      status: 200,
    }
  );
};
