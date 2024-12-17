import SubscribeCard from '@/features/user/components/subscribe-card'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'

const SubscribePage = () => {
  return (
    <main className="h-[calc(100dvh-54px)] overflow-y-auto px-[16px]">
      <SubscribeCard />

      <div className="mb-[58px] mt-[12px] flex h-fit w-full flex-col gap-[8px] rounded-[16px] border border-border-default px-[19px] py-[23px]">
        <Text typography="text2-medium" color="sub">
          내 결제수단
        </Text>
        <Text typography="subtitle2-medium" color="caption">
          정보 없음
        </Text>
      </div>

      <div className="flex-center flex-col gap-[28px]">
        <Image src={'/images/no-star-history.png'} alt="" width={96} height={96} />
        <Text typography="text1-medium" color="sub" className="mb-[4px]">
          결제 내역이 없습니다
        </Text>
      </div>
    </main>
  )
}

export default SubscribePage
