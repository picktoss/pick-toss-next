import Icon from '@/shared/components/custom/icon'

interface Props {
  selectedCategoryId: number | null
  selectCategoryId: (categoryId?: number) => void
}

const CategorySelect = ({}: Props) => {
  return (
    <button className="flex items-center gap-[8px]">
      <span>📚</span>
      <span>전공 공부</span>
      <Icon name="chevron-down" className="size-[16px] text-icon-tertiary" />
    </button>
  )
}

export default CategorySelect
