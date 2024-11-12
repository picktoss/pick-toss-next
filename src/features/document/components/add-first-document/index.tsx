'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import Link from 'next/link'

const AddFirstDocument = ({ userName }: { userName: string }) => {
  usePreviousPath()

  return (
    <Link
      href={'document'}
      className="border-special mt-[12px] flex h-fit w-full items-center justify-between rounded-[20px] py-[22px] pl-[25px] pr-[22px]"
    >
      <div className="flex items-center">
        <Icon name="picktoss-color" className="mr-[19px] size-[40px]" />
        <div className="flex flex-col items-start gap-[6px]">
          <Text typography="text1-medium" color="secondary">
            {userName}님, 퀴즈 풀 준비 되셨나요?
          </Text>
          <Text typography="title3" color="accent">
            첫 노트 추가하기
          </Text>
        </div>
      </div>
      <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
    </Link>
  )
}

export default AddFirstDocument
