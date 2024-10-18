import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'

const Header = () => {
  return (
    <header>
      <div
        className={cn(
          'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 bg-background-base-01 px-[16px]'
        )}
      >
        <div className="flex size-full items-center justify-between">
          <button>
            <Icon name="cancel" className="size-[24px]" />
          </button>

          <div className="rounded-full bg-background-base-02 px-[16px] py-[5px] text-text1-medium">
            📊 전공 공부
          </div>

          <button className="text-button2 text-button-text-primary">저장</button>
        </div>
      </div>
    </header>
  )
}

export default Header
