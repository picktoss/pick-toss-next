'use client'

import { changeAiPick } from '@/apis/fetchers/admin/test-change-ai-pick'
import { changePoint } from '@/apis/fetchers/admin/test-change-point'
import { createTodayQuiz } from '@/apis/fetchers/admin/test-create-today-quiz'
import { useGetTodayQuizSetId } from '@/apis/fetchers/quiz/get-today-quiz-set-id/query'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Admin() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const { data: todayQuizSetIdData } = useGetTodayQuizSetId()
  const [loading, setLoading] = useState(false)

  const [point, setPoint] = useState(0)
  const [aiPickCount, setAiPickCount] = useState(0)

  const onSuccess = async () => {
    router.refresh()
    setLoading(false)
    await update({})
  }

  const { mutate: changePointMutate } = useMutation({
    mutationFn: (data: { point: number }) =>
      changePoint({
        point: data.point,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess,
  })
  const { mutate: changeAiPickMutate } = useMutation({
    mutationFn: (data: { aiPickCount: number }) =>
      changeAiPick({
        aiPickCount: data.aiPickCount,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess,
  })
  const { mutate: createTodayQuizMutate } = useMutation({
    mutationKey: [todayQuizSetIdData?.quizSetId],
    mutationFn: () =>
      createTodayQuiz({
        quizSetId: todayQuizSetIdData?.quizSetId || '',
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess,
  })

  if (loading) {
    return <Loading center />
  }

  return (
    <div className="center mx-auto flex max-w-[480px] flex-col gap-[20px]">
      <div>
        <div className="text-h3-bold">1. 별 개수 변경</div>
        <div>현재 가진 별: {session?.user.dto.point}</div>
        <form
          className="flex gap-[8px]"
          onSubmit={() => {
            setLoading(true)
            changePointMutate({ point })
          }}
        >
          <Input value={point} onChange={(e) => setPoint(Number(e.target.value))} />
          <Button className="h-[40px] w-[80px]">변경</Button>
        </form>
      </div>
      <div>
        <div className="text-h3-bold">2. AI Pick 생성 횟수 변경</div>
        <div>현재 생성 가능 횟수: {session?.user.dto.documentUsage.availableAiPickCount}</div>
        <form
          className="flex gap-[8px]"
          onSubmit={() => {
            setLoading(true)
            changeAiPickMutate({ aiPickCount })
          }}
        >
          <Input value={aiPickCount} onChange={(e) => setAiPickCount(Number(e.target.value))} />
          <Button className="h-[40px] w-[80px]">변경</Button>
        </form>
      </div>
      <div>
        <div className="text-h3-bold text-gray-09">3. 오늘의 퀴즈 생성</div>
        <div className="text-gray-07">
          오늘의 퀴즈가 없다고 표시될 때 아래 버튼을 눌러 생성할 수 있습니다
        </div>
        <form
          onSubmit={() => {
            setLoading(true)
            createTodayQuizMutate()
          }}
        >
          <Button className="h-[40px] w-full">오늘의 퀴즈 생성</Button>
        </form>
      </div>
    </div>
  )
}
