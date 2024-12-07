import { PropsWithChildren, forwardRef } from 'react'

interface CollectionListProps extends PropsWithChildren {}

const CollectionList = forwardRef<HTMLDivElement, CollectionListProps>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="h-[calc(100dvh-88px-114px)] overflow-y-scroll bg-gray-50 px-[16px] pb-[60px] pt-[24px]"
    >
      <div className="grid grid-cols-2 gap-[11px]">{children}</div>
    </div>
  )
})

CollectionList.displayName = 'CollectionList'

export default CollectionList
