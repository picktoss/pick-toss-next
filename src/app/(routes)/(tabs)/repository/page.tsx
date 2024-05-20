import { mockCategories, mockUserData } from './mock-data'
import Image from 'next/image'
import { CategoryAccordion } from '@/components/category-accordion'
import CategoryList from './components/category-list'
import icons from '@/constants/icons'

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
        <div className="mb-[24px] flex items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
          <Image src={icons.search} alt="search" width={16} height={16} />
          <input
            className="w-full bg-transparent focus:outline-none"
            placeholder="노트명, 노트 내용 검색"
          />
        </div>
        <p className="mb-[16px] text-body1-medium text-gray-08">
          공부 폴더 <span className="font-bold text-orange-06">{mockCategories.length}</span>개
        </p>
        <CategoryList />
      </div>
      <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
        <h3 className="mb-[32px] text-h4-bold text-gray-09">노트</h3>
        <CategoryAccordion categories={mockCategories} />
      </div>
    </div>
  )
}
