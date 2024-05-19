'use client'

import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface QuizBannerProps {
  quizState: 'ready'
  quizSetId?: string
}

export default function QuizBanner({ quizState, quizSetId }: QuizBannerProps) {
  const router = useRouter()

  return (
    <div className="relative flex min-h-[240px] w-full flex-col justify-between rounded-[12px] bg-orange-02 p-[20px] lg:min-h-[248px] lg:max-w-[840px]">
      <div className="w-[calc(100%-160px)]">
        <div className="mb-[12px] text-body1-bold-eng text-orange-06">TODAY&apos;s QUIZ</div>
        <div className="mb-[39px] flex flex-col gap-[8px]">
          <div className="text-h4-bold text-gray-09">픽토스님을 위한 퀴즈가 준비되었어요</div>
          <div className="text-body2-medium text-gray-08">4월 25일 목요일</div>
        </div>
      </div>

      <Image src={icons.quizReady} width={148} className="absolute right-[18px]" alt="" />

      <Button
        className="flex w-full gap-[8px] rounded-[8px]"
        onClick={() => {
          if (quizState === 'ready') {
            router.push(`/quiz?quizSetId=${quizSetId}`)
          }
        }}
      >
        <div>오늘의 퀴즈 시작하기</div>
        <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
      </Button>
    </div>
  )
}
