import EmailVerification from '@/features/email/components/email-verification'
import VerifyStateHeader from '@/features/email/components/verify-state-header'
import { EmailVerificationProvider } from '@/features/email/context/email-verification-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const EmailPage = () => {
  return (
    <EmailVerificationProvider>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          이메일 설정
        </Text>
      </header>

      <main className="flex h-[calc(100dvh-54px-88px)] w-full flex-col overflow-y-auto px-[16px]">
        <VerifyStateHeader />

        <EmailVerification />
      </main>
    </EmailVerificationProvider>
  )
}

export default EmailPage
