'use client'

import { ReactNode, useCallback, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { NavItemsId, profileNav } from './config'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Switch } from '../../ui/switch'

interface ProfileProps {
  trigger: ReactNode
}

export default function Profile({ trigger }: ProfileProps) {
  const [selectedNavId, setSelectedNavId] = useState<NavItemsId>('notification-config')

  const ProfileContent = useCallback(() => {
    switch (selectedNavId) {
      case 'my-account':
        return <MyAccount />
      case 'notification-config':
        return <NotificationConfig />
      default:
        return null
    }
  }, [selectedNavId])

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-w-full overflow-hidden rounded-[12px] p-0 shadow-modal md:h-[560px] md:w-[800px]">
        <div className="bg-gray-01 flex h-full w-[200px] flex-col justify-between px-[12px] pb-[30px] pt-[32px]">
          <div className="mb-[27px] flex items-center gap-[8px] px-[10px]">
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-[14px]">
                <span className="font-bold">픽토스</span> 님
              </span>
              <span className="text-gray-07 text-[10px] font-[500]">picktoss@gmail.com</span>
            </div>
          </div>

          <div>
            {profileNav.map(({ id, name, items, styles }) => (
              <div key={id} className={cn('border-b border-gray-04', styles)}>
                <div className="text-gray-06 mb-[9px] px-[14px] text-[12px] font-[700]">{name}</div>
                <div className="*:text-gray-07 flex flex-col">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      disabled={item.disabled}
                      className={cn(
                        'flex h-[32px] justify-start bg-inherit px-[12px] !text-[14px] hover:bg-gray-02 disabled:opacity-100',
                        selectedNavId === item.id && 'bg-gray-02 font-[700]'
                      )}
                      onClick={() => setSelectedNavId(item.id)}
                    >
                      <div className="flex items-center gap-[8px]">
                        <span>{item.label}</span>
                        {item.disabled && (
                          <div className="text-gray-08 w-[72px] rounded-[3px] bg-[#D9D9D9] text-[10px]">
                            Coming soon
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            <div className="*:text-gray-07 flex gap-[10px] pt-[16px]">
              <Button className="text-gray-07 h-[17px] w-full justify-start bg-inherit px-[12px] !text-[14px] hover:bg-inherit">
                <div className="flex items-center gap-[10px]">
                  로그아웃
                  <LogOutIcon />
                </div>
              </Button>
            </div>
          </div>

          <div className="text-gray-06 mt-auto px-[12px] text-[10px]">버전 정보 2.1.1</div>
        </div>

        <div className="w-full px-[40px] pb-[30px] pt-[32px]">
          <ProfileContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MyAccount() {
  return <div>MyAccount</div>
}

function NotificationConfig() {
  const [notificationState, setNotificationState] = useState(true)
  const [updateNotificationState, setUpdateNotificationState] = useState(false)
  const [eventNotificationState, setEventNotificationState] = useState(false)

  return (
    <div>
      <div className="border-gray-02 border-b pb-[15px]">
        <div className="mb-[18px]">
          <div className="text-gray-08 text-[20px] font-[700]">퀴즈 알림</div>
          <div className="text-gray-06 text-[12px] font-[400]">
            연동된 이메일로 매일 오늘의 퀴즈 링크를 받을 수 있어요
          </div>
        </div>
        <div className="mb-[16px] flex h-[28px] items-center gap-[12px]">
          <span className="text-gray-07 text-[12px] font-[500]">퀴즈 알림</span>
          <div className="flex items-center gap-[10px]">
            <span
              className={cn(
                'text-[15px] font-[700] text-gray-07',
                notificationState && 'text-orange-05'
              )}
            >
              {notificationState ? 'ON' : 'OFF'}
            </span>
            <Switch checked={notificationState} onCheckedChange={setNotificationState} />
          </div>
        </div>
        <div className="mb-[24px] flex flex-col gap-[8px]">
          <span className="text-gray-07 text-[12px] font-[500]">알림 시간</span>
          <div className="bg-gray-01 flex w-[195px] items-center justify-between rounded-[4px] px-[11px] py-[8px]">
            <div className="text-gray-08 text-[16px] font-[500]">오전 09시 12분</div>
            <Button className="bg-orange-02 text-orange-06 hover:bg-orange-02/80 h-[23px] w-[45px] text-[12px] font-[700]">
              변경
            </Button>
          </div>
        </div>
        <div className="bg-blue-01 flex h-[64px] w-full items-center gap-[13.7px] overflow-hidden rounded-[8px] px-[11px]">
          <div className="flex flex-col">
            <span className="text-gray-07 text-[12px] font-[500]">
              모바일로도 퀴즈 알림을 받고 싶다면?
            </span>
            <span className="text-blue-05 text-[14px] font-[700] underline">
              픽토스 앱 다운로드
            </span>
          </div>
        </div>
      </div>
      <div className="mt-[24px]">
        <div className="mb-[20px]">
          <div className="text-gray-08 text-[20px] font-[700]">픽토스 소식 알림</div>
          <div className="text-gray-06 text-[12px] font-[400]">
            픽토스에 새롭게 추가된 기능과 이벤트 소식을 받을 수 있어요
          </div>
        </div>
        <div className="mb-[8px] flex h-[28px] w-[162px] items-center justify-between gap-[12px] pr-[5px]">
          <span className="text-gray-07 text-[12px] font-[500]">업데이트 알림</span>
          <div className="flex items-center gap-[10px]">
            <span
              className={cn(
                'text-[15px] font-[700] text-gray-07',
                updateNotificationState && 'text-orange-05'
              )}
            >
              {updateNotificationState ? 'ON' : 'OFF'}
            </span>
            <Switch
              checked={updateNotificationState}
              onCheckedChange={setUpdateNotificationState}
            />
          </div>
        </div>
        <div className="flex h-[28px] w-[162px] items-center justify-between gap-[12px] pr-[5px]">
          <span className="text-gray-07 text-[12px] font-[500]">이벤트 알림</span>
          <div className="flex items-center gap-[10px]">
            <span
              className={cn(
                'text-[15px] font-[700] text-gray-07',
                eventNotificationState && 'text-orange-05'
              )}
            >
              {eventNotificationState ? 'ON' : 'OFF'}
            </span>
            <Switch checked={eventNotificationState} onCheckedChange={setEventNotificationState} />
          </div>
        </div>
      </div>
    </div>
  )
}

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#FF9100" />
      <path
        d="M22.709 13.0596L20.2377 13.3648L22.971 9.26039C23.0567 9.13223 22.9391 8.96697 22.7913 9.00576C19.7555 9.79157 16.6694 10.4931 13.6774 11.4239C11.4195 12.1271 9.51776 13.6144 9.08769 16.0595C8.54001 19.1775 10.6148 22.1521 13.7211 22.7018C15.5909 23.0323 17.5413 22.3865 18.85 21.0071C19.5321 20.2887 19.8815 19.4338 20.3099 18.5603C21.1684 16.8082 22.0235 15.0528 22.8803 13.2991C22.9391 13.1793 22.8417 13.0427 22.709 13.0579V13.0596Z"
        fill="white"
      />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.3125 6V2.21782C9.3125 1.79298 8.93103 1.46983 8.51198 1.53967L1.63698 2.6855C1.30547 2.74075 1.0625 3.02757 1.0625 3.36365V12.9697C1.0625 13.3945 1.44397 13.7177 1.86302 13.6478L8.73802 12.502C9.06953 12.4467 9.3125 12.1599 9.3125 11.8239V10.5"
        stroke="#797D81"
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5498 6.30713L13.5013 8.20771L11.6007 10.1592"
        stroke="#797D81"
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.1875 8.28125H12.75"
        stroke="#797D81"
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
