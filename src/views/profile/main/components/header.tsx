import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-01 px-[18px]">
      <Text typography="title2">픽토스님</Text>
      <div className="flex-center gap-[16px]">
        <Text typography="subtitle2-bold" className="text-text-secondary">
          {/* <Icon name="star" className="size-[20px] mr-[4px]" /> */}
          130
        </Text>
        <button>
          <Icon name="notification" className="size-[24px]" />
        </button>
      </div>
    </header>
  )
}

export default Header
