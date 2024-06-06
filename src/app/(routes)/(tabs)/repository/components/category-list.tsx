'use client'

import Image from 'next/image'
import CategoryItem from './category-item'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  TouchSensor,
  MouseSensor,
} from '@dnd-kit/core'
import { HTMLAttributes, useState } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Category, getCategories } from '@/apis/fetchers/category/get-categories'
import { useSession } from 'next-auth/react'
import CreateCategoryModal from './create-category-modal'
import icons from '@/constants/icons'
import { reorderCategory } from '@/apis/fetchers/category/reorder-category'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CategoryList({ className }: Props) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const {
    data: categories,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({ accessToken: session?.user.accessToken || '' }).then((res) => res.categories),
    enabled: !!session,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const { mutate: mutateReorder } = useMutation({
    mutationFn: reorderCategory,
  })

  const [draggedItem, setDraggedItem] = useState<Category | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        tolerance: 10,
        delay: 300,
      },
    })
  )

  if (isPending) return <div>loading</div>

  if (isError) return <div>error</div>

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

      mutateReorder({
        categoryId: Number(active.id),
        preDragCategoryOrder: oldIndex + 1,
        afterDragCategoryOrder: newIndex + 1,
        accessToken: session?.user.accessToken || '',
      })

      queryClient.setQueryData(['categories'], (prevCategories: Category[]) =>
        arrayMove(prevCategories, oldIndex, newIndex)
      )
    }

    setDraggedItem(null)
  }

  return (
    <div className={className}>
      {categories.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <Image className="mb-[20px]" src={icons.folderEmpty} alt="" />
          <h3 className="mb-[8px] text-h3-bold text-gray-08">아직 폴더가 없어요</h3>
          <p className="mb-[30px] text-body2-medium text-gray-07">
            폴더를 만들고 노트를 추가해보세요
          </p>
          <AddCategoryButton />
        </div>
      ) : (
        <>
          <div className="mb-[24px] flex items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
            <Image src={icons.search} alt="search" width={16} height={16} />
            <input
              className="w-full bg-transparent focus:outline-none"
              placeholder="노트명, 노트 내용 검색"
            />
          </div>
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
                <AddCategoryButton />
              </div>
            </SortableContext>
            <DragOverlay>{draggedItem && <CategoryItem {...draggedItem} />}</DragOverlay>
          </DndContext>
        </>
      )}
    </div>
  )
}

function AddCategoryButton() {
  return (
    <CreateCategoryModal
      trigger={
        <button className="flex min-h-[120px] min-w-[240px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-body2-bold text-gray-08">
          폴더 추가하기
          <div className="rounded-full bg-gray-02 p-2">
            <Image src="/icons/plus.svg" alt="" width={18} height={18} />
          </div>
        </button>
      }
    />
  )
}
