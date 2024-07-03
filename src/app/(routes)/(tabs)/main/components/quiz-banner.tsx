'use client'

import { TodayQuizSetType } from '@/apis/fetchers/quiz/get-today-quiz-set-id/fetcher'
import {
  GET_TODAY_QUIZ_SET_ID_KEY,
  useGetTodayQuizSetId,
} from '@/apis/fetchers/quiz/get-today-quiz-set-id/query'
import { useGetWeekQuizAnswerRateMutation } from '@/apis/fetchers/quiz/get-week-quiz-answer-rate/mutation'
import { CategoryProtector } from '@/components/category-protector'
import { CreateDocumentProtector } from '@/components/create-document-protector'
import Loading from '@/components/loading'
import { SwitchCase } from '@/components/react/switch-case'
import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import { LOCAL_KEY } from '@/constants/local-key'
import { cn } from '@/lib/utils'
import { calculateTimeUntilTomorrowMidnight, getCurrentDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function QuizBanner() {
  const router = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data } = useGetTodayQuizSetId()
  const [remainingTime, setRemainingTime] = useState(calculateTimeUntilTomorrowMidnight())
  const [type, setType] = useState<TodayQuizSetType | 'CREATING' | null>(null)
  const [resultScore, setResultScore] = useState<number | null>(null)

  const quizSetId = data?.quizSetId ?? null

  const { mutate: getWeekQuizAnswerRate } = useGetWeekQuizAnswerRateMutation()

  useEffect(() => {
    if (type !== 'DONE') {
      return
    }

    getWeekQuizAnswerRate(
      { categoryId: 0 },
      {
        onSuccess: (data) => {
          const todayData = data.quizzes[data.quizzes.length - 1]
          const score = Math.round(
            ((todayData.totalQuizCount - todayData.incorrectAnswerCount) /
              todayData.totalQuizCount) *
              100
          )
          setResultScore(score)
        },
      }
    )
  }, [type])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeUntilTomorrowMidnight())
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!data?.type) {
      return
    }

    const creatingQuizLocalValue = localStorage.getItem(LOCAL_KEY.QUIZ_CREATING)
    const isQuizCreating = creatingQuizLocalValue || 'false'

    let intervalId: ReturnType<typeof setInterval>

    if (isQuizCreating === 'true') {
      setType('CREATING')
      intervalId = setInterval(async () => {
        await queryClient.refetchQueries({
          queryKey: [GET_TODAY_QUIZ_SET_ID_KEY],
        })

        if (data.type === 'READY') {
          localStorage.removeItem(LOCAL_KEY.QUIZ_CREATING)
          clearInterval(intervalId)
          setType(data.type)
        }
      }, 5000)
    } else {
      setType(data.type)
    }

    return () => clearInterval(intervalId)
  }, [data?.type, queryClient])

  if (type == null) {
    return (
      <div className="relative h-[240px] w-full rounded-[12px] bg-gray-01 lg:h-[248px] lg:max-w-[840px]">
        <Loading center />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-[240px] w-full flex-col justify-between rounded-[12px] p-[20px] lg:h-[248px] lg:max-w-[840px] text-body1-bold-eng lg:pl-[40px] lg:pt-[30px] lg:pb-[28px] overflow-hidden',
        type === 'READY' && 'bg-orange-02',
        type === 'NOT_READY' && 'bg-gray-02',
        type === 'DONE' && 'bg-blue-02',
        type === 'CREATING' && 'bg-blue-02'
      )}
    >
      <div className="w-[calc(100%-160px)] text-nowrap">
        <div
          className={cn(
            'mb-[12px] text-body1-bold-eng',
            type === 'READY' && 'text-orange-06',
            type === 'NOT_READY' && 'text-gray-06',
            type === 'DONE' && 'text-blue-06',
            type === 'CREATING' && 'text-blue-06'
          )}
        >
          TODAY&apos;s QUIZ
        </div>
        <div className="mb-[39px] flex flex-col gap-[8px]">
          <div className="z-10 text-h4-bold text-gray-09 lg:text-h2-bold">
            <SwitchCase
              value={type}
              caseBy={{
                READY: (
                  <>
                    <div className="lg:hidden">
                      {session?.user.dto.name}님을 위한 <br />
                      퀴즈가 준비되었어요
                    </div>
                    <div className="hidden lg:block">
                      {getCurrentDate({ month: true, day: true })} 오늘의 퀴즈
                    </div>
                  </>
                ),
                NOT_READY: <div>아직 만들어진 퀴즈가 없어요</div>,
                DONE: <div>오늘의 퀴즈 완료!</div>,
                CREATING: <div>현재 퀴즈를 만들고 있어요</div>,
              }}
            />
          </div>
          <div className="z-10 text-gray-08">
            <SwitchCase
              value={type}
              caseBy={{
                READY: (
                  <>
                    <div className="text-body2-medium lg:hidden">
                      {getCurrentDate({ month: true, day: true, dayOfWeek: true })}
                    </div>
                    <div className="hidden text-body1-medium lg:block">
                      {session?.user.dto.name}님을 위해 AI가 선별한 오늘의 퀴즈를 풀어보세요
                    </div>
                  </>
                ),
                NOT_READY: (
                  <div className="text-nowrap text-small1-regular lg:text-body1-medium">
                    현재 노트 양이 충분하지 않거나, <br className="lg:hidden" />
                    AI pick이 적용된 노트가 없는 상태입니다
                  </div>
                ),
                DONE: (
                  <div className="text-body2-medium lg:text-body1-medium">
                    나의 점수: {resultScore || 0}점
                  </div>
                ),
                CREATING: (
                  <div className="text-body2-medium lg:text-body1-medium">
                    AI <i>p</i>ick이 진행된 문서로부터 <br className="lg:hidden" />
                    퀴즈를 생성중입니다
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>

      <SwitchCase
        value={type}
        caseBy={{
          READY: (
            <Image
              src={icons.quizReady}
              width={148}
              className="absolute right-[10px] lg:right-[16px] lg:top-[19px] lg:w-[230px]"
              alt=""
            />
          ),
          NOT_READY: (
            <Image
              src={icons.quizNotReady}
              width={148}
              className="absolute right-[18px] lg:right-0 lg:mt-[6px] lg:w-[297px]"
              alt=""
            />
          ),
          DONE: (
            <>
              <Image
                src={icons.quizDone}
                width={230}
                className="absolute bottom-0 right-0 lg:hidden"
                alt=""
              />
              <Image
                src={icons.quizDoneDesktop}
                width={430}
                className="absolute bottom-0 right-0 hidden lg:block"
                alt=""
              />
            </>
          ),
          CREATING: (
            <Image
              src={icons.quizCreating}
              width={335}
              className="absolute bottom-[100px] right-[30px] w-[180px] lg:bottom-[39px] lg:right-[40px] lg:w-[335px]"
              alt=""
            />
          ),
        }}
      />

      <SwitchCase
        value={type}
        caseBy={{
          READY: (
            <Button
              className="flex w-full gap-[8px] rounded-[32px] lg:w-[240px]"
              onClick={() => router.push(`/quiz?quizSetId=${quizSetId}`)}
            >
              <div>오늘의 퀴즈 시작하기</div>
              <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
            </Button>
          ),
          NOT_READY: (
            <CreateDocumentProtector
              skeleton={
                <Button className="absolute bottom-[16px] flex w-[calc(100%-40px)] gap-[8px] rounded-[32px] lg:relative lg:bottom-0 lg:w-[240px]">
                  <div>노트 추가하러 가기</div>
                  <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
                </Button>
              }
            >
              <CategoryProtector>
                <Button
                  className="absolute bottom-[16px] flex w-[calc(100%-40px)] gap-[8px] rounded-[32px] lg:relative lg:bottom-0 lg:w-[240px]"
                  onClick={() => router.push('/create')}
                >
                  <div>노트 추가하러 가기</div>
                  <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
                </Button>
              </CategoryProtector>
            </CreateDocumentProtector>
          ),
          DONE: (
            <Button className="z-10 flex w-full cursor-default gap-[8px] rounded-[32px] bg-blue-03 text-blue-06 hover:bg-blue-03 lg:w-[240px]">
              <div>
                내일 퀴즈까지 {remainingTime.hours.toString().padStart(2, '0')}:
                {remainingTime.minutes.toString().padStart(2, '0')}분 남음
              </div>
            </Button>
          ),
          CREATING: (
            <Button className="z-10 flex w-full cursor-default gap-[8px] rounded-[32px] bg-blue-03 text-blue-06 hover:bg-blue-03 lg:w-[240px]">
              <div>퀴즈 도착 예정</div>
            </Button>
          ),
        }}
      />
    </div>
  )
}
