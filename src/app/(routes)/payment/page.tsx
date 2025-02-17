import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Tag from '@/shared/components/ui/tag'
import InviteRewardDrawer from '@/features/payment/components/invite-reward-drawer'

const PaymentPage = () => {
  // 임시
  const isProUser = false

  return (
    <div className="flex size-full h-screen flex-col justify-between overflow-x-hidden">
      <main className="flex h-[calc(100dvh-54px)] w-full flex-col gap-[30px] overflow-y-auto overflow-x-hidden">
        <div className="flex w-full grow flex-col items-center justify-center">
          <div className="relative h-[calc(24dvh*1.2)] w-[24dvh] flex-col">
            <Image src="/images/infinite-star.png" fill alt="" className="justify-self-center" />
          </div>
          <div className="mt-[1dvh] flex flex-col items-center gap-[9px]">
            <Text typography="title2" color="primary-inverse">
              <Text as="span" color="special">
                PRO
              </Text>
              에서 퀴즈를 마음껏 즐기세요
            </Text>

            <Text typography="text1-medium" color="primary-inverse">
              새로 생긴 퀴즈만큼 나의 실력은 상승할 거예요
            </Text>

            <Text typography="subtitle1-bold" color="primary-inverse" className="mt-[1.5dvh]">
              ₩8,900 / 월
            </Text>
          </div>
        </div>

        <div className="flex h-[45dvh] min-h-fit w-full flex-col justify-center gap-[20px] px-[16px] pb-[3dvh] pt-[10px]">
          <div className="flex-center">
            <div className="flex w-fit flex-col gap-[16px] py-[9px]">
              <div className="flex items-center">
                <Icon name="check" className="mr-[12px] w-[17px] text-[var(--color-blue-300)]" />
                <Text typography="text1-medium" color="secondary">
                  별 무제한
                </Text>
              </div>
              <div className="flex items-center">
                <Icon name="check" className="mr-[12px] w-[17px] text-[var(--color-blue-300)]" />
                <Text typography="text1-medium" color="secondary">
                  최대 저장 노트 200개
                </Text>
              </div>
              <div className="flex items-center">
                <Icon name="check" className="mr-[12px] w-[17px] text-[var(--color-blue-300)]" />
                <Text typography="text1-medium" color="secondary">
                  퀴즈 PDF 다운로드 기능 제공
                </Text>
              </div>
              <div className="flex items-center">
                <Icon name="check" className="mr-[12px] w-[17px] text-[var(--color-blue-300)]" />
                <Text typography="text1-medium" color="secondary">
                  광고 없는 서비스 이용
                </Text>
              </div>
            </div>
          </div>

          <Button variant={'largeRound'} disabled={isProUser} className="w-full">
            {isProUser ? '현재 PRO 이용중' : '지금 바로 시작하기'}
          </Button>

          {/* 친구 초대 버튼 */}
          <InviteRewardDrawer
            triggerComponent={
              <button className="flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]">
                <div className="flex-center gap-[8px]">
                  <Tag className="bg-fill-primary-blue">EVENT</Tag>
                  <Text typography="text1-bold" className="text-text-info">
                    친구 초대하고 무료로 별 받기
                  </Text>
                </div>
                <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
              </button>
            }
          />
        </div>
      </main>
    </div>
  )
}

export default PaymentPage
