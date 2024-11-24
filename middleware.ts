import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  PUBLIC_ROUTES,
} from "@/routes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);


const isSessionExpired = () => {
  const tokenExpireTime = cookies().get("expiresAt")?.value
  if (!tokenExpireTime) {
    return true;
  }
  const expireTime = Number.parseInt(tokenExpireTime, 10)
  const expireTimeMs = expireTime < 1e12 ? expireTime * 1000 : expireTime;
  const isExpired = new Date().getTime() >= expireTimeMs;
  return isExpired;
}

export default auth((req) => {
  const { nextUrl } = req;
  const pathName = nextUrl.pathname
  const isProtected = pathName === "/" || pathName.includes("dashboard")

  // check for protected route and if backend JWT session is valid
  if (isProtected && isSessionExpired()) {
    const response = NextResponse.redirect(new URL("/auth/login", nextUrl));
    response.cookies.delete("expiresAt")
    response.cookies.delete("accessToken")
    response.cookies.delete("authjs.session-token")
    return response
  }

  // user already have valid JWT token but trying to access login page
  if (PUBLIC_ROUTES.includes(nextUrl.pathname) && !isSessionExpired()) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
