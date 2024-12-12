import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

const NoResults = ({ className }: { className?: HTMLElement['className'] }) => {
  return (
    <div className={cn('flex-center flex-col', className)}>
      <Text typography="subtitle1-bold">검색결과가 없습니다</Text>
      <Text typography="text1-medium" className="text-text-sub">
        다른 키워드를 입력해보세요
      </Text>
    </div>
  )
}

export default NoResults
