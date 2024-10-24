'use client'

import Icon from '@/shared/components/icon'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Notification = () => {
  const router = useRouter()

  const [AllowNotification, setAllowNotification] = useState(false)
  const [switchStates, setSwitchStates] = useState({
    pushTodayQuiz: false,
    wrongAnswerStatus: false,
    inviteReward: false,
    pushAnnouncements: false,
    emailTodayQuiz: false,
    emailAnnouncements: false,
  })

  useEffect(() => {
    if (Object.values(switchStates).find((value) => value === true)) {
      setAllowNotification(true)
    }
  }, [switchStates])

  const handleAllowNotification = (checked: boolean) => {
    setAllowNotification(checked)
    setSwitchStates({
      pushTodayQuiz: checked,
      wrongAnswerStatus: checked,
      inviteReward: checked,
      pushAnnouncements: checked,
      emailTodayQuiz: checked,
      emailAnnouncements: checked,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSwitchStates((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <button className="justify-self-start" onClick={() => router.back()}>
          <Icon name="arrow-left" className="size-[24px]" />
        </button>
        <Text typography="subtitle2-medium" className="center">
          알림 설정
        </Text>
      </header>

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
        <div className="mb-[37px] mt-[10px] flex items-center gap-[20px]">
          <Text typography="subtitle2-bold">서비스 알림</Text>
          <Switch
            className="h-[20px] w-[36px]"
            thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
            checked={AllowNotification}
            onCheckedChange={handleAllowNotification}
          />
        </div>

        <div className="mb-[56px] flex flex-col gap-[20px]">
          <Text typography="subtitle2-bold">푸시 알림</Text>

          <div className="flex items-center justify-between">
            <Text>오늘의 퀴즈</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.pushTodayQuiz}
              onCheckedChange={(checked) => handleSwitchChange('pushTodayQuiz', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>오답 터뜨리기 현황</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.wrongAnswerStatus}
              onCheckedChange={(checked) => handleSwitchChange('wrongAnswerStatus', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>친구 초대 보상</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.inviteReward}
              onCheckedChange={(checked) => handleSwitchChange('inviteReward', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>공지사항 및 업데이트</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.pushAnnouncements}
              onCheckedChange={(checked) => handleSwitchChange('pushAnnouncements', checked)}
            />
          </div>
        </div>

        {/* todo : 이메일 알림 관련 로직
          1. 카카오 가입자의 경우, 이메일 알림 토글 off상태
          2. 토글 on 시, 이메일 등록 팝업 노출
          3. '다음에 등록하기'터치 시, 토글 off */}
        <div className="mb-[20px] flex flex-col gap-[20px]">
          <Text typography="subtitle2-bold">이메일 알림</Text>

          <div className="flex items-center justify-between">
            <Text>오늘의 퀴즈</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.emailTodayQuiz}
              onCheckedChange={(checked) => handleSwitchChange('emailTodayQuiz', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>공지사항 및 업데이트</Text>
            <Switch
              className="h-[20px] w-[36px]"
              thumbClassName="size-[16px] data-[state=checked]:translate-x-[17px]"
              checked={switchStates.emailAnnouncements}
              onCheckedChange={(checked) => handleSwitchChange('emailAnnouncements', checked)}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Notification
