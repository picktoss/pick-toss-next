import Text from '@/shared/components/ui/text'
import { PropsWithChildren } from 'react'

const SearchList = ({ length, children }: PropsWithChildren & { length: number }) => {
  return (
    <div className="h-[calc(100dvh-88px-56px)] overflow-y-auto p-[16px] text-text1-medium">
      <Text>
        퀴즈 노트 <span className="text-text-accent">{length}</span>
      </Text>

      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default SearchList
