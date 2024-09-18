import Loading from '@/shared/components/loading'
import AppSettingSectionContent from '@/views/profile/components/app-setting-section-content'
import Section from '@/views/profile/components/section'
import SignOut from '@/views/profile/components/sign-out'
import UserInfoSectionContent from '@/views/profile/components/user-info-section-content'
import UserSettingSectionContent from '@/views/profile/components/user-setting-section-content'
import { profileConfig } from '@/views/profile/config'
import { Suspense } from 'react'

const Page = () => {
  return (
    <main className="px-[20px] pb-[66px]">
      <Suspense fallback={<Loading center />}>
        <Section className="mb-[52px] mt-[45px]" content={<UserInfoSectionContent />} />
      </Suspense>

      <Section
        className="mb-[40px]"
        title={profileConfig.userConfig.name}
        content={<UserSettingSectionContent />}
      />

      <Section
        className="mb-[24px]"
        title={profileConfig.appConfig.name}
        content={<AppSettingSectionContent />}
      />

      <SignOut />
    </main>
  )
}

export default Page
