import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-[54px] w-full max-w-mobile shrink-0 items-center bg-white px-[16px]">
      <GoBackButton />
      <div className="absolute right-1/2 translate-x-1/2">
        <Text as="h1" typography="subtitle2-medium">
          컬렉션 정보수정
        </Text>
      </div>
    </header>
  )
}

export default Header
