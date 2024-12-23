import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import CategoryTooltip from '@/features/user/category-tooltip'
import Link from 'next/link'
import { PROFILE_MENU_LIST } from '@/features/user/config/profile-menu-list'
import Footer from '@/features/user/components/footer'
import { getUserInfo } from '@/requests/user/server'
import CategoryTag from '@/shared/components/custom/category-tag'
import { CATEGORIES } from '@/features/category/config'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import Image from 'next/image'
import { getGravatarUrl } from '@/features/user/utils'

const ProfilePage = async () => {
  const user = await getUserInfo()
  const session = await auth()

  const noInterests = !user.interestCategories.length

  const maxPossessDocumentCount = user.documentUsage.maxPossessDocumentCount
  const possessDocumentCount = user.documentUsage.possessDocumentCount
  const addableDocumentCount = maxPossessDocumentCount - possessDocumentCount

  const getProfileImage = (): string | null => {
    if (session?.user?.image) {
      return session.user.image
    }
    if (session?.user?.email) {
      return getGravatarUrl(session.user.email)
    }
    return null
  }

  const imageUrl = getProfileImage()

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px] pb-[54px]">
      <Link
        href={'profile/account'}
        className="relative mt-[8px] flex h-[96px] w-full items-center justify-between"
      >
        {noInterests && <CategoryTooltip />}

        <div className="flex-center gap-[16px]">
          <div className="flex-center relative size-[48px] overflow-hidden rounded-full bg-background-base-03">
            {imageUrl ? (
              <Image src={imageUrl} alt="" fill className="object-cover" />
            ) : (
              <Icon name="person" className="text-icon-tertiary" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex-center gap-[12px]">
              <Text typography="subtitle1-bold">{user.name}</Text>

              {noInterests ? (
                <Text typography="text2-medium" className="text-text-caption">
                  관심분야 없음
                </Text>
              ) : (
                <div className="flex items-center gap-[3px]">
                  {user.interestCategories.map((category) => (
                    <CategoryTag
                      key={category}
                      title={CATEGORIES.find((value) => value.id === category)?.name ?? ''}
                      className="flex-center"
                    />
                  ))}
                </div>
              )}
            </div>

            <Text typography="text1-regular" className="text-text-sub">
              {user.email ?? '이메일을 등록해주세요'}
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
            {possessDocumentCount} / {maxPossessDocumentCount}
          </Text>
        </div>
        <div className="relative h-[8px] w-full overflow-hidden rounded-[12px] bg-background-base-02">
          <div
            style={{ width: (addableDocumentCount / maxPossessDocumentCount) * 100 + '%' }}
            className="absolute right-0 top-0 z-10 h-full bg-fill-secondary-orange"
          ></div>
        </div>
        <Text typography="text1-medium" className="self-end text-text-sub">
          {addableDocumentCount}개의 노트를 더 저장할 수 있습니다
        </Text>
      </div>

      <div className="flex-center mt-[28px] gap-[40px]">
        <Link href={'/collections?tab=my-collection'} className="flex-center flex-col">
          <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
            <Icon name="my-collection" className="size-[32px]" />
          </div>
          <Text typography="text2-medium">내 컬렉션</Text>
        </Link>

        <div className="flex-center flex-col">
          <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
            <Icon name="graph" className="w-[32px]" />
          </div>
          <Text typography="text2-medium">퀴즈 분석</Text>
        </div>

        <Link href={'/record'} className="flex-center flex-col">
          <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
            <Icon name="calendar" className="size-[32px]" />
          </div>
          <Text typography="text2-medium">퀴즈 기록</Text>
        </Link>
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
        <div className="flex flex-col">
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
        </div>
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

      <Footer />
    </main>
  )
}

export default ProfilePage
