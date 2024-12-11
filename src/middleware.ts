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
  '/app-start': true,
  '/sign-in': true,
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(request: NextRequest) {
  // const session = await auth()
  // const publicExists = publicUrls[request.nextUrl.pathname]
  // const exists = publicOnlyUrls[request.nextUrl.pathname]

  // const isPublicFiles = PUBLIC_FILE.test(request.nextUrl.pathname)
  // if (isPublicFile) {
  //   return
  // }

  // 로그인 되어 있지 않은 상태
  // if (!session?.user?.id) {
  //   if (!exists && !publicExists) {
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  //   // 로그인 상태
  // } else {
  //   if (exists) {
  //     return NextResponse.redirect(new URL('/main', request.url))
  //   }
  // }

  const cookies = request.cookies.getAll()
  const pwaInstalled = cookies.find((cookie) => cookie.name === 'pwaInstalled')?.value === 'true'
  const session = await auth()
  const { pathname } = request.nextUrl

  const isPublicFile = PUBLIC_FILE.test(pathname)
  const isPublicUrl = publicUrls[pathname]
  const isPublicOnlyUrl = publicOnlyUrls[pathname]

  // 1. Public files는 처리하지 않음
  if (isPublicFile) {
    return
  }

  // eslint-disable-next-line no-console
  console.log('pwaInstalled: ', pwaInstalled)

  // 2. 로그인되지 않은 상태
  if (!session?.user?.id) {
    // PWA 설치 상태에 따른 처리
    if (pwaInstalled) {
      // PWA 설치된 상태에서는 '/app-start'로 이동
      if (pathname !== '/app-start') {
        return NextResponse.redirect(new URL('/app-start', request.url))
      }
    } else {
      // PWA 미설치 상태에서는 '/'로 이동 (필요시 수정 가능)
      if (pathname !== '/' && !isPublicOnlyUrl && !isPublicUrl) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // 3. 로그인된 상태
  if (session?.user?.id) {
    // Public-only URL 접근 시 리디렉션 처리
    if (isPublicOnlyUrl) {
      // 첫 로그인 사용자 처리
      if (session.user.isNewUser) {
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
