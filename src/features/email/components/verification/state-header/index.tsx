import Text from '@/shared/components/ui/text'

const VerifyStateHeader = ({ isAllowed }: { isAllowed: null | boolean }) => {
  return isAllowed ? (
    <Text typography="subtitle1-bold" className="mt-[8px]">
      이메일 주소로 전송된 <br />
      인증번호를 입력해주세요
    </Text>
  ) : (
    <>
      <Text typography="subtitle1-bold" className="my-[8px]">
        알림 받을 이메일 주소를 등록할 수 있어요
      </Text>
      <Text typography="text1-medium" className="text-text-sub">
        가입할 때 회원정보로 사용된 이메일은 변경되지 않아요.
      </Text>
    </>
  )
}

export default VerifyStateHeader
