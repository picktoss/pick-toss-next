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
import { ButtonHTMLAttributes, HTMLAttributes, useState } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Category } from '@/actions/fetchers/category/get-categories'
import icons from '@/constants/icons'
import { cn } from '@/shared/lib/utils'
import CreateCategoryDialog from '@/shared/components/create-category-dialog'
import Loading from '@/shared/components/loading'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useReorderCategoryMutation } from '@/actions/fetchers/category/reorder-category/mutation'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CategoryList({ className }: Props) {
  const queryClient = useQueryClient()
  const { data, isError, isPending } = useQuery({
    ...queries.category.list(),
  })
  const { mutate: reorderMutate } = useReorderCategoryMutation()

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

  if (isPending)
    return (
      <div className="relative min-h-[205.7px]">
        <Loading size="small" center />
      </div>
    )

  if (isError) return <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const draggedItem = data?.categories.find((category) => category.id === active.id) || null

    setDraggedItem(draggedItem)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = data?.categories.findIndex((category) => category.id === active.id)
      const newIndex = data?.categories.findIndex((category) => category.id === over?.id)

      reorderMutate({
        categoryId: Number(active.id),
        preDragCategoryOrder: oldIndex + 1,
        afterDragCategoryOrder: newIndex + 1,
      })

      queryClient.setQueryData(queries.category.list().queryKey, (prevCategories: Category[]) =>
        arrayMove(prevCategories, oldIndex, newIndex)
      )
    }

    setDraggedItem(null)
  }

  return (
    <div className={className}>
      {data?.categories.length === 0 ? (
        <NoCategory />
      ) : (
        <>
          <div className="mb-[16px] flex items-center justify-between">
            <p className="text-body2-medium text-gray-08 lg:text-body1-medium">
              폴더 <span className="font-bold text-orange-06">{data?.categories.length}</span>개
            </p>
            <CreateCategoryDialog
              trigger={
                <button className="flex items-center gap-[8px] text-body2-medium text-gray-08 lg:hidden lg:text-body1-medium">
                  폴더 추가
                  <div className="flex size-[24px] items-center justify-center rounded-full bg-gray-02">
                    <Image src={icons.plus} alt="" width={11} height={11} />
                  </div>
                </button>
              }
            />
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={data?.categories}>
              <div className="m-[-20px] flex gap-3 overflow-x-scroll p-[20px] scrollbar-hide lg:grid lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:gap-4">
                {data?.categories.map((studyCategory) => (
                  <CategoryItem key={studyCategory.id} {...studyCategory} />
                ))}
                <AddCategoryButton className="hidden lg:flex" />
              </div>
            </SortableContext>
            <DragOverlay>{draggedItem && <CategoryItem {...draggedItem} />}</DragOverlay>
          </DndContext>
        </>
      )}
    </div>
  )
}

function NoCategory() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <Image className="mb-[20px]" src={icons.folderEmpty} alt="" />
      <h3 className="mb-[8px] text-h3-bold text-gray-08">아직 폴더가 없어요</h3>
      <p className="mb-[30px] text-body2-medium text-gray-07">폴더를 만들고 노트를 추가해보세요</p>
      <AddCategoryButton />
    </div>
  )
}

interface AddCategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function AddCategoryButton({ className }: AddCategoryButtonProps) {
  return (
    <CreateCategoryDialog
      trigger={
        <button
          className={cn(
            'flex min-h-[120px] min-w-[240px] items-center justify-center gap-2 rounded-xl border-2 border-dashed !text-body2-bold text-gray-08',
            className
          )}
        >
          폴더 추가하기
          <div className="rounded-full bg-gray-02 p-2">
            <Image src="/icons/plus.svg" alt="" width={18} height={18} />
          </div>
        </button>
      }
    />
  )
}
