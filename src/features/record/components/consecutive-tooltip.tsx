import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'

const ConsecutiveTooltip = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <Icon name="info" className="size-[16px]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[277px] bg-background-base-01">
        <div className="p-[16px] pr-[22px]">
          <Text typography="text2-medium" color="secondary" className="flex gap-[3px]">
            <Text typography="text1-bold">·</Text>밤 12시 전에 한 번 이상 퀴즈 세트(오늘의 퀴즈,
            퀴즈노트, 컬렉션)를 풀면 연속일이 유지돼요.
          </Text>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ConsecutiveTooltip
