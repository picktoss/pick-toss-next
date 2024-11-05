import { cn } from '@/shared/lib/utils'
import { PropsWithChildren } from 'react'

// DimmedBackground 컴포넌트
const DimmedBackground = ({
  isExpandedBtns,
  children,
}: PropsWithChildren & { isExpandedBtns: boolean }) => {
  return (
    <div
      className={cn(
        'fixed top-0 right-1/2 translate-x-1/2 h-screen w-dvw max-w-mobile pointer-events-none opacity-0 transition-all duration-400',
        isExpandedBtns && 'opacity-100 pointer-events-auto'
      )}
    >
      <div className="absolute left-0 top-0 z-10 h-screen w-full bg-black opacity-75"></div>
      {children}
    </div>
  )
}

export default DimmedBackground
