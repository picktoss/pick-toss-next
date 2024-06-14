'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import Image from 'next/image'
import Link from 'next/link'
import icons from '@/constants/icons'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { getCategories } from '@/apis/fetchers/category/get-categories'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

interface CategoryAccordionProps {
  hasBorder?: boolean
  showChevron?: boolean
  className?: HTMLAttributes<HTMLDivElement>['className']
  triggerStyles?: HTMLAttributes<HTMLElement>['className']
  contentStyles?: HTMLAttributes<HTMLElement>['className']
}

export const CategoryAccordion = ({
  hasBorder = true,
  showChevron = true,
  className,
  triggerStyles,
  contentStyles,
}: CategoryAccordionProps) => {
  const { data: session } = useSession()
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories({ accessToken: session?.user.accessToken || '' })
      return res.categories
    },
  })

  if (isPending) return <div>loading</div>

  if (isError) return <div>error</div>

  return (
    <div className={className}>
      <Accordion type="multiple">
        {categories?.map((category) => (
          <AccordionItem key={category.id} value={category.id + ''}>
            <AccordionTrigger
              className={cn(
                'py-[12px] !text-body1-bold text-gray-08',
                hasBorder && 'border-b border-gray-02',
                triggerStyles
              )}
              showChevron={showChevron}
            >
              <span className="mr-[8px]">{category.emoji}</span>
              <span className="mr-[20px]">{category.name}</span>
            </AccordionTrigger>
            {category.documents.map((document) => (
              <AccordionContent
                key={document.id}
                className={cn(
                  'flex h-[51px] items-center p-0 !text-body1-medium',
                  hasBorder && 'border-b border-gray-02',
                  contentStyles
                )}
              >
                <Link href="#" className="flex items-start gap-[8px] pl-[15px] text-gray-07">
                  <Image src={icons.file} width={16} height={16} alt="" />
                  <div>{document.name}</div>
                </Link>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
