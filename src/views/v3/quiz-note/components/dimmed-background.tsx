import { cn } from '@/shared/lib/utils'
import { PropsWithChildren } from 'react'

// DimmedBackground 컴포넌트
const DimmedBackground = ({
  isExpanded,
  children,
}: PropsWithChildren & { isExpanded: boolean }) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 h-screen w-full pointer-events-none opacity-0 transition-all duration-400',
        isExpanded && 'opacity-100 z-40'
      )}
    >
      <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black opacity-75"></div>
      {children}
    </div>
  )
}

export default DimmedBackground
