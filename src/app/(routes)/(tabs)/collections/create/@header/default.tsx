import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="sticky top-0 flex h-[54px] shrink-0 items-center bg-white px-[16px]">
      <GoBackButton icon="cancel" />
      <div className="absolute right-1/2 translate-x-1/2">
        <Text as="h1" typography="subtitle2-medium">
          컬렉션 만들기
        </Text>
      </div>
    </header>
  )
}

export default Header
