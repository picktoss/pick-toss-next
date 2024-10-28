import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useNotification } from '../../context/notification-context'
import { useEffect, useState } from 'react'
import SetEmailDialog from '../set-email-dialog'

const NotificationControlArea = ({ isKakaoUser }: { isKakaoUser: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    switchStates,
    allowNotification,
    setOffEmail,
    handleAllowNotification,
    handleSwitchChange,
  } = useNotification()

  useEffect(() => {
    if (Object.values(switchStates.email).find((value) => value === true)) {
      setIsOpen(true)
      setOffEmail(false)
    }
  }, [switchStates.email])

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <div className="mb-[37px] mt-[10px] flex items-center gap-[20px]">
        <Text typography="subtitle2-bold">서비스 알림</Text>
        <Switch size={'md'} checked={allowNotification} onCheckedChange={handleAllowNotification} />
      </div>

      <div
        className={cn(
          'mb-[56px] flex flex-col gap-[20px]',
          !allowNotification && 'text-text-disabled'
        )}
      >
        <Text typography="subtitle2-bold">푸시 알림</Text>

        <div className="flex items-center justify-between">
          <Text>오늘의 퀴즈</Text>
          <Switch
            size={'md'}
            checked={switchStates.push.todayQuiz}
            onCheckedChange={(checked) => handleSwitchChange('push', 'todayQuiz', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Text>오답 터뜨리기 현황</Text>
          <Switch
            size={'md'}
            checked={switchStates.push.wrongAnswerStatus}
            onCheckedChange={(checked) => handleSwitchChange('push', 'wrongAnswerStatus', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Text>친구 초대 보상</Text>
          <Switch
            size={'md'}
            checked={switchStates.push.inviteReward}
            onCheckedChange={(checked) => handleSwitchChange('push', 'inviteReward', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Text>공지사항 및 업데이트</Text>
          <Switch
            size={'md'}
            checked={switchStates.push.announcements}
            onCheckedChange={(checked) => handleSwitchChange('push', 'announcements', checked)}
          />
        </div>
      </div>

      <div
        className={cn(
          'mb-[20px] flex flex-col gap-[20px]',
          !allowNotification && 'text-text-disabled'
        )}
      >
        <Text typography="subtitle2-bold">이메일 알림</Text>

        <div className="flex items-center justify-between">
          <Text>오늘의 퀴즈</Text>
          <Switch
            size={'md'}
            checked={switchStates.email.todayQuiz}
            onCheckedChange={(checked) => handleSwitchChange('email', 'todayQuiz', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Text>공지사항 및 업데이트</Text>
          <Switch
            size={'md'}
            checked={switchStates.email.announcements}
            onCheckedChange={(checked) => handleSwitchChange('email', 'announcements', checked)}
          />
        </div>
      </div>

      {/* todo : 이메일 알림 관련 로직
      1. 카카오 가입자의 경우, 이메일 알림 토글 off상태
      2. 토글 on 시, 이메일 등록 팝업 노출
      3. '다음에 등록하기'터치 시, 토글 off */}
      {isKakaoUser && <SetEmailDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </main>
  )
}

export default NotificationControlArea
