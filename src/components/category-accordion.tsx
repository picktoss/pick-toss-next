import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Category } from '@/app/(routes)/(tabs)/repository/mock-data'
import Image from 'next/image'
import Link from 'next/link'
import icons from '@/constants/icons'

interface CategoryAccordionProps {
  categories: Category[]
}

export const CategoryAccordion = ({ categories }: CategoryAccordionProps) => {
  return (
    <Accordion type="multiple">
      {categories.map((category) => (
        <AccordionItem key={category.id} value={category.id + ''}>
          <AccordionTrigger className="border-b border-gray-02 py-[12px] !text-body1-bold text-gray-08">
            <span className="mr-[8px]">{category.emoji}</span>
            <span className="mr-[20px]">{category.name}</span>
          </AccordionTrigger>
          {category.documents.map((document) => (
            <AccordionContent
              key={document.id}
              className="flex h-[51px] items-center border-b border-gray-02 p-0"
            >
              <Link href="#" className="flex gap-[8px] pl-[20px] text-gray-07">
                <Image src={icons.file} width={16} height={16} alt="" />
                <div className="!text-body1-medium">{document.name}</div>
              </Link>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
