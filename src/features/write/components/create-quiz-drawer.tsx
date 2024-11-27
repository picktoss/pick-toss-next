'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

interface Props {
  handleCreateDocument: (params: { quizType: Quiz.Type; star: number }) => void
}

const CreateQuizDrawer = ({ handleCreateDocument }: Props) => {
  const totalQuizCount = 40
  const [selectedQuizCount, setSelectedQuizCount] = useState(10)
  const [selectedQuizType, setSelectedQuizType] = useState<Quiz.Type>('MULTIPLE_CHOICE')

  const handleSliderChange = (value: number[]) => {
    const newCount = Math.round((value[0] / 100) * totalQuizCount)
    setSelectedQuizCount(newCount)
  }

  const handleClickQuizType = (quizType: Quiz.Type) => {
    setSelectedQuizType(quizType)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={'largeRound'} colors={'primary'} className="flex-center h-[52px] w-full">
          퀴즈 만들기
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto flex h-full max-h-[90dvh] max-w-mobile flex-col pb-[136px] *:px-4">
        <DrawerTitle>
          <Text typography="title3" className="pt-5">
            원하는 유형과 문제 수를 선택해주세요
          </Text>
        </DrawerTitle>

        <div className="flex items-center gap-2 pt-[38px]">
          <button
            className={cn(
              'border-default relative flex h-[136px] flex-1 flex-col justify-end rounded-[16px] border p-4',
              selectedQuizType === 'MULTIPLE_CHOICE' &&
                'border-border-focused bg-background-base-03'
            )}
            onClick={() => handleClickQuizType('MULTIPLE_CHOICE')}
          >
            <Icon name="multiple-quiz-icon" className="absolute top-[11px] h-[57px] w-[89.5px]" />
            <Text typography="subtitle2-bold">객관식</Text>
            <Text typography="text2-medium" color="sub">
              4개 선택지 중 정답 고르기
            </Text>
          </button>
          <button
            className={cn(
              'border-default relative flex h-[136px] flex-1 flex-col justify-end rounded-[16px] border p-4',
              selectedQuizType === 'MIX_UP' && 'border-border-focused bg-background-base-03'
            )}
            onClick={() => handleClickQuizType('MIX_UP')}
          >
            <Icon
              name="o-x-quiz-icon"
              className="absolute left-[10px] top-[18px] h-[57px] w-[89.5px]"
            />
            <Text typography="subtitle2-bold">O/X</Text>
            <Text typography="text2-medium" color="sub">
              참과 거짓 판단하기
            </Text>
          </button>
        </div>

        <div className="my-7 h-px w-full bg-border-divider" />

        <div className="flex-1 text-center">
          <Text typography="text1-medium" color="sub">
            만들 문제
          </Text>
          <Text typography="title1" color="accent" className="mt-2">
            {selectedQuizCount} 문제
          </Text>
          <Slider
            defaultValue={[25]}
            value={[(selectedQuizCount / totalQuizCount) * 100]}
            onValueChange={handleSliderChange}
            className="mt-4"
          />
          <div className="mt-2.5 flex justify-between">
            <Text typography="text2-medium" color="sub">
              {selectedQuizCount} 문제
            </Text>
            <Text typography="text2-medium" color="sub">
              {totalQuizCount} 문제
            </Text>
          </div>
        </div>

        <div className="absolute bottom-0 h-[100px] w-full pt-3">
          <Text
            typography="text2-medium"
            color="sub"
            className="absolute right-1/2 top-[-8px] translate-x-1/2 text-center"
          >
            현재 나의 별: <span className="text-text-secondary">16개</span>
          </Text>
          <Button
            variant={'largeRound'}
            colors={'special'}
            className="flex w-full gap-1 text-white"
            onClick={() =>
              handleCreateDocument({ quizType: selectedQuizType, star: selectedQuizCount })
            }
          >
            <div>퀴즈 생성하기</div>
            <div className="flex items-center gap-1 rounded-full bg-[#D3DCE4]/20 px-2 py-px">
              <span>
                <Icon name="star" />
              </span>
              <Text typography="text1-medium" color="primary-inverse">
                {selectedQuizCount}
              </Text>
            </div>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateQuizDrawer
