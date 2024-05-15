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

export async function middleware(request: NextRequest) {
  const session = await auth()
  const exists = publicOnlyUrls[request.nextUrl.pathname]
  // 로그인 되어 있지 않은 상태
  if (!session?.user.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // 로그인 상태
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/main', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
