import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import CategoryDrawer from '@/features/user/components/category-drawer'
import SetNameDialog from '@/features/user/components/set-name-dialog'
import Link from 'next/link'

const AccountPage = () => {
  const email = 'picktoss@gmail.com'

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <div className="flex-center h-fit w-full pb-[44px] pt-[24px]">
        <div className="flex-center relative size-[96px] rounded-full bg-background-base-03">
          <Icon name="person" className="size-[48px] text-icon-tertiary" />

          <input type="file" name="file" id="userImage" className="hidden" />
          <label
            htmlFor="userImage"
            className="flex-center absolute bottom-[-7px] right-0 size-[32px] cursor-pointer rounded-full border border-border-default bg-background-base-01"
          >
            <Icon name="camera" className="size-[16px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-[32px]">
        <SetNameDialog userName={'픽토스'} />

        <CategoryDrawer interestedCategory={'IT·프로그래밍'} />

        <Link href={'verify-email'} className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              이메일
            </Text>

            {/* 이메일 등록 여부에 따라 다르게 보여야함 */}
            <Text
              typography="subtitle2-medium"
              className={cn('text-text-caption', email && 'text-text-primary')}
            >
              {email ? email : '이메일 주소를 등록해주세요'}
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </Link>

        <button className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              로그인 정보
            </Text>
            <div className="flex items-center gap-[8px]">
              {/* 카카오 로그인 */}
              <Icon name="kakao" className="size-[20px]" />
              <Text typography="subtitle2-medium">카카오 로그인</Text>

              {/* 구글 로그인 */}
              {/* <Icon name="google" className="size-[20px]" />
                <Text typography="subtitle2-medium">구글 로그인</Text>
                <Text typography="text2-medium" className="font-suit text-text-caption">
                  picktoss@gmail.com
                </Text> */}
            </div>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      </div>

      <div className="flex-center pb-[48px] pt-[187px]">
        <button className="text-text1-medium text-text-caption">탈퇴하기</button>
      </div>
    </main>
  )
}

export default AccountPage
