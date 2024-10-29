import { InquiryProvider } from './context/inquiry-context'
import InquiryType from './components/inquiry-type'
import TitleAndContent from './components/title-and-content'
import SetEmail from './components/set-email'
import Confirm from './components/confirm'
import Header from './components/header'

const Inquiry = () => {
  return (
    <InquiryProvider>
      <Header />

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto">
        <InquiryType />

        <div className="h-[8px] w-full bg-background-base-02"></div>

        <TitleAndContent />

        <div className="h-[8px] w-full bg-background-base-02"></div>

        <SetEmail />

        <Confirm />
      </main>
    </InquiryProvider>
  )
}

export default Inquiry
