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

  const sessionToken = req.cookies.get("__Secure-next-auth.session-token") || req.cookies.get("next-auth.session-token");

  const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        token: sessionToken,
      })

  const { pathname } = req.nextUrl;

  if (singleProtectedPaths.includes(pathname)) {
    if (!token) {
      console.log("User not logged in, redirecting to /login.");
      return NextResponse.redirect(new URL("/Login", req.url));
    }
  }

  if (doubleProtectedPaths.includes(pathname)) {
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
