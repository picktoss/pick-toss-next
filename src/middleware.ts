/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/api/auth/[...nextauth]/auth'

interface Routes {
  [key: string]: boolean
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-in': true,
}

/**
 * TODO: protect route (Auth 적용 후 적용)
 */
export async function middleware(request: NextRequest) {
  //   const session = await auth()
  //   const exists = publicOnlyUrls[request.nextUrl.pathname]
  //   if (!session?.user.id) {
  //     if (!exists) {
  //       return NextResponse.redirect(new URL('/', request.url))
  //     }
  //   } else {
  //     if (exists) {
  //       return NextResponse.redirect(new URL('/quiz', request.url))
  //     }
  //   }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
