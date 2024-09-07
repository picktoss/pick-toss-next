import { CategoryTagType } from '@/actions/fetchers/category/get-categories'
import { CommonLayout } from '@/shared/components/common-layout'
import CategoryTag from '../repository/components/category-tag'
import DocumentList from './components/document-list'
import AddNoteFloatingButton from '@/shared/components/add-note-floating-button'

interface Props {
  categoryId: string
  emoji: string
  name: string
  tag: CategoryTagType
}

const Category = ({ categoryId, emoji, name, tag }: Props) => {
  return (
    <CommonLayout
      mobileOptions={{
        hasSearch: true,
        hasBackButton: true,
      }}
    >
      <div className="mb-[34px] flex items-center gap-[8px] px-[20px]">
        <h2 className="text-h3-bold text-gray-08">
          {emoji || '📁'} {name}
        </h2>
        <CategoryTag tag={tag} />
      </div>
      <DocumentList className="px-[20px] pb-[80px]" categoryId={Number(categoryId)} />
      <AddNoteFloatingButton categoryId={Number(categoryId)} />
    </CommonLayout>
  )
}

export default Category
