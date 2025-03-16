import Text from '@/shared/components/ui/text'
import Footer from '@/features/user/components/footer'
import LogoutDialog from '@/features/user/components/logout-dialog'
import InaccessibleView from '@/features/common/inaccessible-view'
import ProfileMain from '@/features/user/screens/profile-main'

const ProfilePage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto scrollbar-hide">
      <InaccessibleView />

      <ProfileMain />

      <div className="flex items-center gap-[32px] px-[16px] pb-[54px] pt-[10px] text-text2-medium text-text-caption">
        <Text>현재 버전: 13.3.0</Text>
        <LogoutDialog trigger={<button>로그아웃</button>} />
      </div>

      <Footer />
    </main>
  )
}

export default ProfilePage
