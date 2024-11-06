import Icon from '@/shared/components/custom/icon'
import { Input } from '@/shared/components/ui/input'
import { useRouter } from 'next/navigation'
import { RefObject, useState } from 'react'

interface Props {
  searchHeaderRef: RefObject<HTMLDivElement>
  isSearchFocused: boolean
  setIsSearchFocused: (value: boolean) => void
}

const HeaderInDocument = ({ searchHeaderRef, isSearchFocused, setIsSearchFocused }: Props) => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  return (
    <header
      ref={searchHeaderRef}
      className="flex-center relative right-1/2 z-20 h-[56px] w-full max-w-mobile grow translate-x-1/2  bg-background-base-01 px-[16px] text-subtitle2-medium"
    >
      <div tabIndex={-1} className="relative grow">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          placeholder="노트명, 노트, 퀴즈 검색"
          className="h-[40px] placeholder:text-text-placeholder-01"
          variant={'round'}
          left={<Icon name="search-bar" className="size-[20px] text-icon-secondary" />}
          right={
            <button>
              <Icon
                name="cancel-circle"
                className="size-[24px]"
                fill="var(--color-gray-100)"
                stroke="var(--color-gray-300)"
              />
            </button>
          }
        />
      </div>
      <button
        onClick={() => {
          if (isSearchFocused) {
            setIsSearchFocused(false)
          } else router.back()
        }}
        className="ml-[17px] w-fit text-text-secondary"
      >
        취소
      </button>
    </header>
  )
}

export default HeaderInDocument
