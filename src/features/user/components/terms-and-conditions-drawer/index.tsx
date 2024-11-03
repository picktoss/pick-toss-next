import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'

const content = `
코니티는 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 다음과 같이 개인정보를 수집 이용합니다,
- 수집 이용 항목: 이름(닉네임), 이메일주소, 신고내용
- 수집 이용 목적: 법률 위반 사항 신고, 처리결과 회신
- 보유 및 이용기간: 전자상거래등에서의 소비자보호에 관한 법률에 따라 3년
위 개인정보 수집 이용에 동의하지 않으실 수 있으며, 동의하지 않는 경우 
신고가 제한됩니다.
`

const TermsAndConditionsDrawer = ({
  setIsAgreeChecked,
}: {
  setIsAgreeChecked: (value: boolean) => void
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Text as="button" typography="text2-medium" className="mr-[18px] text-text-sub">
          약관 보기
        </Text>
      </DrawerTrigger>

      <DrawerContent
        hideSidebar
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-[50dvh] max-w-mobile rounded-t-[20px]"
      >
        <div className="h-[calc(100%-100px)] px-[18px] pt-[24px]">
          <div className="mb-[27px] flex items-center justify-between">
            <DrawerTitle className="text-title3">개인정보 수집 및 이용동의</DrawerTitle>
            <DrawerClose>
              <Icon name="cancel" className="size-[24px] text-icon-secondary" />
            </DrawerClose>
          </div>

          <Text
            typography="text2-medium"
            className="max-h-[calc(100%-75px)] overflow-y-auto text-text-secondary"
          >
            {content}
          </Text>
        </div>

        <DrawerFooter>
          <DrawerClose onClick={() => setIsAgreeChecked(true)}>
            <Button variant={'largeRound'} colors={'primary'} className="w-full">
              약관 동의하기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TermsAndConditionsDrawer
