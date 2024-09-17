'use client'

import { useUpdateQuizNotificationMutation } from '@/actions/fetchers/user/update-quiz-notification/mutation'
import { Switch } from '@/shared/components/ui/switch'
import { useSession } from 'next-auth/react'

export default function QuizNotificationSwitch() {
  const { data: session } = useSession()
  const { mutate: mutateUpdateQuiz } = useUpdateQuizNotificationMutation()

  if (!session?.user) {
    return (
      <div className="flex h-[22.5px] items-center">
        <p className="text-small1-regular text-gray-07">퀴즈 알림</p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-[10px]">
      <p className="text-small1-regular text-gray-07">퀴즈 알림</p>
      <Switch
        displayStatus
        defaultChecked={session.user.dto.quizNotificationEnabled}
        onCheckedChange={(checked: boolean) => mutateUpdateQuiz({ checked })}
      />
    </div>
  )
}
