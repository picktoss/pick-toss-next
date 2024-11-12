import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import CategoryTag from '@/shared/components/custom/category-tag'
import SetInterestedCategoryDrawer from '@/features/category/components/set-interested-category-drawer'

const CategoryDrawer = ({ interestedCategory }: { interestedCategory?: string }) => {
  return (
    <SetInterestedCategoryDrawer
      triggerComponent={
        <button className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              관심분야
            </Text>

            {interestedCategory ? (
              <CategoryTag title={interestedCategory} className="text-text-secondary" />
            ) : (
              <Text typography="subtitle2-medium" className="text-text-caption">
                관심분야를 등록해주세요
              </Text>
            )}
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      }
    />
  )
}

export default CategoryDrawer
