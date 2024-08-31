import LeftSidebar from '@/shared/components/left-sidebar'
import { Viewport } from 'next'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
}

const DocumentLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="hidden justify-end lg:flex">
        <LeftSidebar />
        <div className="flex w-[calc(100vw-240px)] justify-center">
          <div className="w-full">{children}</div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex min-h-screen flex-col pb-[84px]">{children}</div>
      </div>
    </>
  )
}

export default DocumentLayout
