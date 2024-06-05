'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HTMLAttributes, useState } from 'react'
import DocumentItem from './document-item'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import {
  Document,
  getDocumentsForCategory,
} from '@/apis/fetchers/document/get-documents-for-category'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import icons from '@/constants/icons'
import Link from 'next/link'

const SORT_OPTION_TYPE = ['createdAt', 'name', 'updatedAt'] as const

const sortOptionLabel = {
  createdAt: '업로드한 날짜',
  name: '이름',
  updatedAt: '마지막으로 수정한 시간',
}
interface Props extends HTMLAttributes<HTMLDivElement> {
  categoryId: number
}

export default function DocumentList({ categoryId, className }: Props) {
  const [sortOption, setSortOption] = useState<(typeof SORT_OPTION_TYPE)[number]>('createdAt')
  const [draggedItem, setDraggedItem] = useState<Document | null>(null)

  const { data: session } = useSession()
  const {
    data: documents,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['documents', categoryId, sortOption],
    queryFn: () =>
      getDocumentsForCategory({
        accessToken: session?.user.accessToken || '',
        categoryId,
        sortOption,
      }).then((res) => res.documents),
    enabled: !!session,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const queryClient = useQueryClient()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  if (isPending) return <div>loading</div>

  if (isError) return <div>error</div>

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const draggedItem = documents.find((document) => document.id === active.id) || null

    setDraggedItem(draggedItem)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = documents.findIndex((document) => document.id === active.id)
      const newIndex = documents.findIndex((document) => document.id === over?.id)

      queryClient.setQueryData(['documents', categoryId], (prevCategories: Document[]) =>
        arrayMove(prevCategories, oldIndex, newIndex)
      )
    }

    setDraggedItem(null)
  }

  return (
    <div className={className}>
      {documents.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <Image className="mb-[20px]" src={icons.noteEmpty} alt="" />
          <h3 className="mb-[8px] text-h3-bold text-gray-08">아직 노트가 없어요</h3>
          <p className="mb-[30px] text-body2-medium text-gray-07">
            내가 공부하는 노트를 추가해보세요
          </p>
          <AddNoteButton />
        </div>
      ) : (
        <>
          <div className="mb-[40px] flex items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
            <Image src={icons.search} alt="search" width={16} height={16} />
            <input
              className="w-full bg-transparent focus:outline-none"
              placeholder="노트명, 노트 내용 검색"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
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
                    onClick={() => setSortOption(type)}
                    className="text-body2-medium text-gray-07"
                  >
                    {sortOptionLabel[type]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={documents}>
              <div className="flex flex-col gap-2">
                {documents.map((document) => (
                  <DocumentItem key={document.id} {...document} />
                ))}
                <AddNoteButton />
              </div>
            </SortableContext>
            <DragOverlay>{draggedItem && <DocumentItem {...draggedItem} />}</DragOverlay>
          </DndContext>
        </>
      )}
    </div>
  )
}

function AddNoteButton() {
  return (
    <Link
      href="/create"
      className="flex h-[78px] w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed text-body2-bold text-gray-08"
    >
      노트 추가하기
      <div className="rounded-full bg-gray-02 p-2">
        <Image src="/icons/plus.svg" alt="" width={18} height={18} />
      </div>
    </Link>
  )
}
