import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'
import { StarHistoryTab } from '../history-tab'

interface Props {
  activeTab: StarHistoryTab
}

const NoHistory = ({ activeTab }: Props) => {
  return (
    <div className="flex-center size-full flex-col">
      <Image
        src={'/images/no-star-history.png'}
        alt=""
        width={96}
        height={96}
        className="mb-[24px]"
      />
      <Text typography="subtitle1-bold" className="mb-[4px]">
        {activeTab === 'all' && ''}
        {activeTab === 'payment' && '결제 '}
        {activeTab === 'expend' && '사용 '}
        {activeTab === 'reward' && '적립 '}
        내역이 없습니다
      </Text>
      <Text typography="text1-medium" className="mb-[32px] text-text-sub">
        퀴즈를 더 만들고 싶다면 별을 충전해보세요
      </Text>

      <Link
        href={'/profile/star-charge'}
        className="text-text1-medium text-button-text-link underline decoration-button-text-link"
      >
        별 충전소 가기
      </Link>
    </div>
  )
}

export default NoHistory
