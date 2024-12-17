'use client'

import { useUserStore } from '@/store/user'
import Link from 'next/link'
import CategoryTooltip from '../../category-tooltip'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import CategoryTag from '@/shared/components/custom/category-tag'
import { CATEGORIES } from '@/features/category/config'

const UserInfoCard = () => {
  const { userInfo: user } = useUserStore()

  const noInterests = !user?.interestCategories.length

  return (
    <Link
      href={'profile/account'}
      className="relative mt-[8px] flex h-[96px] w-full items-center justify-between"
    >
      {noInterests && <CategoryTooltip />}

      <div className="flex-center gap-[16px]">
        <div className="flex-center size-[48px] rounded-full bg-background-base-03">
          {/* 설정한 이미지가 없을 경우 아이콘 노출 */}
          <Icon name="person" className="text-icon-tertiary" />

          {/* 설정한 이미지 노출 */}
          {/* <Image src={sampleProfileImg} alt="" className="size-full object-cover" /> */}
        </div>
        <div className="flex flex-col">
          <div className="flex-center gap-[12px]">
            <Text typography="subtitle1-bold">{user?.name}</Text>

            {noInterests ? (
              <Text typography="text2-medium" className="text-text-caption">
                관심분야 없음
              </Text>
            ) : (
              <div className="flex items-center gap-[3px]">
                {user.interestCategories.map((category) => (
                  <CategoryTag
                    key={category}
                    title={CATEGORIES.find((value) => value.code === category)?.name ?? ''}
                    className="flex-center"
                  ></CategoryTag>
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
  )
}

export default UserInfoCard
