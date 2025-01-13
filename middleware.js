import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const singleProtectedPaths = ["/cart", "/checkout", "/orders"];
const doubleProtectedPaths = [
  "/dashboard/orders",
  "/dashboard/products",
  "/dashboard/users",
  "/dashboard/messages",
];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl; 
  const api_key = req.headers.get("api-key")
  
  // API routes protected with API key
  if (pathname.includes("/api")) {
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }
    else if (!(api_key === process.env.NEXT_PUBLIC_API_KEY)) {
      console.log("Invalid API key");
      return Response.json({message: "Invalid API key"})
    }
  }

  // Single protected paths (e.g., /cart, /checkout, /orders)
  if (singleProtectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      console.log("User not logged in, redirecting to /login.");
      return NextResponse.redirect(new URL("/Login", req.url));
    }
  }

  // Double protected paths (e.g., /dashboard/*)
  if (doubleProtectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      console.log("User not logged in, redirecting to /login.");
      return NextResponse.redirect(new URL("/Login", req.url));
    }

    if (!token.isAdmin) {
      console.log("User is not an admin, redirecting to /.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Matcher for routes
export const config = {
  matcher: [
    "/cart",
    "/checkout/:path*",
    "/orders",
    "/dashboard/:path*",
    "/api/:path*"
  ],
};
