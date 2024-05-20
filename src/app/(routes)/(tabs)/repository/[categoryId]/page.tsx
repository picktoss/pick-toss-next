import Image from 'next/image'
import CategoryTag from '../components/category-tag'
import { mockCategories } from '../mock-data'
import DocumentList from './components/document-list'
import icons from '@/constants/icons'

interface Props {
  params: {
    categoryId: string
  }
}

// 임시 category fetch 함수
const fetchCategory = (categoryId: number) => {
  const targetData = mockCategories.find((data) => data.id === categoryId)

  if (targetData === undefined) {
    throw new Error('category id가 잘못 되었습니다')
  }

  return targetData
}

export default function Category({ params: { categoryId } }: Props) {
  const category = fetchCategory(Number(categoryId))
  const { emoji, name, tag, documents } = category

  return (
    <div>
      <div className="mb-[34px] flex items-center gap-[8px]">
        <h2 className="text-h3-bold text-gray-08">
          {emoji} {name}
        </h2>
        <CategoryTag tag={tag} />
      </div>
      <div className="mb-[40px] flex items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
        <Image src={icons.search} alt="search" width={16} height={16} />
        <input
          className="w-full bg-transparent focus:outline-none"
          placeholder="노트명, 노트 내용 검색"
        />
      </div>
      <DocumentList documents={documents} />
    </div>
  )
}
