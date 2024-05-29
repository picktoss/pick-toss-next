import TitleHeader from '@/components/title-header'
import EditForm from './components/edit-form'

export default function ProfileEdit() {
  return (
    <main className="h-[calc(100vh-84px)] bg-white lg:h-screen">
      <TitleHeader title="프로필 정보 수정" />
      <div className="px-[20px]">
        <div className="mb-[24px] mt-[17px] flex justify-center">
          <div className="size-[136px] rounded-full bg-orange-03" />
        </div>
        <EditForm />
      </div>
    </main>
  )
}
