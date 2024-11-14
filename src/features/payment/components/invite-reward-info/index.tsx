import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'

const InviteRewardInfo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute bottom-1/2 right-[-24px] translate-y-1/2">
        <Icon name="info" className="size-[16px]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[277px] bg-background-base-01">
        <div className="p-[16px] text-text2-medium text-text-secondary">
          <Text className="mb-[11px]">
            · 이미 PRO 버전을 이용중이실 경우, 다음 결제일이 7일 연장됩니다.
          </Text>
          <Text>· 초대를 받으신 분의 PRO 이용권은 가입 시점부터 7일간 적용됩니다.</Text>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default InviteRewardInfo
