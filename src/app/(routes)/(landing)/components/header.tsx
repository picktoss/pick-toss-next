import { Button } from '@/components/ui/button'
import { LogoIcon, MenuIcon } from '../svgs'

export function Header() {
  return (
    <header className="flex h-[60px] items-center justify-between border-b border-gray-02 px-[16px]">
      <LogoIcon />
      <div className="flex items-center gap-[19px]">
        <Button
          variant="gradation"
          className="h-[27px] w-[71px] !rounded-[16px] !text-small1-bold text-white"
        >
          로그인
        </Button>
        <Button variant="ghost" className="p-[4px]">
          <MenuIcon />
        </Button>
      </div>
    </header>
  )
}
