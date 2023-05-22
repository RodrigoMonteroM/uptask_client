import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("token");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/proyectos/:path*"],
};
