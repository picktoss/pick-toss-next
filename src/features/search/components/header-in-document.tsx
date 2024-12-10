'use client'

import Icon from '@/shared/components/custom/icon'
import { Input } from '@/shared/components/ui/input'
import { useRouter } from 'next/navigation'
import { RefObject } from 'react'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'

interface Props {
  field: ControllerRenderProps<
    {
      keyword: string
    },
    'keyword'
  >
  searchInputRef: RefObject<HTMLInputElement>
  isSearchFocused: boolean
  setIsSearchFocused: (value: boolean) => void
  onDeleteKeyword: () => void
}

const HeaderInDocument = ({
  field,
  searchInputRef,
  isSearchFocused,
  setIsSearchFocused,
  onDeleteKeyword,
}: Props) => {
  const router = useRouter()
  const { register } = useFormContext()

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
      <div tabIndex={-1} className="relative grow">
        <Input
          {...register}
          ref={searchInputRef}
          onFocus={() => setIsSearchFocused(true)}
          value={field.value}
          onChange={field.onChange}
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
      </div>

      <button type="button" onClick={handleCancel} className="ml-[17px] w-fit text-text-secondary">
        취소
      </button>
    </header>
  )
}

export default HeaderInDocument
