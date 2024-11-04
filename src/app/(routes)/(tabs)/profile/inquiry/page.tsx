import InquiryConfirm from '@/features/user/components/inquiry-confirm'
import InquiryType from '@/features/user/components/inquiry-type'
import InquirySetEmail from '@/features/user/components/inquiry-set-email'
import InquiryTitleAndContent from '@/features/user/components/inquiry-title-and-content'

const InquiryPage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto">
      <InquiryType />

      <div className="h-[8px] w-full bg-background-base-02"></div>

      <InquiryTitleAndContent />

      <div className="h-[8px] w-full bg-background-base-02"></div>

      <InquirySetEmail />

      <InquiryConfirm />
    </main>
  )
}

export default InquiryPage
