'use client'

import { useUserStore } from '@/store/user'
import { useSession } from 'next-auth/react'
import { getGravatarUrl } from '../utils'
import Image from 'next/image'
import Icon from '@/shared/components/custom/icon'
import SetNameDialog from '../components/set-name-dialog'
import CategoryDrawer from '../components/category-drawer'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

const UserAccount = () => {
  const { userInfo } = useUserStore()
  const { data: session } = useSession()

  const interestCategories = userInfo?.interestCategories?.length
    ? userInfo.interestCategories
    : ['관심 분야 없음']

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
    <main className="relative h-[calc(100dvh-54px)] w-full overflow-y-auto px-[16px]">
      <div className="flex-center w-full pb-[44px] pt-[24px]">
        <div className="flex-center relative size-[96px] overflow-hidden rounded-full bg-background-base-03">
          {imageUrl ? (
            <Image src={imageUrl} alt="" fill className="object-cover" />
          ) : (
            <Icon name="person" className="size-[48px] text-icon-tertiary" />
          )}
          {/* 이미지 등록용 버튼 */}
          {/* <input type="file" name="file" id="userImage" className="hidden" />
          <label
            htmlFor="userImage"
            className="flex-center absolute bottom-[-7px] right-0 size-[32px] cursor-pointer rounded-full border border-border-default bg-background-base-01"
          >
            <Icon name="camera" className="size-[16px]" />
          </label> */}
        </div>
      </div>

      <div className="flex flex-col gap-[32px]">
        <SetNameDialog userName={userInfo?.name ?? ''} />

        <CategoryDrawer
          interestedCategories={
            interestCategories as (User.InterestedCategory | '관심 분야 없음')[]
          }
        />

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              이메일
            </Text>

            <Text
              typography="subtitle2-medium"
              className={cn('text-text-caption', userInfo?.email && 'text-text-primary')}
            >
              {userInfo?.email ? userInfo.email : '이메일 주소를 등록해주세요'}
            </Text>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              로그인 정보
            </Text>
            <div className="flex items-center gap-[8px]">
              {userInfo?.socialPlatform === 'KAKAO' ? (
                <>
                  <Icon name="kakao-with-background" className="size-[20px]" />
                  <Text typography="subtitle2-medium">카카오 로그인</Text>
                  <Text typography="text2-medium" className="font-suit text-text-caption">
                    {userInfo.email}
                  </Text>
                </>
              ) : (
                <>
                  <Icon name="google-with-background" className="size-[20px]" />
                  <Text typography="subtitle2-medium">구글 로그인</Text>
                  <Text typography="text2-medium" className="font-suit text-text-caption">
                    {userInfo?.email}
                  </Text>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-center absolute bottom-12 right-1/2 translate-x-1/2">
        <Link href={'/profile/resign'}>
          <Text typography="text1-medium" color="caption">
            탈퇴하기
          </Text>
        </Link>
      </div>
    </main>
  )
}

export default UserAccount
