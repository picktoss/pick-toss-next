import HeaderLayout from '@/components/header-layout'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-20 pb-8">
      <HeaderLayout />
      {children}
    </div>
  )
}
