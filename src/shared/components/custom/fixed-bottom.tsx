import { cn } from '@/shared/lib/utils'

interface Props {
  children: React.ReactNode
  className?: HTMLElement['className']
}

const FixedBottom = ({ children, className }: Props) => {
  return (
    <>
      <div className="pb-[100px]" />
      <div
        className={cn(
          'fixed bottom-0 z-50 h-[100px] w-full max-w-mobile bg-white px-[16px] pt-[12px]',
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default FixedBottom
