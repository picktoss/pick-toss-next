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
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'
import { DEFAULT_COLLECTION_QUIZ_COUNT } from '../config'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  count: number
}

const SelectMinQuizCountDrawer = ({ count }: Props) => {
  const [innerCount, setInnerCount] = useState(count)
  const searchParamsString = useSearchParams().toString()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-[4px] rounded-full border bg-button-fill-outlined py-[7.5px] pl-[14px] pr-[10px]">
          <Text typography="button4" className="text-button-label-tertiary">
            문제 수
          </Text>
          <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto h-[60vh] max-w-mobile px-4">
        <DrawerHeader className="px-0 py-5">
          <DrawerTitle>
            <Text typography="title3">문제 수</Text>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-px bg-border-divider" />
        <div className="mt-[25px]">
          <Text typography="text1-medium" color="sub" className="text-center">
            최소 문제 수
          </Text>
          <Text typography="title1" color="accent" className="mt-2 text-center">
            {innerCount} 문제
          </Text>
          <div className="mt-8">
            <Slider
              value={[innerCount]}
              max={99}
              onValueChange={(value) => {
                if (value[0] == null || value[0] < DEFAULT_COLLECTION_QUIZ_COUNT) return

                setInnerCount(value[0])
              }}
            />
            <div className="mt-2.5 flex justify-between">
              <Text typography="text2-medium" color="sub">
                5 문제
              </Text>
              <Text typography="text2-medium" color="sub">
                99 문제
              </Text>
            </div>
          </div>
        </div>
        <FixedBottom className="flex gap-1.5">
          <Button
            className="w-[35%]"
            colors="tertiary"
            onClick={() => setInnerCount(DEFAULT_COLLECTION_QUIZ_COUNT)}
          >
            초기화
          </Button>
          <DrawerClose>
            <Button
              className="flex-1"
              onClick={() => {
                const newQueryString = QS.stringify({
                  ...QS.parse(searchParamsString),
                  'min-quiz-count': innerCount,
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

export default SelectMinQuizCountDrawer
