import { NextResponse } from 'next/server';

// Define paths for single and double protection
const singleProtectedPaths = ['/cart', '/checkout, /orders'];
const doubleProtectedPaths = ['/dashboard/orders', '/dashboard/products, /dashboard/users, /dashboard/messages'];

export async function middleware(req) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const localCookie = req.cookies.has("__Secure-next-auth.session-token")
  const vercelCookie = req.cookies.has("next-auth.session-token")
  const isLogin = localCookie || vercelCookie

  const { pathname } = req.nextUrl;

  // Check for single protected pages (user must be logged in)
  if (singleProtectedPaths.includes(pathname)) {
    if (!isLogin) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Check for double protected page (user must be logged in and be an admin)
  if (doubleProtectedPaths.includes(pathname)) {
    if (!isLogin) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (!isLogin.isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow access if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/checkout', '/dashboard/:path'],
};
