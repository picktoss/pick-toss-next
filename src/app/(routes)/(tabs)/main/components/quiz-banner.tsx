'use client'

import { SwitchCase } from '@/components/react/switch-case'
import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface QuizBannerProps {
  type: 'ready' | 'done' | 'notReady'
  quizSetId: string | null
}

export default function QuizBanner({ type = 'notReady', quizSetId }: QuizBannerProps) {
  const router = useRouter()

  return (
    <div
      className={cn(
        'relative flex min-h-[240px] w-full flex-col justify-between rounded-[12px] p-[20px] lg:min-h-[248px] lg:max-w-[840px] text-body1-bold-eng',
        type === 'ready' && 'bg-orange-02',
        type === 'notReady' && 'bg-gray-02',
        type === 'done' && 'bg-blue-02'
      )}
    >
      <div className="w-[calc(100%-160px)]">
        <div
          className={cn(
            'mb-[12px] text-body1-bold-eng',
            type === 'ready' && 'text-orange-06',
            type === 'notReady' && 'text-gray-06',
            type === 'done' && 'text-blue-06'
          )}
        >
          TODAY&apos;s QUIZ
        </div>
        <div className="mb-[39px] flex flex-col gap-[8px]">
          <div className="text-h4-bold text-gray-09">
            <SwitchCase
              value={type}
              caseBy={{
                ready: <div>픽토스님을 위한 퀴즈가 준비되었어요</div>,
                notReady: <div>아직 만들어진 퀴즈가 없어요</div>,
                done: <div>오늘의 퀴즈 완료!</div>,
              }}
            />
          </div>
          <div className="text-gray-08">
            <SwitchCase
              value={type}
              caseBy={{
                ready: <div className="text-body2-medium">4월 25일 목요일</div>,
                notReady: (
                  <div className="text-small1-regular">
                    퀴즈를 만들 수 있을 정도로 노트 양이 충분하지 않거나, 현재 퀴즈를 생성중입니다
                  </div>
                ),
                done: <div className="text-body2-medium">나의 점수: 80점</div>,
              }}
            />
          </div>
        </div>
      </div>

      <SwitchCase
        value={type}
        caseBy={{
          ready: (
            <Image src={icons.quizReady} width={148} className="absolute right-[18px]" alt="" />
          ),
          notReady: (
            <Image src={icons.quizNotReady} width={148} className="absolute right-[18px]" alt="" />
          ),
          done: <Image src={icons.quizDone} width={148} className="absolute right-[18px]" alt="" />,
        }}
      />

      <SwitchCase
        value={type}
        caseBy={{
          ready: (
            <Button
              className="flex w-full gap-[8px] rounded-[8px]"
              onClick={() => router.push(`/quiz?quizSetId=${quizSetId}`)}
            >
              <div>오늘의 퀴즈 시작하기</div>
              <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
            </Button>
          ),
          notReady: (
            <Button
              className="flex w-full gap-[8px] rounded-[8px]"
              onClick={() => router.push('/create')}
            >
              <div>노트 추가하러 가기</div>
              <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
            </Button>
          ),
          done: (
            <Button className="flex w-full cursor-default gap-[8px] rounded-[8px] bg-blue-03 text-blue-06 hover:bg-blue-03">
              <div>내일 퀴즈까지 00:00분 남음</div>
            </Button>
          ),
        }}
      />
    </div>
  )
}
