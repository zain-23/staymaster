import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export default async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const { userId, role, email, username } = await verifySession();
  console.log(role);
  if (
    (userId &&
      role === "admin" &&
      (currentPath.startsWith("/sign-in") ||
        currentPath.startsWith("/sign-up"))) ||
    currentPath.startsWith("/u")
  ) {
    return NextResponse.redirect(new URL("/d", request.url));
  }

  // if (
  //   (userId &&
  //     role === "guest" &&
  //     (currentPath.startsWith("/sign-in") ||
  //       currentPath.startsWith("/sign-up"))) ||
  //   currentPath.startsWith("/d")
  // ) {
  //   return NextResponse.redirect(new URL("/u", request.url));
  // }

  if (
    (!userId && currentPath.startsWith("/d")) ||
    currentPath.startsWith("/u")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/d/:path*", "/u"],
};
