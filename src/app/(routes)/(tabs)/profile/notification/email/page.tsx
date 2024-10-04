import TitleHeader from '@/shared/components/title-header'
import EmailSettingForm from '@/views/notification-email'

const Page = () => {
  return (
    <main className="h-[calc(100vh-84px)] bg-white lg:h-screen">
      <TitleHeader title="퀴즈 알림 이메일 설정" />
      <div className="px-[20px] py-[38px]">
        <EmailSettingForm />
      </div>
    </main>
  )
}

export default Page
