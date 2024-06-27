import CategoryTag from '../components/category-tag'
import DocumentList from './components/document-list'
import { CommonLayout } from '@/components/common-layout'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { getCategory } from '@/apis/fetchers/category/get-category/fetcher'

interface Props {
  params: {
    categoryId: string
  }
}

export default async function Category({ params: { categoryId } }: Props) {
  const session = await auth()
  const category = await getCategory({
    accessToken: session?.user.accessToken || '',
    categoryId: Number(categoryId),
  })

  const { emoji, name, tag } = category

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
      <DocumentList className="px-[20px]" categoryId={Number(categoryId)} />
    </CommonLayout>
  )
}
