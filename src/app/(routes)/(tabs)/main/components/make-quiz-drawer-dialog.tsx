'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CategoryDTO } from '@/apis/types/dto/category.dto'

interface Props {
  categories: CategoryDTO[]
  trigger: ReactNode
  quizType: 'multiple' | 'mixUp' | 'blank'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MakeQuizDrawerDialog({ trigger, categories, quizType }: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-w-[560px] pb-[31px] pt-[26px]">
          <MakeQuizDialogContent categories={categories} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="min-h-[510px]">
        <MakeQuizDrawerContent categories={categories} />
      </DrawerContent>
    </Drawer>
  )
}

function MakeQuizDialogContent({ categories }: { categories: CategoryDTO[] }) {
  console.error(categories)
  return <div>OK</div>
}

function MakeQuizDrawerContent({ categories }: { categories: CategoryDTO[] }) {
  return (
    <div className="flex flex-1 flex-col justify-between pb-[22px] pt-[40px]">
      <div>
        <div className="flex gap-[21px] px-[24px] text-h4-bold text-gray-09">
          <div role="button" className={cn(true ? 'text-gray-09' : 'text-gray-06')}>
            폴더
          </div>
          <div role="button" className={cn(false ? 'text-gray-09' : 'text-gray-06')}>
            노트
          </div>
        </div>

        <div className="mt-[24px]">
          <div className="flex h-[38px] items-end gap-[16px] px-[27px] py-[9px]">
            <Checkbox id="allFolder" className="size-[20px]" />
            <label htmlFor="allFolder" className="text-body2-regular text-gray-08">
              전체 <span className="text-orange-06">{categories.length}</span>개
            </label>
          </div>

          <div className="mb-[7px] px-[19px]">
            <div className="h-px w-full rounded-full bg-gray-01" />
          </div>

          <div className="flex flex-col gap-[3px]">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex h-[38px] items-end gap-[16px] px-[27px] py-[9px]"
              >
                <Checkbox id={String(category.id)} className="size-[20px]" />
                <label htmlFor={String(category.id)} className="text-body2-regular text-gray-08">
                  {category.emoji} {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[20px]">
        {true ? (
          <Button className="w-full">노트 선택</Button>
        ) : (
          <div className="flex w-full gap-[6px]">
            <Button className="flex-[100]" variant="secondary">
              초기화
            </Button>
            <Button className="flex-[230]">완료</Button>
          </div>
        )}
      </div>
    </div>
  )
}
