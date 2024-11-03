'use client'

import { Input } from '@/shared/components/ui/input'
import Text from '@/shared/components/ui/text'
import { useInquiry } from '../../contexts/inquiry-context'

const InquirySetEmail = () => {
  const { email, setEmail } = useInquiry()

  return (
    <div className="mb-[12px] px-[16px] py-[20px]">
      <Text typography="title3" className="mb-[16px]">
        답변 받으실 이메일을 남겨주세요
      </Text>

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        essential
        label="이메일"
        placeholder="이메일 주소를 입력해주세요"
        className="mb-[24px]"
      />

      <Text typography="text2-medium" className="text-text-caption">
        답변은 평균 7일 정도 소요됩니다. <br />
        문의하신 답변이 완료되면 이메일과 앱 푸시로 알려드립니다. <br />앱 푸시가 꺼진 경우 알림이
        가지 않으니, 푸시 설정을 확인해주세요.
      </Text>
    </div>
  )
}

export default InquirySetEmail
