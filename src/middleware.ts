import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = cookies().get("session")?.value;
  const authRoutes = ["/sign-in", "/sign-up"];
  const userRoute = ["/u", "/u/room"];

  const currentPath = request.nextUrl.pathname;

  if (!session && userRoute.includes(currentPath)) {
    const absoluteUrl = new URL("/sign-in", request.nextUrl);
    return NextResponse.redirect(absoluteUrl);
  }
  const user = await getSession(session!);

  if (session && authRoutes.includes(currentPath)) {
    switch (user?.role) {
      case "admin":
        const absoluteUrl = new URL("/d", request.nextUrl);
        return NextResponse.redirect(absoluteUrl);

      default:
      case "admin":
        const absoluteUserUrl = new URL("/u", request.nextUrl);
        return NextResponse.redirect(absoluteUserUrl);
    }
  }
  // NextResponse.next();
}

export const matcher = ["/u", "/sign-in", "/sign-up"];
