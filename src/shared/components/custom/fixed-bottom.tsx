import { cn } from '@/shared/lib/utils'
import PortalProvider from './react/portal-provider'

interface Props {
  children: React.ReactNode
  className?: HTMLElement['className']
}

const FixedBottom = ({ children, className }: Props) => {
  return (
    <PortalProvider>
      <div
        className={cn(
          'fixed bottom-0 right-1/2 translate-x-1/2 z-50 h-[100px] w-full max-w-mobile bg-white px-[16px] pt-[12px]',
          className
        )}
      >
        {children}
      </div>
    </PortalProvider>
  )
}

export default FixedBottom
