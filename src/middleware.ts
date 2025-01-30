import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/api/auth/[...nextauth]/auth'

interface Routes {
  [key: string]: boolean
}

const publicUrls: Routes = {
  '/quiz/practice': true,
  '/collections': true,
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-in': true,
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  const isPublicFile = PUBLIC_FILE.test(pathname)
  const isPublicUrl = publicUrls[pathname]
  const isPublicOnlyUrl = publicOnlyUrls[pathname]

  // 1. Public files는 처리하지 않음
  if (isPublicFile) {
    return
  }

  // 2. 로그인되지 않은 상태
  if (!session?.user?.id) {
    if (pathname !== '/' && !isPublicOnlyUrl && !isPublicUrl) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // 3. 로그인된 상태
  if (session?.user?.id) {
    // Public-only URL 접근 시 리디렉션 처리
    if (isPublicOnlyUrl) {
      const interestedCategoryComplete = request.cookies.get('interested-category-complete')
      // 첫 로그인 사용자 처리
      if (session.user.isNewUser && !interestedCategoryComplete) {
        return NextResponse.redirect(new URL('/on-boarding', request.url))
      } else {
        // 이미 로그인한 사용자는 '/main'으로 이동
        return NextResponse.redirect(new URL('/main', request.url))
      }
    }
  }

  // default
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
