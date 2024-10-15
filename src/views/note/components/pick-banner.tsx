import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import * as pin from '@/../../public/icons/pin.svg'

// PickBanner 컴포넌트
const PickBanner = () => {
  return (
    <div className="flex-center mb-[14px] h-[44px] w-full gap-[4px] bg-background-container-03">
      <Text typography="text1-medium" className="flex-center gap-[16px] text-text-info">
        <Text className="flex items-center">
          <Image src={pin} alt="" width={16} height={16} className="mr-[2.5px]" />
          내가 어려워했던 문제는?
        </Text>
        <Text className="font-bold">
          복습 <i>p</i>ick
        </Text>
      </Text>
      <Icon name="chevron-down" className="text-icon-tertiary" />
    </div>
  )
}

export default PickBanner
