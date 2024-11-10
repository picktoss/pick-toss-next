import Icon from '@/shared/components/custom/icon'

interface Props {
  selectedDirectoryId: string | null
  selectDirectoryId: (categoryId?: string) => void
}

const DirectorySelect = ({}: Props) => {
  return (
    <button className="flex items-center gap-[8px]">
      <span>📚</span>
      <span>전공 공부</span>
      <Icon name="chevron-down" className="size-[16px] text-icon-tertiary" />
    </button>
  )
}

export default DirectorySelect
