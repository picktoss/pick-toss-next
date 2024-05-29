'use client'

import { API_ENDPOINT } from '@/apis/api-endpoint'
import { updateQuizNotification } from '@/apis/fetchers/user/update-quiz-notification'
import { Switch } from '@/components/ui/switch'
import { actionRevalidatePath } from '@/lib/revalidate'
import { useSession } from 'next-auth/react'

export default function QuizNotificationSwitch() {
  const { data: session, update } = useSession()

  const handleCheckedChange = async (checked: boolean) => {
    await updateQuizNotification({
      accessToken: session?.user.accessToken || '',
      quizNotificationEnabled: checked,
    })
    await Promise.all([update(), actionRevalidatePath(API_ENDPOINT.user.getUser().url)])
  }

  return (
    <div className="flex items-center gap-[10px]">
      <p className="text-small1-regular text-gray-07">퀴즈 알림</p>
      <Switch
        displayStatus
        defaultChecked={session?.user.dto.quizNotificationEnabled}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  )
}
