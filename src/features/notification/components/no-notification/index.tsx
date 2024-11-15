import Image from 'next/image'
import MEGAPHONE_IMG from '@/../../public/images/megaphone.png'
import Text from '@/shared/components/ui/text'

const NoNotification = () => {
  return (
    <div className="flex-center size-full flex-col">
      <Image src={MEGAPHONE_IMG} alt="" className="mb-[16px] size-[88px]" />
      <Text typography="text1-medium" color="sub" className="mb-[100px]">
        아직 받은 알림이 없어요
      </Text>
    </div>
  )
}

export default NoNotification
