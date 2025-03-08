'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import Link from 'next/link'

const MyCollectionLink = () => {
  const { quickmenuClickEvent } = useAmplitudeContext()

  return (
    <Link
      href={'/collections?tab=my-collection'}
      onClick={() => quickmenuClickEvent({ option: '내 컬렉션' })}
      className="flex-center flex-col gap-2"
    >
      <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
        <Icon name="my-collection" className="size-[32px]" />
      </div>
      <Text typography="text2-medium">내 컬렉션</Text>
    </Link>
  )
}

export default MyCollectionLink
