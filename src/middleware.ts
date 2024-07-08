import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export default async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const {
    userId: { userId },
  } = await verifySession();

  if (
    userId &&
    (currentPath.startsWith("/sign-in") || currentPath.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/d", request.url));
  }

  if (!userId && currentPath.startsWith("/d")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/d/:path*"],
};
