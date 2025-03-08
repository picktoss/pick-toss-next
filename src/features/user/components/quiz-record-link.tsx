'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import Link from 'next/link'

const QuizRecordLink = () => {
  const { quickmenuClickEvent } = useAmplitudeContext()

  return (
    <Link
      href={'/record'}
      className="flex-center flex-col gap-2"
      onClick={() => quickmenuClickEvent({ option: '퀴즈 기록' })}
    >
      <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
        <Icon name="calendar" className="size-[32px]" />
      </div>
      <Text typography="text2-medium">퀴즈 기록</Text>
    </Link>
  )
}

export default QuizRecordLink
