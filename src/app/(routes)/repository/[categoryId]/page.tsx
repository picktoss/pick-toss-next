'use client'

import { useState } from 'react'
import CategoryTag from '../components/category-tag'
import { studyCategoryData } from '../mock-data'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'

interface Props {
  params: {
    categoryId: string
  }
}

// 임시 category fetch 함수
const fetchCategory = (categoryId: number) => {
  const targetData = studyCategoryData.find((data) => data.id === categoryId)

  if (targetData === undefined) {
    throw new Error('category id가 잘못 되었습니다')
  }

  return targetData
}

const SORT_TYPE = ['업로드한 날짜', '이름', '마지막으로 열어본 시간'] as const

export default function Category({ params: { categoryId } }: Props) {
  const category = fetchCategory(Number(categoryId))
  const { emoji, name, tag, documents } = category

  const [sortType, setSortType] = useState<(typeof SORT_TYPE)[number]>('업로드한 날짜')

  return (
    <div>
      <CategoryTag tag={tag} className="mb-3 inline-block" />
      <h2 className="mb-16 text-[32px] font-bold text-gray-08">
        {emoji} {name}
      </h2>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-gray-08">
          문서 <span className="font-bold text-orange-06">{documents.length}</span>개
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2">
              {sortType} <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="text-gray-07">
              {SORT_TYPE.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setSortType(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        {documents.map((document) => (
          <div
            key={document.id}
            className="flex h-[78px] items-center justify-between rounded-lg border bg-white px-[27px] py-[15px]"
          >
            <div className="flex items-center">
              <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-gray-01">
                <Image src="/icons/file.svg" alt="" width={24} height={24} />
              </div>
              <div className="text-gray-09">{document.name}</div>
            </div>
            <div className="flex items-center gap-12">
              {/* TODO: 서버 API 데이터에 따라 구현 달라질 예정 */}
              <div className="text-sm font-normal text-gray-06">
                {document.quizCreation === 'PREPARING' ? (
                  <div className="px-[34.5px]">문서 요약 중</div>
                ) : (
                  <div className="flex items-center gap-[6px]">
                    <span>퀴즈 생성</span>
                    <span className="text-base font-bold text-orange-05">
                      {document.quizCreation}
                    </span>
                    <Switch checked={document.quizCreation === 'ON'} />
                  </div>
                )}
              </div>
              <div className="text-sm font-normal text-gray-06">{document.createdAt}</div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                    <Image src="/icons/kebab.svg" alt="" width={3} height={15} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>temp1</DropdownMenuItem>
                  <DropdownMenuItem>temp2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
