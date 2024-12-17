'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { Type, useInquiry } from '../../../contexts/inquiry-context'

const inquiryTypes = [
  { key: 'ERROR', label: '오류문의' },
  { key: 'PAYMENT', label: '결제문의' },
  { key: 'PARTNERSHIP', label: '제휴문의' },
  { key: 'EVENT', label: '이벤트' },
  { key: 'ACCOUNT_INFO', label: '회원정보문의' },
  { key: 'CANCELLATION', label: '취소요청' },
  { key: 'OTHER', label: '기타' },
] as const

const InquiryType = () => {
  const { type, setType } = useInquiry()

  return (
    <>
      <Text typography="title3" className="mb-[4px] mt-[12px] px-[16px]">
        어떤 종류의 문의가 필요하세요?
      </Text>
      <div
        onClick={(e) => {
          const eventTarget = e.target as HTMLElement
          if (!eventTarget.id) return
          else setType(eventTarget.id as Type)
        }}
        className="flex w-full flex-wrap gap-[8px] px-[16px] py-[20px]"
      >
        {inquiryTypes.map((value) => (
          <Button
            key={value.key}
            id={value.key}
            variant={'smallRound'}
            colors={type === value.key ? 'selected' : 'outlined'}
          >
            {value.label}
          </Button>
        ))}
      </div>
    </>
  )
}

export default InquiryType
