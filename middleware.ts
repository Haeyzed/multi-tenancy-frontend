import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const TOKEN_KEY = "central_auth_token"
const PUBLIC_PATHS = ["/login"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKEN_KEY)?.value
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
