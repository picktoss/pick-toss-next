import NIGHT_SKY_IMG from '@/../../public/images/pro-star-background.png'
import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'
import InviteReward from '@/features/payment/components/invite-reward'
import { Button } from '@/shared/components/ui/button'
import GoBackButton from '@/shared/components/custom/go-back-button'

interface Props {
  isProUser: boolean
  onClose: () => void
}

const PaymentPopup = ({ isProUser, onClose }: Props) => {
  return (
    <div
      className="fixed bottom-0 right-1/2 z-20 h-dvh w-dvw max-w-mobile translate-x-1/2"
      style={{
        backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className="relative z-30 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
        <GoBackButton icon="cancel" onClick={onClose} />
      </header>

      <div className="flex size-full flex-col justify-between overflow-x-hidden">
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
            <InviteReward />
          </div>
        </main>
      </div>
    </div>
  )
}

export default PaymentPopup
