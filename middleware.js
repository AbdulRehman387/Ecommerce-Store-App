import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define paths for single and double protection
const singleProtectedPaths = ["/cart", "/checkout", "/orders"];
const doubleProtectedPaths = [
  "/dashboard/orders",
  "/dashboard/products",
  "/dashboard/users",
  "/dashboard/messages",
];

export async function middleware(req) {
  // Explicitly log and handle token retrieval
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    cookieName: "__Secure-next-auth.session-token", // Explicit cookie name for production
  });

  const { pathname } = req.nextUrl;

  // Log all cookies for debugging in production
  if (process.env.NODE_ENV === "production") {
    console.log("Cookies in Production:", req.cookies.getAll());
  }

  // Handle single-protected routes (user must be logged in)
  if (singleProtectedPaths.includes(pathname)) {
    if (!token) {
      console.log("User not logged in, redirecting to /login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Handle double-protected routes (user must be logged in and an admin)
  if (doubleProtectedPaths.includes(pathname)) {
    if (!token) {
      console.log("User not logged in, redirecting to /login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!token.isAdmin) {
      console.log("User is not an admin, redirecting to /.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow access if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/orders",
    "/dashboard/orders",
    "/dashboard/products",
    "/dashboard/users",
    "/dashboard/messages",
  ],
};
