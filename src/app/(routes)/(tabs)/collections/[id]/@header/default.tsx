import GoBackButton from '@/shared/components/custom/go-back-button'
import Icon from '@/shared/components/custom/icon'

const Header = () => {
  return (
    <header className="sticky top-0 h-[54px] shrink-0 bg-white">
      <div className="flex h-full items-center justify-between px-[16px] text-icon-system">
        <GoBackButton />
        <div className="flex items-center gap-[16px]">
          <Icon name="share" className="size-[24px]" />
          <Icon name="menu-dots" className="size-[24px]" />
        </div>
      </div>
    </header>
  )
}

export default Header
