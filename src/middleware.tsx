import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const userAccessToken = request.cookies.get("userAccessToken")?.value;
  let user = null;

  if (userAccessToken) {
    try {
      user = jwtDecode(userAccessToken);
    } catch (error) {
      // Handle token decoding error (invalid token)
      return NextResponse.redirect(
        new URL(`/sign-in?redirect=${pathName}`, request.url)
      );
    }
  }

  // If no token or invalid token, redirect to sign-in if not on auth routes
  if (!userAccessToken || !user) {
    if (authRoutes.includes(pathName)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${pathName}`, request.url)
    );
  }

  // If authenticated user tries to access auth routes, redirect to home
  if (authRoutes.includes(pathName)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // NOTE: this is a UX gate only (the JWT is decoded, not signature-verified);
  // the backend must authorize every API request itself.
  matcher: [
    "/user/:path*",
    "/cart",
    "/checkout/:path*",
    "/review/:path*",
    "/sign-in",
  ],
};
