import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import SocialLogin from '../auth/social-login'
import Link from 'next/link'
import ClearBrowserData from '../user/components/clear-browser-data'

const AppStartView = () => {
  return (
    <main className="flex-center relative z-20 h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden bg-background-base-01 px-[43px] scrollbar-hide">
      <Icon name="start-picktoss" className="h-auto w-[160px]" />

      <Icon name="logo" className="mb-[41.4px] mt-[17px] h-auto w-[182px]" />

      <Text typography="subtitle2-medium">3초만에 픽토스 시작하기</Text>

      <SocialLogin className="mb-[20px] mt-[16px]" />
      <ClearBrowserData />

      <Text typography="caption-medium" color="caption" className="text-center">
        로그인 시{' '}
        <Link
          href="https://picktoss.notion.site/1209d818f56080fbb469e82def758e9c?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          개인정보보호 정책
        </Link>{' '}
        및{' '}
        <Link
          href="https://picktoss.notion.site/1209d818f560809aad11c5b64020d735?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          서비스 이용약관
        </Link>
        에 동의하는 것으로 간주하며, 서비스 이용을 위해 이메일과 이름을 수집합니다.
      </Text>
    </main>
  )
}

export default AppStartView
