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
import { useState } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Category, getCategories } from '@/apis/fetchers/category/get-categories'
import { useSession } from 'next-auth/react'
import CreateCategoryModal from './create-category-modal'

export default function CategoryList() {
  const [draggedItem, setDraggedItem] = useState<Category | null>(null)

  const { data: session } = useSession()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({ accessToken: session?.user.accessToken || '' }).then((res) => res.categories),
    enabled: !!session,
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
    <>
      <p className="mb-[16px] text-body1-medium text-gray-08">
        공부 폴더 <span className="font-bold text-orange-06">{categories.length}</span>개
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
                <button className="flex min-h-[120px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-body2-bold text-gray-08">
                  폴더 추가하기
                  <div className="rounded-full bg-gray-02 p-2">
                    <Image src="/icons/plus.svg" alt="" width={18} height={18} />
                  </div>
                </button>
              }
            />
          </div>
        </SortableContext>
        <DragOverlay>{draggedItem && <CategoryItem {...draggedItem} />}</DragOverlay>
      </DndContext>
    </>
  )
}
