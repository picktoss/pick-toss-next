'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Document } from '../../mock-data'
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

const SORT_TYPE = ['업로드한 날짜', '이름', '마지막으로 열어본 시간'] as const

interface Props {
  documents: Document[]
}

export default function DocumentList({ documents }: Props) {
  const [sortType, setSortType] = useState<(typeof SORT_TYPE)[number]>('업로드한 날짜')
  const [documentList, setDocumentList] = useState(documents)
  const [draggedItem, setDraggedItem] = useState<Document | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const draggedItem = documentList.find((document) => document.id === active.id) || null

    setDraggedItem(draggedItem)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setDocumentList((documentList) => {
        const oldIndex = documentList.findIndex((document) => document.id === active.id)
        const newIndex = documentList.findIndex((document) => document.id === over?.id)

        return arrayMove(documentList, oldIndex, newIndex)
      })
    }

    setDraggedItem(null)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-body1-medium text-gray-08">
          노트 <span className="font-bold text-orange-06">{documents.length}</span>개
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2 text-body2-medium text-gray-07">
              {sortType} <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_TYPE.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setSortType(type)}
                className="text-body2-medium text-gray-07"
              >
                {type}
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
        <SortableContext items={documentList}>
          <div className="flex flex-col gap-2">
            {documentList.map((document) => (
              <DocumentItem key={document.id} {...document} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>{draggedItem && <DocumentItem {...draggedItem} />}</DragOverlay>
      </DndContext>
    </>
  )
}
