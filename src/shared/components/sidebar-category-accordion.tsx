'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'

import Image from 'next/image'
import Link from 'next/link'
import icons from '@/constants/icons'
import { ChevronRight } from 'lucide-react'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import BarLoader from 'react-spinners/BarLoader'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../lib/tanstack-query/query-keys'

export const SidebarCategoryAccordion = () => {
  const segments = useSelectedLayoutSegments()

  const [accordionValue, setAccordionValue] = useState<string[]>([])
  const prevCategoryId = useRef<number | null>(null)

  const { data, isPending } = useQuery({
    ...queries.category.list(),
  })

  const currentCategoryId = useMemo(() => {
    if (segments[0] === 'repository' && segments.length === 2) {
      return Number(segments[1])
    }

    if (segments[0] === 'document' && segments.length === 2) {
      const documentId = Number(segments[1])
      const category = data?.categories.find((category) =>
        category.documents.some((document) => document.id === documentId)
      )

      return category?.id
    }
  }, [data?.categories, segments])

  const currentDocumentId = useMemo(() => {
    if (segments[0] === 'document' && segments.length === 2) {
      return Number(segments[1])
    }
  }, [segments])

  useEffect(() => {
    if (currentCategoryId) {
      setAccordionValue((prevValue) => [...prevValue, currentCategoryId.toString()])
      prevCategoryId.current = currentCategoryId
    } else {
      setAccordionValue((prevValue) =>
        prevValue.filter((categoryId) => categoryId !== prevCategoryId.current?.toString())
      )
    }
  }, [currentCategoryId])

  if (isPending) {
    return (
      <div className="flex justify-center">
        <BarLoader />
      </div>
    )
  }

  return (
    <Accordion type="multiple" value={accordionValue} onValueChange={setAccordionValue}>
      {data?.categories.map((category) => (
        <AccordionItem key={category.id} value={category.id.toString()}>
          <AccordionTrigger
            className="overflow-hidden rounded-[8px] py-0 pl-[42px] text-body2-medium text-gray-08 hover:bg-gray-01 [&[data-state=open]_svg]:rotate-90"
            showChevron={false}
          >
            <div className="group">
              <ChevronRight className="mr-[6px] hidden size-4 shrink-0 transition-transform duration-200 group-hover:block" />
              <span className="mr-[8px] group-hover:hidden">{category.emoji || '📁'}</span>
            </div>
            <Link
              href={`/repository/${category.id}`}
              className="flex-1 truncate py-[7px] text-start"
            >
              {category.name}
            </Link>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-[2px]">
              {category.documents.map((document) => (
                <Link
                  key={document.id}
                  href={`/document/${document.id}`}
                  className={cn(
                    'flex items-start gap-[8px] rounded-[8px] py-[7px] pl-[57px] text-gray-07 hover:bg-gray-01',
                    currentDocumentId === document.id && 'bg-gray-01'
                  )}
                >
                  <Image src={icons.file} width={16} height={16} alt="" />
                  <div className="truncate text-body2-medium">{document.name}</div>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
