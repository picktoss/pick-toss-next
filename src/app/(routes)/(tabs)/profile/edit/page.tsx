import TitleHeader from '@/shared/components/title-header'
import EditForm from './components/edit-form'

export default function ProfileEdit() {
  return (
    <main className="h-[calc(100vh-84px)] bg-white lg:h-screen">
      <TitleHeader title="프로필 정보 수정" />
      <div className="px-[20px] py-[44px]">
        <EditForm />
      </div>
    </main>
  )
}
