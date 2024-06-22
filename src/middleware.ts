import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from 'nanoid'


export function middleware(req: NextRequest) {
  const userId = req.cookies.get('userId')

  const res = NextResponse.next()

  if (!userId) {
    res.cookies.set('userId', nanoid())
  }

  return res
}

export const config = {
  matcher: [
    /*
     Match all request paths except for the ones starting with:
     - api (API routes)
     - _next/static (static file)
     - _next/image (image optimalization files)
     - favicon.ico (favicon file)
    */

    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}