import ResignForm from '@/features/user/components/resign-form'
import Text from '@/shared/components/ui/text'

const ResignPage = () => {
  return (
    <main className="h-[calc(100vh-54px-124px)] w-full flex-col overflow-y-auto overflow-x-hidden px-[16px] pt-[8px]">
      <Text typography="title2" className="pb-[12px] pt-[16px]">
        탈퇴 이유를 선택해주세요
      </Text>
      <Text typography="text1-medium" color="sub">
        의견을 통해 보다 나은 서비스 제공을 위해 노력할게요
      </Text>

      <ResignForm />
    </main>
  )
}

export default ResignPage
