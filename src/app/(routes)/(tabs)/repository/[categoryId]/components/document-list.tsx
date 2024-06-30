'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ButtonHTMLAttributes, HTMLAttributes, useState } from 'react'
import DocumentItem from './document-item'
import icons from '@/constants/icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useGetDocumentsForCategoryQuery } from '@/apis/fetchers/document/get-documents-for-category/query'

const SORT_OPTION_TYPE = ['createdAt', 'name', 'updatedAt'] as const

export type SortOption = (typeof SORT_OPTION_TYPE)[number]

const sortOptionLabel = {
  createdAt: '업로드한 날짜',
  name: '이름',
  updatedAt: '마지막으로 수정한 시간',
}
interface Props extends HTMLAttributes<HTMLDivElement> {
  categoryId: number
}

export default function DocumentList({ categoryId, className }: Props) {
  const [sortOption, setSortOption] = useState<SortOption>('createdAt')

  const {
    data: documents,
    isError,
    isPending,
  } = useGetDocumentsForCategoryQuery({
    categoryId,
    sortOption,
  })

  const handleSortOptionClick = (option: SortOption) => {
    setSortOption(option)
  }

  if (isPending) return <div>loading</div>

  if (isError) return <div>error</div>

  return (
    <div className={className}>
      {documents.length === 0 ? (
        <NoContent categoryId={categoryId} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="text-body1-medium text-gray-08">
              노트 <span className="font-bold text-orange-06">{documents.length}</span>개
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2 text-body2-medium text-gray-07">
                  {sortOptionLabel[sortOption]}{' '}
                  <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SORT_OPTION_TYPE.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => handleSortOptionClick(type)}
                    className="text-body2-medium text-gray-07"
                  >
                    {sortOptionLabel[type]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-[20px] flex flex-col gap-2 lg:mt-[16px]">
            {documents.map((document) => (
              <DocumentItem key={document.id} sortOption={sortOption} {...document} />
            ))}
            <AddNoteButton className="hidden lg:flex" categoryId={categoryId} />
          </div>
        </>
      )}
    </div>
  )
}

function NoContent({ categoryId }: { categoryId: number }) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <Image className="mb-[20px]" src={icons.noteEmpty} alt="" />
      <h3 className="mb-[8px] text-h3-bold text-gray-08">아직 노트가 없어요</h3>
      <p className="mb-[30px] text-body2-medium text-gray-07">내가 공부하는 노트를 추가해보세요</p>
      <AddNoteButton categoryId={categoryId} />
    </div>
  )
}

interface AddNoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  categoryId: number
}

function AddNoteButton({ className, categoryId }: AddNoteButtonProps) {
  return (
    <Link
      href={`/create?default=${categoryId}`}
      className={cn(
        'flex h-[78px] w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed !text-body2-bold text-gray-08',
        className
      )}
    >
      노트 추가하기
      <div className="rounded-full bg-gray-02 p-2">
        <Image src="/icons/plus.svg" alt="" width={18} height={18} />
      </div>
    </Link>
  )
}
