import { mockCategories } from './mock-data'
import Image from 'next/image'
import { CategoryAccordion } from '@/components/category-accordion'
import CategoryList from './components/category-list'
import { CommonLayout } from '@/components/common-layout'
import { auth } from '@/app/api/auth/[...nextauth]/auth'

export default async function Repository() {
  const session = await auth()

  return (
    <CommonLayout
      title={{
        label: `${session?.user.dto.name}님의 노트 창고`,
        icon: <Image src="/icons/book.svg" alt="" width={24} height={24} />,
      }}
      mobileOptions={{
        hasSearch: true,
        hasNotifications: true,
        mobileTitle: {
          label: '노트 창고',
          icon: <Image src="/icons/book.svg" alt="" width={24} height={24} />,
        },
      }}
    >
      <main className="mt-[28px] flex flex-col gap-[40px] lg:mt-[40px]">
        <CategoryList className="px-[20px]" />

        <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
          <h3 className="mb-[32px] text-h4-bold text-gray-09">노트</h3>
          <CategoryAccordion categories={mockCategories} />
        </div>
      </main>
    </CommonLayout>
  )
}
