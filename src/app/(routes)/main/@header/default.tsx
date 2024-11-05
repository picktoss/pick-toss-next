import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-02 px-[18px]">
      <Icon name="logo" className="h-[36px]" />

      <div className="flex-center gap-[16px]">
        <Text typography="subtitle2-bold" className="flex-center text-text-secondary">
          <Icon name="star" className="mr-[4px] size-[20px]" />
          130
        </Text>
        <button>
          <Icon name="search" className="size-[24px]" />
        </button>
        <button>
          <Icon name="notification" className="size-[24px]" />
        </button>
      </div>
    </header>
  )
}

export default Header
