import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <main>
        {header}
        <div className="pt-[54px]">{children}</div>
      </main>
    </Suspense>
  )
}

export default Layout
