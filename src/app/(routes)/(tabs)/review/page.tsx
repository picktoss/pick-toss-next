import { CommonLayout } from '@/components/common-layout'
import Profile from '@/components/profile'
import { Button } from '@/components/ui/button'

export default function Review() {
  return (
    <CommonLayout
      title="복습 체크"
      mobileOptions={{
        hasNotifications: true,
      }}
    >
      <main className="mt-[18px] px-[20px]">
        <Profile trigger={<Button>프로필 열기</Button>} />
      </main>
    </CommonLayout>
  )
}
