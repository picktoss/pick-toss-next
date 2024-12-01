import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/api/auth/[...nextauth]/auth'

interface Routes {
  [key: string]: boolean
}

const publicUrls: Routes = {
  '/quiz/practice': true,
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-in': true,
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(request: NextRequest) {
  const isPublicFiles = PUBLIC_FILE.test(request.nextUrl.pathname)
  if (isPublicFiles) {
    return
  }

  const session = await auth()
  const publicExists = publicUrls[request.nextUrl.pathname]
  const exists = publicOnlyUrls[request.nextUrl.pathname]
  // 로그인 되어 있지 않은 상태
  if (!session?.user?.id) {
    if (!exists && !publicExists) {
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
