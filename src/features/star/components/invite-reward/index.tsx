import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Input } from '@/shared/components/ui/input'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'

const InviteReward = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]">
          <div className="flex-center gap-[8px]">
            <Tag className="bg-fill-primary-blue">EVENT</Tag>
            <Text typography="text1-bold" className="text-text-info">
              친구 초대하고 무료로 별 받기
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <div className="my-[20px] flex h-[calc(80dvh-12px)] w-full flex-col gap-[40px] overflow-y-auto px-[45px]">
          <DrawerHeader className="mt-[40px] flex w-full flex-col items-center gap-[24px]">
            <div className="relative">
              <Icon name="star" className="size-[82px]" />
              <Text
                typography="title3"
                color="secondary"
                className="absolute bottom-0 right-0 font-suit"
              >
                x50
              </Text>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <DrawerTitle className="font-suit text-title3">초대할 때마다 별 50개!</DrawerTitle>

              <Text typography="text1-regular" color="secondary" className="text-center">
                친구, 가족, 지인들에게 픽토스를 공유해주세요 <br />
                그분이 해당 링크를 통해 픽토스에 가입하실 경우 <br /> 두 분 모두에게 별 50개를
                드려요!
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
                className="w-full bg-background-kakao text-icon-kakao hover:bg-background-kakao"
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
