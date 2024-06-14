'use client'

import Image from 'next/image'

import CategoryList from './components/category-list'
import { CommonLayout } from '@/components/common-layout'
import { useSession } from 'next-auth/react'
import CategoryAccordionList from './components/category-accordion-list'

export default function Repository() {
  const { data: session } = useSession()

  return (
    <CommonLayout
      title={{
        label: `${session?.user.dto.name}님의 노트 창고`,
        icon: <Image src="/icons/book.svg" alt="" width={32} height={32} />,
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
      {/* TODO: height calc 계산보다 더 나은 방식(상대적인 height 계산) 필요 */}
      <main className="mt-[28px] flex h-[calc(100vh-160px)] flex-col lg:mt-[40px]">
        <CategoryList className="px-[20px]" />

        <div className="mt-[40px] w-full flex-1 overflow-hidden rounded-t-[20px] bg-white p-[20px] lg:hidden">
          <h3 className="mb-[20px] text-h4-bold text-gray-09">노트</h3>
          <CategoryAccordionList className="h-[90%] overflow-auto" />
        </div>
      </main>
    </CommonLayout>
  )
}
