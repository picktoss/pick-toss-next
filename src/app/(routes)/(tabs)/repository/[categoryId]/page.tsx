'use client'

import Image from 'next/image'
import CategoryTag from '../components/category-tag'
import DocumentList from './components/document-list'
import icons from '@/constants/icons'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/apis/fetchers/category/get-categories'
import { useSession } from 'next-auth/react'

interface Props {
  params: {
    categoryId: string
  }
}

// 임시 category fetch 함수
// const fetchCategory = (categoryId: number) => {
//   const targetData = mockCategories.find((data) => data.id === categoryId)

//   if (targetData === undefined) {
//     throw new Error('category id가 잘못 되었습니다')
//   }

//   return targetData
// }

export default function Category({ params: { categoryId } }: Props) {
  const { data: session } = useSession()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({ accessToken: session?.user.accessToken || '' }).then((res) => res.categories),
    enabled: !!session,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const category = categories?.find((category) => category.id === Number(categoryId))

  if (category === undefined) return <div>loading</div>

  const { emoji, name, tag } = category

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
      <DocumentList categoryId={Number(categoryId)} />
    </div>
  )
}
