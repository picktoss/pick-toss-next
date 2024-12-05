import Icon from '@/shared/components/custom/icon'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/v3/text'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import INFINITE_IMG from '@/../../public/images/infinite-icon.png'
import Tag from '@/shared/components/ui/v3/tag'
import InviteRewardInfo from './invite-reward-info'
import { Input } from '@/shared/components/ui/v3/input'
import { Button } from '@/shared/components/ui/v3/button'

const InviteReward = ({ className }: { className?: HTMLElement['className'] }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]',
            className
          )}
        >
          <div className="flex-center gap-[8px]">
            <Tag className="bg-fill-primary-blue">EVENT</Tag>
            <Text typography="text1-bold" className="text-text-info">
              친구 초대하고 픽토스 PRO 이용하기
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <div className="my-[20px] flex h-[calc(80dvh-12px)] w-full flex-col gap-[63px] overflow-y-auto px-[45px]">
          <DrawerHeader className="flex h-fit w-full flex-col items-center gap-[24px] px-0">
            <Image src={INFINITE_IMG.src} width={212} height={110} alt="" />

            <div className="flex flex-col items-center gap-[8px]">
              <div className="relative">
                <DrawerTitle className="font-suit text-title3">초대할 때마다 7일!</DrawerTitle>
                <InviteRewardInfo />
              </div>

              <Text typography="text1-regular" color="secondary" className="text-center">
                친구, 가족, 지인들에게 픽토스를 공유해주세요 <br />
                그분이 해당 링크를 통해 픽토스에 가입하실 경우 <br />두 분 모두에게 픽토스 PRO 7일
                이용권을 드려요!
              </Text>
            </div>
          </DrawerHeader>

          <div className="flex flex-col gap-[20px]">
            <Input
              label="내 링크"
              defaultValue={'www.picktoss-example-link/22345'}
              right={
                <Button variant={'tinySquare'} colors={'outlined'}>
                  복사하기
                </Button>
              }
              className="mx-[8px]"
              disabled
            />

            <div className="flex flex-col gap-[8px]">
              <Button
                variant={'mediumRound'}
                className="w-full bg-background_v3-kakao text-icon-kakao hover:bg-background_v3-kakao"
              >
                <Icon name="kakao" className="mr-[12px] size-[20px]" />
                카카오톡에 공유하기
              </Button>

              <Button variant={'mediumRound'} className="w-full">
                <Icon name="share" className="mr-[8px] size-[20px]" />
                링크 공유하기
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default InviteReward
