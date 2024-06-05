import { mockCategories, mockUserData } from './mock-data'
import Image from 'next/image'
import { CategoryAccordion } from '@/components/category-accordion'
import CategoryList from './components/category-list'

export default function Repository() {
  return (
    <div className="flex min-h-[calc(100vh-84px)] flex-col justify-between gap-[48px]">
      <div>
        <h2 className="mb-[40px] flex items-center gap-2 text-h2-medium text-gray-08">
          <div>
            <span className="font-bold">{mockUserData.nickname}</span> 님의 노트 창고
          </div>
          <Image src="/icons/book.svg" alt="" width={32} height={32} />
        </h2>
        <CategoryList />
      </div>
      <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
        <h3 className="mb-[32px] text-h4-bold text-gray-09">노트</h3>
        <CategoryAccordion categories={mockCategories} />
      </div>
    </div>
  )
}
