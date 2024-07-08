import { connectDB } from "@/config/db";
import { ApiError } from "@/lib/apiError";
import { USER } from "@/model/user.model";
import bycrpt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: Response) => {
  try {
    await connectDB();
    const { username, email, password } = await request.json();
    // check username is already exists
    const isUsernameAlreadyExist = await USER.findOne({
      username,
    });

    if (isUsernameAlreadyExist)
      return NextResponse.json(
        {
          message: "username is already exist",
          success: false,
        },
        {
          status: 401,
        }
      );

    // check email is already exists
    const isEmailAlreadyExist = await USER.findOne({
      email,
    });

    if (isEmailAlreadyExist)
      return NextResponse.json(
        {
          message: "email is already exist",
          success: false,
        },
        {
          status: 401,
        }
      );

    // hash the password
    const hashPassword = await bycrpt.hash(password, 10);

    // save user in db
    const user = await USER.create({
      username,
      email,
      password: hashPassword,
    });

    return NextResponse.json(
      {
        data: {
          username: user.username,
          email: user.email,
        },
        success: true,
        message: "user created",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
