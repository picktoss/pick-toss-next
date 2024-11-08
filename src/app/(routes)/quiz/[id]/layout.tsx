import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main>
      {/* TODO: Search Params에 따라 알맞은 loading view를 fallback으로 표시 */}
      <Suspense>{children}</Suspense>
    </main>
  )
}

export default Layout
