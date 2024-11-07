import StarChargeHeader from '@/features/payment/components/star-charge/star-charge-header'
import SHINY_STAR_IMG from '@/../../public/images/star-shiny.png'
import Image from 'next/image'
import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import Icon from '@/shared/components/custom/icon'

const StarChargePage = () => {
  return (
    <div className="flex-center size-full flex-col">
      <div className="flex h-[50dvh] w-full flex-col justify-between">
        <StarChargeHeader />

        <div className="mb-[12%] w-full flex-col">
          <Image
            src={SHINY_STAR_IMG}
            alt=""
            className="size-[20dvh] max-h-[160px] max-w-[160px] justify-self-center"
          />

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
      </div>

      <div className="h-[50dvh] w-full">
        <div className="mt-[12%] flex items-center justify-between px-[16px]">
          <div className="flex items-center">
            <Icon name="star" className="size-[16px]" />
            <Text as="span" typography="text1-medium" className="font-suit">
              현재 나의 별:{' '}
              <Text as="span" color="accent">
                16
              </Text>
              <b>개</b>
            </Text>
          </div>
          <Button variant={'tinySquare'} colors={'outlined'}>
            별 사용 안내
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StarChargePage
