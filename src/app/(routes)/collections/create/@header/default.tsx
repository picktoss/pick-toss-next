import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

interface Props {
  searchParams: {
    step: 'select-document' | 'create-form'
  }
}

const Header = ({ searchParams }: Props) => {
  const step = ['select-document', 'create-form'].includes(searchParams.step)
    ? searchParams.step
    : 'select-document'

  return (
    <header className="fixed top-0 z-50 flex h-[54px] w-full max-w-mobile shrink-0 items-center bg-white px-[16px]">
      <GoBackButton icon={step === 'select-document' ? 'cancel' : 'arrow-left'} />
      <div className="absolute right-1/2 translate-x-1/2">
        <Text as="h1" typography="subtitle2-medium">
          컬렉션 만들기
        </Text>
      </div>
    </header>
  )
}

export default Header
