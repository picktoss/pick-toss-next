'use client'

import Image from 'next/image'
import QuizNotificationSwitch from './components/quiz-notification-switch'
import icons from '@/constants/icons'
import { useUser } from '@/shared/hooks/use-user'
import Link from 'next/link'

const ProfileNotification = () => {
  const { user } = useUser()

  return (
    <div className="px-[20px] py-[10px]">
      <div className="mb-[32px]">
        <h4 className="mb-[8px] text-h4-bold text-gray-09">퀴즈 알림</h4>
        <p className="text-small1-regular text-gray-07">
          이메일로 매일 오늘의 퀴즈 링크를 받을 수 있습니다
        </p>
      </div>
      <div className="mb-[16px]">
        <QuizNotificationSwitch />
      </div>
      <div className="mb-[32px]">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <p className="text-small1-regular text-gray-07">알림 받을 이메일</p>
          <Image src={icons.circleQuestion} width={16} height={16} alt="" />
        </div>
        <div className="flex items-center gap-[7px]">
          {user?.email ? (
            <p className="text-text-regular text-gray-07">{user.email}</p>
          ) : (
            <p className="text-text-regular text-gray-04">이메일을 추가해보세요</p>
          )}

          <Link href="/profile/notification/email">
            <button className="h-[24px] w-[66px] rounded-[4px] bg-orange-01 text-small1-bold text-orange-06 hover:bg-orange-02/80">
              {user?.email ? '변경하기' : '추가하기'}
            </button>
          </Link>
        </div>
      </div>
      {/* // NOTE: 모바일 앱 출시 후 추가
        <div className="flex h-[64px] w-full items-center gap-[13.7px] overflow-hidden rounded-[8px] bg-blue-01 px-[11px]">
          <div className="relative h-full w-[50.32px]">
            <Image src={icons.mobileApp} alt="" fill />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-[500] text-gray-07">
              모바일로도 퀴즈 알림을 받고 싶다면?
            </span>
            <span className="text-[14px] font-[700] text-blue-05 underline">
              픽토스 앱 다운로드
            </span>
          </div>
        </div> */}
    </div>
  )
}

export default ProfileNotification
