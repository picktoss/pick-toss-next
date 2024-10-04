import TitleHeader from '@/shared/components/title-header'
import EditForm from '@/views/profile-edit'

const Page = () => {
  return (
    <main className="h-[calc(100vh-84px)] bg-white lg:h-screen">
      <TitleHeader title="프로필 정보 수정" />
      <div className="px-[20px] py-[44px]">
        <EditForm />
      </div>
    </main>
  )
}

export default Page
