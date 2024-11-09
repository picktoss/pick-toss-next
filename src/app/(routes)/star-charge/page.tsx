import StarChargeHeader from '@/features/payment/components/star-charge/star-charge-header'
import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'
import ProductContainer from '@/features/payment/components/star-charge/product-container'
import StarInstructionDrawer from '@/features/payment/components/star-charge/star-instruction-drawer'
import InviteReward from '@/features/star/components/invite-reward'

const StarChargePage = () => {
  return (
    <div className="flex size-full h-screen flex-col justify-between overflow-x-hidden">
      <StarChargeHeader />

      <main className="flex h-[calc(100dvh-54px)] w-full flex-col gap-[30px] overflow-y-auto overflow-x-hidden">
        <div className="flex w-full grow flex-col items-center justify-center">
          <div className="relative size-[20dvh] flex-col">
            <Image src="/images/star-shiny.png" fill alt="" className="justify-self-center" />
          </div>
          <div className="mt-[2dvh] flex flex-col items-center gap-[9px]">
            <Text typography="title3" color="primary-inverse">
              별을 충전해{' '}
              <Text as="span" color="accent">
                퀴즈
              </Text>
              를 만들어보세요
            </Text>

            <Text typography="text2-medium" color="primary-inverse">
              새로 생긴 퀴즈만큼 나의 실력은 상승할 거예요
            </Text>
          </div>
        </div>

        <div className="flex h-[50dvh] min-h-fit w-full flex-col justify-center pt-[10px]">
          <div className="mb-[10px] flex items-center justify-between px-[16px]">
            <div className="flex items-center">
              <Icon name="star" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="text1-medium" className="font-suit">
                현재 나의 별:{' '}
                <Text as="span" color="accent" className="font-bold">
                  16
                </Text>
                <b>개</b>
              </Text>
            </div>

            <StarInstructionDrawer />
          </div>

          {/* 상품 카드 */}
          <ProductContainer />

          {/* 친구 초대 버튼 */}
          <div className="flex-center px-[16px] pb-[3dvh] pt-[20px]">
            <InviteReward />
          </div>
        </div>
      </main>
    </div>
  )
}

export default StarChargePage
