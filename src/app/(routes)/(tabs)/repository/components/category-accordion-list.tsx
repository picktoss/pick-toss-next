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
import { HTMLAttributes } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface CategoryAccordionProps extends HTMLAttributes<HTMLDivElement> {}

export default function CategoryAccordionList(props: CategoryAccordionProps) {
  const { data } = useQuery({
    ...queries.category.list(),
  })

  if (!data?.categories) return null
  const { categories } = data

  return (
    <div {...props}>
      {categories.length !== 0 && (
        <Accordion type="multiple">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id + ''}>
              <AccordionTrigger
                className="w-full border-b border-gray-02 py-[12px] !text-body1-bold text-gray-08 [&[data-state=open]>svg]:rotate-90"
                showChevron={false}
              >
                <span className="mr-[8px]">{category.emoji || '📁'}</span>
                <span className="mr-[20px] truncate">{category.name}</span>
                <ChevronRight
                  strokeWidth={3}
                  className="size-4 shrink-0 text-gray-06 transition-transform duration-200"
                />
              </AccordionTrigger>
              {category.documents.map((document) => (
                <AccordionContent
                  key={document.id}
                  className="flex h-[51px] items-center border-b border-gray-02 p-0 text-body1-medium"
                >
                  <Link
                    href={`/document/${document.id}`}
                    className="flex w-full items-start gap-[8px] pl-[15px] text-gray-07"
                  >
                    <Image src={icons.file} width={16} height={16} alt="" />
                    <div className="truncate">{document.name}</div>
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
