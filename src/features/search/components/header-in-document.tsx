'use client'

import Icon from '@/shared/components/custom/icon'
import { Input } from '@/shared/components/ui/input'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, RefObject } from 'react'

interface Props {
  inputValue: string
  onChangeInputValue: ChangeEventHandler<HTMLInputElement>
  searchInputRef: RefObject<HTMLInputElement>
  isSearchFocused: boolean
  setIsSearchFocused: (value: boolean) => void
  onDeleteKeyword: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const HeaderInDocument = ({
  inputValue,
  onChangeInputValue,
  searchInputRef,
  isSearchFocused,
  setIsSearchFocused,
  onDeleteKeyword,
  onSubmit,
}: Props) => {
  const router = useRouter()

  const handleCancel = () => {
    if (isSearchFocused) {
      setIsSearchFocused(false)
      return
    } else {
      router.push('/document')
    }
  }

  return (
    <header className="flex-center relative right-1/2 z-20 h-[56px] w-full max-w-mobile grow translate-x-1/2  bg-background-base-01 px-[16px] text-subtitle2-medium">
      <form onSubmit={onSubmit} tabIndex={-1} className="relative grow">
        <Input
          ref={searchInputRef}
          onFocus={() => setIsSearchFocused(true)}
          value={inputValue}
          onChange={onChangeInputValue}
          placeholder="노트명, 노트, 퀴즈 검색"
          className="h-[40px] placeholder:text-text-placeholder-01"
          variant={'round'}
          left={<Icon name="search-bar" className="size-[20px] text-icon-secondary" />}
          right={
            <button type="button" onClick={onDeleteKeyword}>
              <Icon
                name="cancel-circle"
                className="size-[24px]"
                fill="var(--color-gray-100)"
                stroke="var(--color-gray-300)"
              />
            </button>
          }
        />
      </form>

      <button type="button" onClick={handleCancel} className="ml-[17px] w-fit text-text-secondary">
        취소
      </button>
    </header>
  )
}

export default HeaderInDocument
