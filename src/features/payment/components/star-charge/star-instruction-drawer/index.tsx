import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'

const StarInstructionDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={'tinySquare'} colors={'outlined'}>
          별 사용 안내
        </Button>
      </DrawerTrigger>

      <DrawerContent
        hideSidebar
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[60dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <header className="mt-[16px] mt-[24px] flex w-full items-center justify-between px-[18px]">
          <DrawerTitle className="text-title3">별 사용 안내</DrawerTitle>
          <DrawerClose asChild className="cursor-pointer text-text-primary">
            <Icon name="cancel" className="size-[24px]"></Icon>
          </DrawerClose>
        </header>

        <div className="overflow-y-auto px-[18px] py-[24px]">
          <div className="mb-[30px] flex flex-col">
            <Text typography="subtitle2-bold" className="mb-[12px]">
              별은 어떻게 사용되나요?
            </Text>

            <Text typography="text2-medium">
              · 별은 퀴즈노트에서 AI 퀴즈를 만들 때 사용됩니다. <br />
              · 충전한 별의 유효기간은 서비스 이용약관에 따릅니다. <br />
              · 별 가격에는 부가가치세가 포함되어있습니다. <br />
              · 유효기간이 임박한 순으로 먼저 사용됩니다. <br /> · 별 충전내역은 충전내역 메뉴에서
              확인 가능합니다.
            </Text>
          </div>

          <div>
            <Text typography="subtitle2-bold" className="mb-[12px]">
              구매 취소
            </Text>

            <Text typography="text2-medium">
              · 앱 내에서 충전한 별의 구매 취소는 구매 후 별을 한 번도 사용하지 않았을 경우에만
              가능하며, 마이{'>'}문의하기를 통해서 취소가 가능합니다. <br /> · 무료로 제공된 별의
              경우 구매 취소 및 환불 요청의 대상이 아닙니다.
            </Text>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StarInstructionDrawer
