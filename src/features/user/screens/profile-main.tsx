'use client'

import { useUserStore } from '@/store/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getGravatarUrl } from '../utils'
import Link from 'next/link'
import CategoryTooltip from '../category-tooltip'
import Image from 'next/image'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import CategoryTag from '@/shared/components/custom/category-tag'
import { CATEGORIES } from '@/features/category/config'
import MyCollectionLink from '../components/my-collection-link'
import { AnalysisLink } from '../components/analysis-link'
import QuizRecordLink from '../components/quiz-record-link'
import { PROFILE_MENU_LIST } from '../config'

const ProfileMain = () => {
  const { userInfo: user } = useUserStore()
  const { data: session } = useSession()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  /** swagger 타입 이슈로 DeepRequired 적용되어있기 때문에 optional 체이닝이 들어감
   * => noInterests가 무조건 true가 되어 한 번 리스트의 초기값을 설정해주는 방식으로 변경했습니다
   */
  const interestCategories = user?.interestCategories ?? []
  const noInterests = interestCategories.length === 0

  const maxPossessDocumentCount = user?.documentUsage.maxPossessDocumentCount ?? 0
  const possessDocumentCount = user?.documentUsage.possessDocumentCount ?? 0
  const addableDocumentCount = maxPossessDocumentCount - possessDocumentCount

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (session?.user?.image) {
        setImageUrl(session.user.image)
      } else if (session?.user?.email) {
        const gravatarUrl = await getGravatarUrl(session.user.email)
        setImageUrl(gravatarUrl)
      } else {
        setImageUrl(null)
      }
    }

    void fetchProfileImage()
  }, [session?.user?.email, session?.user?.image])

  return (
    <div className="w-full px-[16px]">
      <Link
        href={'profile/account'}
        className="relative mt-[8px] flex h-[96px] w-full items-center justify-between"
      >
        {noInterests && <CategoryTooltip />}

        <div className="flex-center gap-[16px]">
          <div className="flex-center relative size-[48px] shrink-0 overflow-hidden rounded-full bg-background-base-03">
            {imageUrl ? (
              <Image src={imageUrl} alt="" fill className="object-cover" />
            ) : (
              <Icon name="person" className="text-icon-tertiary" />
            )}
          </div>

          <div className="flex w-fit flex-col gap-1">
            <div className="flex items-center gap-[12px]">
              <Text
                typography="subtitle1-bold"
                className="w-[calc(100vw-290px)] max-w-[calc(430px-290px)] truncate"
              >
                {user?.name}
              </Text>

              {noInterests ? (
                <Text typography="text2-medium" className="text-text-caption">
                  관심분야 없음
                </Text>
              ) : (
                <div className="flex items-center gap-[3px]">
                  {user?.interestCategories.map((category) => (
                    <CategoryTag
                      key={category}
                      title={CATEGORIES.find((value) => value.id === category)?.name ?? ''}
                      className="flex-center inline-block shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>

            <Text typography="text1-regular" className="text-text-sub">
              {user?.email ?? '이메일을 등록해주세요'}
            </Text>
          </div>
        </div>
        <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
      </Link>

      {/* TODO */}
      <div className="mt-[4px] flex flex-col gap-[8px] rounded-[12px] border border-border-default px-[19px] pb-[15px] pt-[18px]">
        <div className="flex items-center justify-between">
          <Text typography="text1-bold" className="text-text-secondary">
            남은 퀴즈노트
          </Text>
          <Text typography="text1-bold" className="font-suit text-[var(--color-orange-400)]">
            {maxPossessDocumentCount - possessDocumentCount} / {maxPossessDocumentCount}
          </Text>
        </div>
        <div className="relative h-[8px] w-full overflow-hidden rounded-[12px] bg-background-base-02">
          <div
            style={{ width: (addableDocumentCount / maxPossessDocumentCount) * 100 + '%' }}
            className="absolute right-0 top-0 z-10 h-full bg-fill-secondary-orange"
          />
        </div>
        <Text typography="text1-medium" className="self-end text-text-sub">
          {addableDocumentCount}개의 노트를 더 저장할 수 있습니다
        </Text>
      </div>

      <div className="flex-center mt-[28px] gap-[40px]">
        <MyCollectionLink />

        <AnalysisLink />

        <QuizRecordLink />
      </div>

      <Link
        href={'profile/today-quiz'}
        className="mt-[24px] flex w-full items-center justify-between rounded-[12px] bg-background-container-02 py-[12px] pl-[18px] pr-[16px]"
      >
        <div className="flex-center gap-[8px]">
          <Icon name="star" className="size-[20px]" />
          <Text typography="text1-medium" className="text-text-accent">
            오늘의 퀴즈 출석 현황
          </Text>
        </div>
        <Icon name="chevron-right" className="size-[12px] text-icon-tertiary" />
      </Link>

      <div className="mb-[30px] mt-[40px] flex flex-col gap-[22px]">
        <div className="flex flex-col">
          <Text typography="text2-medium" className="mb-[6px] text-text-caption">
            사용자 설정
          </Text>
          {PROFILE_MENU_LIST.userSetting.map((item) => (
            <Link
              href={item.href}
              key={item.key}
              className="flex items-center justify-between py-[10px]"
            >
              <Text typography="text1-medium">{item.label}</Text>
              <Icon name="chevron-right" className="size-[12px]" />
            </Link>
          ))}
        </div>
        {/* TODO: 결제 기능 붙은 후 */}
        {/* <div className="flex flex-col">
        <Text typography="text2-medium" className="mb-[6px] text-text-caption">
          구독 관리
        </Text>
        {PROFILE_MENU_LIST.star.map((item) => (
          <Link
            href={item.href}
            key={item.key}
            className="flex items-center justify-between py-[10px]"
          >
            <Text typography="text1-medium">{item.label}</Text>
            <Icon name="chevron-right" className="size-[12px]" />
          </Link>
        ))}
      </div> */}
        <div className="flex flex-col">
          <Text typography="text2-medium" className="mb-[6px] text-text-caption">
            문의 및 알림
          </Text>
          {PROFILE_MENU_LIST.service.map((item) => (
            <Link
              href={item.href}
              key={item.key}
              className="flex items-center justify-between py-[10px]"
            >
              <Text typography="text1-medium">{item.label}</Text>
              <Icon name="chevron-right" className="size-[12px]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileMain
