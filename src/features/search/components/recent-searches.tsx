import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'

const RecentSearches = () => {
  return (
    <div className="flex flex-col border-t border-border-divider px-[16px] py-[20px]">
      <div className="mb-[24px] flex items-center justify-between text-text1-medium">
        <Text typography="text1-bold" className="text-text-secondary">
          최근 검색어
        </Text>
        <button className="text-text-caption">전체삭제</button>
      </div>

      <div className="flex flex-col gap-[20px]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <Text typography="text1-medium">최근 검색어 {idx}</Text>
            <button className="text-icon-tertiary">
              <Icon name="cancel" className="size-[16px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches
