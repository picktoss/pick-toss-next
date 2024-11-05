import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
<<<<<<< HEAD:src/app/(routes)/(tabs)/profile/inquiry/layout.tsx
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'
=======
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
>>>>>>> 397335a77da4eb30ef9fef6f3fc7005a0b47ab22:src/app/(routes)/profile/inquiry/layout.tsx

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

<<<<<<< HEAD:src/app/(routes)/(tabs)/profile/inquiry/layout.tsx
const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <InquiryProvider>
      {header}
      {children}
    </InquiryProvider>
  )
=======
const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <BottomNavLayout where="마이">{children}</BottomNavLayout>
>>>>>>> 397335a77da4eb30ef9fef6f3fc7005a0b47ab22:src/app/(routes)/profile/inquiry/layout.tsx
}

export default Layout
