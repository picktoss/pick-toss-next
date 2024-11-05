'use client'

import Icon from '@/shared/components/custom/icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import QuizCard from './quiz-card'
import { quizzes } from '../config'

const PickDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex-center mb-[14px] h-[44px] w-full gap-[4px] bg-background-container-03">
          <Text typography="text1-medium" className="flex-center gap-[16px] text-text-info">
            <Text className="flex items-center">
              <Icon name="pin" className="mr-[2.5px] size-[16px]" />
              내가 어려워했던 문제는?
            </Text>
            <Text className="font-bold">
              복습 <i>p</i>ick
            </Text>
          </Text>
          <Icon name="chevron-down" className="text-icon-tertiary" />
        </div>
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-[80dvh] max-w-mobile rounded-t-[20px]"
      >
        <div className="my-[24px] flex h-[calc(100%-70px)] flex-col items-center">
          <div className="flex size-full flex-col px-[9px]">
            <header className="flex flex-col px-[9px]">
              <DrawerTitle className="text-title3">
                복습 <i>p</i>ick
              </DrawerTitle>
              <Text typography="text1-medium" className="mt-[8px] text-text-sub">
                7일 이내에 틀린 적이 있거나, 시간이 오래 걸린 문제들이에요
              </Text>
            </header>

            <div className="mt-[24px] flex grow flex-col gap-[14px] overflow-y-auto px-[9px] pb-[14px]">
              {/* 카드 리스트 map */}
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} showAnswer header="오답" quiz={quiz} />
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PickDrawer
