import { PropsWithChildren } from 'react'

const CollectionList = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[calc(100dvh-88px-114px)] overflow-y-scroll bg-gray-50 px-[16px] pb-[60px] pt-[24px]">
      <div className="grid grid-cols-2 gap-[11px]">{children}</div>
    </div>
  )
}

export default CollectionList
