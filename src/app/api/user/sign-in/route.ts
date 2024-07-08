import { USER } from "@/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export const POST = async (request: Request, response: Response) => {
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
          status: 401,
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
          status: 401,
        }
      );
    await createSession(user._id);
    return NextResponse.redirect("http://localhost:3000/d")
  } catch (error) {
    console.log(error);
  }
};
