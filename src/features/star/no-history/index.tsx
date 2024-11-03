import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

const NoHistory = ({ tab }: { tab: 'all' | 'payment' | 'expend' | 'reward' }) => {
  return (
    <div className="flex-center size-full flex-col">
      <Image src="/assets-no-star-history.png" alt="" className="mb-[24px] size-[96px]" />
      <Text typography="subtitle1-bold" className="mb-[4px]">
        {tab === 'all' && ''}
        {tab === 'payment' && '결제 '}
        {tab === 'expend' && '사용 '}
        {tab === 'reward' && '적립 '}
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
