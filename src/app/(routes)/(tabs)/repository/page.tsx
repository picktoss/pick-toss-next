'use client'

import Image from 'next/image'

import CategoryList from './components/category-list'
import { CommonLayout } from '@/components/common-layout'
import { CategoryAccordion } from '@/components/category-accordion'
import { useSession } from 'next-auth/react'

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
      <main className="mt-[28px] flex flex-col gap-[40px] lg:mt-[40px]">
        <CategoryList className="px-[20px]" />

        <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
          <h3 className="mb-[32px] text-h4-bold text-gray-09">노트</h3>
          <CategoryAccordion />
        </div>
      </main>
    </CommonLayout>
  )
}
