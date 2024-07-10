import { USER } from "@/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { connectDB } from "@/config/db";

export const POST = async (request: Request, response: Response) => {
  await connectDB();
  try {
    const { email, password } = await request.json();
    // check user exists with this email
    const user = await USER.findOne({
      email,
    });

    if (!user)
      return NextResponse.json(
        {
          message: "email does'nt exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    // check password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        {
          message: "incorrect password",
          success: false,
        },
        {
          status: 400,
        }
      );
    await createSession({
      userId: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    });

    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/d", request.url));
    }

    // return NextResponse.json({
    //   success: true,
    //   message: "login successfully",
    //   data: {
    //     role: user.role,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
};
