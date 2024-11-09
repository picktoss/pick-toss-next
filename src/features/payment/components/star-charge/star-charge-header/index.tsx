import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const StarChargeHeader = () => {
  return (
    <header className="relative z-10 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
      <GoBackButton icon="cancel" />
      <Text typography="subtitle2-medium" className="center">
        별 충전소
      </Text>
    </header>
  )
}

export default StarChargeHeader
