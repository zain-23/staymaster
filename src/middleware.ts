import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = cookies().get("session")?.value;
  const authRoutes = ["/sign-in", "sign-up"];
  const userRoute = ["/u", "/u/room"];

  const currentPath = request.nextUrl.pathname;

  if (!session && userRoute.includes(currentPath)) {
    const absoluteUrl = new URL("/sign-in", request.nextUrl);
    return NextResponse.redirect(absoluteUrl);
  }

  if (session && authRoutes.includes(currentPath)) {
    const absoluteUrl = new URL("/u", request.nextUrl);
    return NextResponse.redirect(absoluteUrl);
  }
  // NextResponse.next();
}

export const matcher = ["/u", "/sign-in", "/sign-up"];
