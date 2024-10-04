import TitleHeader from '@/shared/components/title-header'
import ProfileNotification from '@/views/notification'

const Page = () => {
  return (
    <main className="h-[calc(100vh-84px)] bg-white lg:h-screen">
      <TitleHeader title="알림 설정" />
      <ProfileNotification />
    </main>
  )
}

export default Page
