import GoBackButton from '@/shared/components/go-back-button'
import Text from '@/shared/components/ui/text'

const Inquiry = () => {
  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          문의하기
        </Text>
      </header>

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]"></main>
    </>
  )
}

export default Inquiry
