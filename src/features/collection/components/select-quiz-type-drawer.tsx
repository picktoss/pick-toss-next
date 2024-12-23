'use client'

import QS from 'query-string'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import Label from '@/shared/components/ui/label'
import { useState } from 'react'

interface Props {
  quizType?: Quiz.Type
}

const SelectQuizTypeDrawer = ({ quizType }: Props) => {
  const [innerQuizType, setInnerQuizType] = useState<Quiz.Type | 'all'>('all')
  const searchParamsString = useSearchParams().toString()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'h-[32px] flex items-center gap-[4px] rounded-full border bg-button-fill-outlined pl-[14px] pr-[10px] text-button-label-tertiary',
            quizType != null && 'border-button-fill-primary text-text-accent'
          )}
        >
          <Text typography="button4">
            {quizType == null ? '유형' : quizType === 'MULTIPLE_CHOICE' ? '객관식' : 'O/X'}
          </Text>
          <Icon
            name="chevron-down"
            className={cn('size-[12px] text-icon-tertiary', quizType != null && 'text-text-accent')}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto h-[60vh] max-w-mobile px-4">
        <DrawerHeader className="px-0 py-5">
          <DrawerTitle>
            <Text typography="title3">유형</Text>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-px bg-border-divider" />

        <div className="mt-[4px]">
          <RadioGroup value={innerQuizType}>
            <div className="flex items-center gap-3 py-[10px]">
              <RadioGroupItem id="all" value="all" onClick={() => setInnerQuizType('all')} />
              <Label htmlFor="all" className="cursor-pointer">
                <Text typography="subtitle2-medium" color="primary">
                  전체
                </Text>
              </Label>
            </div>
            <div className="flex items-center gap-3 py-[10px]">
              <RadioGroupItem
                id="MULTIPLE_CHOICE"
                value="MULTIPLE_CHOICE"
                onClick={() => setInnerQuizType('MULTIPLE_CHOICE')}
              />
              <Label htmlFor="MULTIPLE_CHOICE" className="cursor-pointer">
                <Text typography="subtitle2-medium" color="primary">
                  객관식
                </Text>
              </Label>
            </div>
            <div className="flex items-center gap-3 py-[10px]">
              <RadioGroupItem
                id="MIX_UP"
                value="MIX_UP"
                onClick={() => setInnerQuizType('MIX_UP')}
              />
              <Label htmlFor="MIX_UP" className="cursor-pointer">
                <Text typography="subtitle2-medium" color="primary">
                  O/X
                </Text>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <FixedBottom className="flex gap-1.5">
          <DrawerClose className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                const newQueryString = QS.stringify({
                  ...QS.parse(searchParamsString),
                  'quiz-type': innerQuizType === 'all' ? undefined : innerQuizType,
                })
                router.replace(`${pathname}?${newQueryString}`)
              }}
            >
              적용하기
            </Button>
          </DrawerClose>
        </FixedBottom>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectQuizTypeDrawer
