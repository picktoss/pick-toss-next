import HeaderLayout from '@/components/header-layout'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full px-20">
      <HeaderLayout />
      {children}
    </div>
  )
}
