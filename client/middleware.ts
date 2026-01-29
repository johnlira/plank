import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/garden"];
const publicRoutes = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Check if trying to access protected route without token
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token) {
    const signinUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signinUrl);
  }

  // Check if trying to access public auth routes with token
  const isPublicAuthRoute = publicRoutes.includes(pathname);

  if (isPublicAuthRoute && token) {
    const gardenUrl = new URL("/garden", request.url);
    return NextResponse.redirect(gardenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/garden/:path*", "/signin", "/signup"],
};
