import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/api/auth/[...nextauth]/auth'

interface Routes {
  [key: string]: boolean | RegExp
}

const publicUrls: Routes = {
  '/quiz/practice': true,
  '/collections': true,
  '/app-install': true,
  '/invite': /^\/invite\/[^/]+$/,
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-in': true,
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(request: NextRequest) {
  try {
    const session = await auth()
    const { pathname } = request.nextUrl

    const userAgent = request.headers.get('user-agent') || ''
    const isIPadOS = /iPad|Macintosh.*OS\s([\d_]+)/i.test(userAgent)

    const isPublicFile = PUBLIC_FILE.test(pathname)
    const isPublicUrl = Object.entries(publicUrls).some(([path, matcher]) => {
      if (matcher instanceof RegExp) {
        return matcher.test(pathname)
      }
      return path === pathname
    })
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
        if (isIPadOS) {
          return new NextResponse(null, {
            status: 302,
            headers: {
              Location: '/main',
            },
          })
        }
        // 로그인한 사용자는 '/main'으로 이동
        return NextResponse.redirect(new URL('/main', request.url))
      }
    }

    // default
    return NextResponse.next()
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
