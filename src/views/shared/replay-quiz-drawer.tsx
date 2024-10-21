'use client'

import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'

const SAVED_QUIZ_COUNT = 34

// ReplayQuizDrawer 컴포넌트
const ReplayQuizDrawer = ({ triggerComponent }: { triggerComponent: JSX.Element }) => {
  const [quizType, setQuizType] = useState('random')
  const [quizCount, setQuizCount] = useState(10)

  useEffect(() => {
    setQuizCount(SAVED_QUIZ_COUNT) // default : 저장된 문제 수
  }, [])

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

      <DrawerContent className="rounded-t-[16px]">
        <div className="my-[24px] flex h-fit flex-col items-center px-[16px]">
          <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
            원하는 유형과 문제 수를 선택해주세요
          </DrawerTitle>

          {/* 문제 유형 선택 */}
          <div className="mb-[28px] flex gap-[8px]">
            <button
              onClick={() => setQuizType('random')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border px-[20px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:pointer-events-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'random' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="random-quiz-icon" className="mb-[7.05px] w-[76px]" />
              <Text typography="subtitle2-bold" className="mb-[4px]">
                랜덤
              </Text>
              <Text typography="text2-medium" className="flex text-start text-text-sub">
                모든 유형 <br /> 랜덤으로 섞기
              </Text>
            </button>

            <button
              onClick={() => setQuizType('multiple')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'multiple' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="multiple-quiz-icon" className="mb-[7.05px] w-[70px]" />
              <Text typography="subtitle2-bold" className="mb-[4px] pl-[9px]">
                객관식
              </Text>
              <Text typography="text2-medium" className="flex pl-[9px] text-start text-text-sub">
                4개 선택지 중 <br /> 정답 고르기
              </Text>
            </button>

            <button
              onClick={() => setQuizType('ox')}
              className={cn(
                'flex h-[150px] w-[110px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none disabled:grayscale disabled:bg-background-disabled disabled:text-text-disabled',
                quizType === 'ox' && 'bg-background-container-03 border-border-focused'
              )}
            >
              <Icon name="o-x-quiz-icon" className="mb-[10px] w-[81px] pl-[14px]" />
              <Text typography="subtitle2-bold" className="mb-[4px] pl-[20px]">
                O/X
              </Text>
              <Text typography="text2-medium" className="flex pl-[20px] text-start text-text-sub">
                참과 거짓 <br /> 판단하기
              </Text>
            </button>
          </div>

          <div className="flex-center h-fit w-full flex-col border-t pb-[66px] pt-[26px] text-text-sub">
            <Text typography="text1-medium">다시 풀 문제 수</Text>
            <Text typography="title1" className="mb-[28px] mt-[8px] text-text-accent">
              {quizCount} 문제
            </Text>

            {/* 문제 개수 슬라이더 */}
            <Slider
              min={5}
              max={SAVED_QUIZ_COUNT} // 저장된 문제 수
              step={1}
              defaultValue={[SAVED_QUIZ_COUNT]} // 저장된 문제 수
              onValueChange={(value) => setQuizCount(value[0])}
            />

            <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
              <Text>5 문제</Text>
              <Text>{SAVED_QUIZ_COUNT} 문제</Text>
            </div>
          </div>

          <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
            <Button
              variant={'largeRound'}
              colors={'primary'}
              className="mt-[5px] w-[335px] max-w-full text-button1 text-text-primary-inverse"
            >
              퀴즈 시작하기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ReplayQuizDrawer
