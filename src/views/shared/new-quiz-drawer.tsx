'use client'

import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'
import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'
import MoreStarDialog from './more-star-dialog'

// NewQuizDrawer 컴포넌트
const NewQuizDrawer = ({ triggerComponent }: { triggerComponent: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [quizType, setQuizType] = useState('multiple')
  const [quizCount, setQuizCount] = useState(10) // 초기값 10
  const [isOpenMoreStar, setIsOpenMoreStar] = useState(false)

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

        <DrawerContent className="rounded-t-[16px]">
          <div className="my-[24px] flex h-fit flex-col items-center px-[16px]">
            <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
              원하는 유형과 문제 수를 선택해주세요
            </DrawerTitle>

            {/* 문제 유형 선택 */}
            <div className="mb-[28px] flex gap-[8px]">
              <button
                onClick={() => setQuizType('multiple')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  quizType === 'multiple' && 'bg-background-container-03 border-border-focused'
                )}
              >
                <Icon name="multiple-quiz-icon" className="mb-[7.05px] w-[70px]" />
                <Text typography="subtitle2-bold" className="mb-[4px] pl-[9px]">
                  객관식
                </Text>
                <Text typography="text2-medium" className="pl-[9px] text-text-sub">
                  4개 선택지 중 정답 고르기
                </Text>
              </button>

              <button
                onClick={() => setQuizType('ox')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  quizType === 'ox' && 'bg-background-container-03 border-border-focused'
                )}
              >
                <Icon name="o-x-quiz-icon" className="mb-[10px] w-[81px] pl-[14px]" />
                <Text typography="subtitle2-bold" className="mb-[4px] pl-[20px]">
                  O/X
                </Text>
                <Text typography="text2-medium" className="pl-[20px] text-text-sub">
                  참과 거짓 판단하기
                </Text>
              </button>
            </div>

            <div className="flex-center h-fit w-full flex-col border-t pb-[66px] pt-[26px] text-text-sub">
              <Text typography="text1-medium">만들 문제 수</Text>
              <Text typography="title1" className="mb-[28px] mt-[8px] text-text-accent">
                {quizCount} 문제
              </Text>

              {/* 문제 개수 슬라이더 */}
              <Slider
                min={5}
                max={40}
                step={1}
                defaultValue={[10]}
                onValueChange={(value) => setQuizCount(value[0])}
              />

              <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
                <Text>5 문제</Text>
                <Text>40 문제</Text>
              </div>
            </div>

            <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
              <Text typography="text2-medium">
                <span className="text-text-sub">현재 나의 별: </span>
                <span className="text-text-secondary">16개</span>
              </Text>

              <Button
                variant={'largeRound'}
                colors={'special'}
                className="mt-[5px] w-[335px] max-w-full text-button1 text-text-primary-inverse"
                onClick={() => setIsOpenMoreStar(true)} // 임시
              >
                퀴즈 시작하기
                <div className="flex-center size-[fit] rounded-full bg-[#D3DCE4]/[0.2] px-[8px]">
                  <Icon name="star" className="mr-[4px] size-[16px]" />
                  <Text typography="text1-medium">10</Text>
                </div>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* 이용자에게 별이 부족할 경우 아래 렌더링 */}
      <MoreStarDialog isOpen={isOpenMoreStar} setIsOpen={setIsOpenMoreStar} />
    </>
  )
}

export default NewQuizDrawer
