import { mockCategories, mockUserData } from './mock-data'
import Image from 'next/image'
import { CategoryAccordion } from '@/components/category-accordion'
import CategoryList from './components/category-list'
import { CommonLayout } from '@/components/common-layout'

export default function Repository() {
  return (
    <CommonLayout
      title={{
        label: `${mockUserData.nickname}님의 노트 창고`,
        icon: <Image src="/icons/book.svg" alt="" width={32} height={32} />,
      }}
      mobileOptions={{
        hasSearch: true,
        hasNotifications: true,
      }}
    >
      <main className="mt-[28px] flex flex-col gap-[40px] lg:mt-[40px]">
        <CategoryList className="px-[20px]" />

        <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
          <h3 className="text-h4-bold text-gray-09 mb-[32px]">노트</h3>
          <CategoryAccordion categories={mockCategories} />
        </div>
      </main>
    </CommonLayout>
  )
}
