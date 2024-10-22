'use client'

import Icon from '@/shared/components/icon'
import Header from './components/header'
import Text from '@/shared/components/ui/text'
import { profileMenuList } from './constants/profile-menu-list'
import { useRouter } from 'next/navigation'
import CategoryTooltip from './components/category-tooltip'
// import CategoryTag from '@/shared/components/category-tag'
// import Image from 'next/image'
// import sampleProfileImg from '@/../../public/images/og-800x400.png'

const Profile = () => {
  const router = useRouter()
  const extraNoteCount = 28

  return (
    <>
      <Header />

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px] pb-[54px]">
        <button
          onClick={() => router.push('profile/account')}
          className="relative mt-[8px] flex h-[96px] w-full items-center justify-between"
        >
          {/* 관심분야 설정이 안되어 있을 경우 툴팁 노출 */}
          <CategoryTooltip />

          <div className="flex-center gap-[16px]">
            <div className="flex-center size-[48px] rounded-full bg-background-base-03">
              {/* 설정한 이미지가 없을 경우 아이콘 노출 */}
              <Icon name="person" className="text-icon-tertiary" />

              {/* 설정한 이미지 노출 */}
              {/* <Image src={sampleProfileImg} alt="" className="size-full object-cover" /> */}
            </div>
            <div className="flex flex-col">
              <div className="flex-center gap-[12px]">
                <Text typography="subtitle1-bold">픽토스</Text>

                {/* 관심 분야 설정 x */}
                <Text typography="text2-medium" className="text-text-caption">
                  관심분야 없음
                </Text>

                {/* 관심 분야 설정 o */}
                {/* <CategoryTag title="IT·프로그래밍" className="flex-center"></CategoryTag> */}
              </div>
              <Text typography="text1-regular" className="text-text-sub">
                이메일을 등록해주세요
              </Text>
            </div>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>

        <div className="mt-[4px] flex flex-col gap-[8px] rounded-[12px] border border-border-default px-[19px] pb-[15px] pt-[18px]">
          <div className="flex items-center justify-between">
            <Text typography="text1-bold" className="text-text-secondary">
              남은 퀴즈노트
            </Text>
            <Text typography="text1-bold" className="font-suit text-[var(--color-orange-400)]">
              28 / 40
            </Text>
          </div>
          <div className="relative h-[8px] w-full overflow-hidden rounded-[12px] bg-background-base-02">
            <div
              style={{ width: (extraNoteCount / 40) * 100 + '%' }}
              className="absolute right-0 top-0 z-10 h-full bg-fill-secondary-orange"
            ></div>
          </div>
          <Text typography="text1-medium" className="self-end text-text-sub">
            28개의 노트를 더 저장할 수 있습니다
          </Text>
        </div>

        <div className="flex-center mt-[28px] gap-[40px]">
          <div className="flex-center flex-col">
            <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
              <Icon name="note" className="size-[32px]" />
            </div>
            <Text typography="text2-medium">내 컬렉션</Text>
          </div>
          <div className="flex-center flex-col">
            <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
              <Icon name="graph" className="w-[32px]" />
            </div>
            <Text typography="text2-medium">퀴즈 분석</Text>
          </div>
          <div className="flex-center flex-col">
            <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
              <Icon name="calendar" className="size-[32px]" />
            </div>
            <Text typography="text2-medium">퀴즈 기록</Text>
          </div>
        </div>

        <button
          onClick={() => router.push('profile/today-quiz')}
          className="mt-[24px] flex w-full items-center justify-between rounded-[12px] bg-background-container-02 py-[12px] pl-[18px] pr-[16px]"
        >
          <div className="flex-center gap-[8px]">
            {/* <Icon name='star' className="size-[20px]"/> */}
            <Text typography="text1-medium" className="text-text-accent">
              오늘의 퀴즈 출석 현황
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[12px] text-icon-tertiary" />
        </button>

        <div className="mb-[30px] mt-[40px] flex flex-col gap-[22px]">
          <div className="flex flex-col">
            <Text typography="text2-medium" className="mb-[6px] text-text-caption">
              사용자 설정
            </Text>
            {profileMenuList.userSetting.map((item) => (
              <button
                onClick={() => router.push(item.href)}
                key={item.key}
                className="flex items-center justify-between py-[10px]"
              >
                <Text typography="text1-medium">{item.label}</Text>
                <Icon name="chevron-right" className="size-[12px]" />
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <Text typography="text2-medium" className="mb-[6px] text-text-caption">
              별 내역
            </Text>
            {profileMenuList.star.map((item) => (
              <button
                onClick={() => router.push(item.href)}
                key={item.key}
                className="flex items-center justify-between py-[10px]"
              >
                <Text typography="text1-medium">{item.label}</Text>
                <Icon name="chevron-right" className="size-[12px]" />
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <Text typography="text2-medium" className="mb-[6px] text-text-caption">
              문의 및 알림
            </Text>
            {profileMenuList.service.map((item) => (
              <button
                onClick={() => router.push(item.href)}
                key={item.key}
                className="flex items-center justify-between py-[10px]"
              >
                <Text typography="text1-medium">{item.label}</Text>
                <Icon name="chevron-right" className="size-[12px]" />
              </button>
            ))}
          </div>
        </div>

        <Text typography="text2-medium" className="flex items-center gap-[32px] text-text-caption">
          <span>현재 버전: 13.3.0</span>
          <button onClick={() => alert('clicked logout')}>로그아웃</button>
        </Text>
      </main>
    </>
  )
}

export default Profile
