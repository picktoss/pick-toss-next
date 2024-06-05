'use client'

import Image from 'next/image'
import CategoryItem from './category-item'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { HTMLAttributes, useState } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Category, getCategories } from '@/apis/fetchers/category/get-categories'
import { useSession } from 'next-auth/react'
import CreateCategoryModal from './create-category-modal'
import icons from '@/constants/icons'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CategoryList({ className }: Props) {
  const [draggedItem, setDraggedItem] = useState<Category | null>(null)

  const { data: session } = useSession()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({ accessToken: session?.user.accessToken || '' }).then((res) => res.categories),
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

  if (categories === undefined) return <div>loading</div>

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const draggedItem = categories.find((category) => category.id === active.id) || null

    setDraggedItem(draggedItem)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((category) => category.id === active.id)
      const newIndex = categories.findIndex((category) => category.id === over?.id)

      queryClient.setQueryData(['categories'], (prevCategories: Category[]) =>
        arrayMove(prevCategories, oldIndex, newIndex)
      )
    }

    setDraggedItem(null)
  }

  return (
    <div className={className}>
      <div className="bg-gray-02 mb-[24px] flex items-center gap-4 rounded-full px-8 py-3">
        <Image src={icons.search} alt="search" width={16} height={16} />
        <input
          className="w-full bg-transparent focus:outline-none"
          placeholder="노트명, 노트 내용 검색"
        />
      </div>
      <p className="text-body1-medium text-gray-08 mb-[16px]">
        공부 폴더 <span className="text-orange-06 font-bold">{categories.length}</span>개
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={categories}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {categories.map((studyCategory) => (
              <CategoryItem key={studyCategory.id} {...studyCategory} />
            ))}
            <CreateCategoryModal
              trigger={
                <button className="text-body2-bold text-gray-08 flex min-h-[120px] items-center justify-center gap-2 rounded-xl border-2 border-dashed">
                  폴더 추가하기
                  <div className="bg-gray-02 rounded-full p-2">
                    <Image src="/icons/plus.svg" alt="" width={18} height={18} />
                  </div>
                </button>
              }
            />
          </div>
        </SortableContext>
        <DragOverlay>{draggedItem && <CategoryItem {...draggedItem} />}</DragOverlay>
      </DndContext>
    </div>
  )
}
