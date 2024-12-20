'use client'

import MoreStarDialog from '@/features/payment/components/more-star-dialog'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useUserStore } from '@/store/user'
import { useState } from 'react'

interface Props {
  handleCreateDocument: (params: { quizType: Quiz.Type; star: number }) => void
  maxQuizCount: number
}

const CreateQuizDrawer = ({ handleCreateDocument, maxQuizCount }: Props) => {
  const DOCUMENT_MIN_QUIZ_COUNT = 1
  const DOCUMENT_MAX_QUIZ_COUNT = maxQuizCount
  const DEFAULT_QUIZ_COUNT = 10

  const { userInfo: user } = useUserStore()
  const [selectedQuizCount, setSelectedQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [selectedQuizType, setSelectedQuizType] = useState<Quiz.Type>('MULTIPLE_CHOICE')
  const [isOpenMoreStar, setIsOpenMoreStar] = useState(false)

  const handleClickQuizType = (quizType: Quiz.Type) => {
    setSelectedQuizType(quizType)
  }

  const handleClickStart = () => {
    // TODO: 이용자의 별 체크
    const notEnoughStars = false // 임시
    if (notEnoughStars) {
      setIsOpenMoreStar(true)
      return
    }

    handleCreateDocument({ quizType: selectedQuizType, star: selectedQuizCount })
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={'largeRound'} colors={'primary'} className="flex-center h-[52px] w-full">
            퀴즈 만들기
          </Button>
        </DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto h-[80vh] max-w-mobile rounded-t-[20px]"
        >
          <div className="mt-[24px] flex h-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden px-[16px]">
            <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
              원하는 유형과 문제 수를 선택해주세요
            </DrawerTitle>

            {/* 문제 유형 선택 */}
            <div className="mb-[28px] flex gap-[8px]">
              <button
                onClick={() => handleClickQuizType('MULTIPLE_CHOICE')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border px-[7px] pb-[15px] pt-[20px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  selectedQuizType === 'MULTIPLE_CHOICE' &&
                    'bg-background-container-03 border-border-focused'
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
                onClick={() => handleClickQuizType('MIX_UP')}
                className={cn(
                  'flex h-[136px] w-[168px] flex-col justify-end rounded-[16px] border pb-[15px] pt-[18px] focus:border-border-focused focus:bg-background-container-03 focus-visible:outline-none',
                  selectedQuizType === 'MIX_UP' &&
                    'bg-background-container-03 border-border-focused'
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
                {selectedQuizCount} 문제
              </Text>

              {/* 문제 개수 슬라이더 */}
              <Slider
                min={DOCUMENT_MIN_QUIZ_COUNT}
                max={DOCUMENT_MAX_QUIZ_COUNT}
                step={1}
                defaultValue={
                  DOCUMENT_MAX_QUIZ_COUNT > DEFAULT_QUIZ_COUNT
                    ? [DEFAULT_QUIZ_COUNT]
                    : [DOCUMENT_MAX_QUIZ_COUNT]
                }
                value={[selectedQuizCount]}
                onValueChange={(value) => setSelectedQuizCount(value[0] || DEFAULT_QUIZ_COUNT)}
              />

              <div className="mt-[10px] flex w-full items-center justify-between text-text2-medium text-text-sub">
                <Text>{DOCUMENT_MIN_QUIZ_COUNT} 문제</Text>
                <Text>{DOCUMENT_MAX_QUIZ_COUNT} 문제</Text>
              </div>
            </div>

            <div className="flex-center w-full flex-col pb-[40px] pt-[21px]">
              <Text typography="text2-medium" color="sub">
                현재 나의 별:{' '}
                <Text as={'span'} color="secondary">
                  {user?.star}개
                </Text>
              </Text>

              <Button
                variant={'largeRound'}
                colors={'special'}
                className="mt-[5px] w-full text-button1 text-text-primary-inverse"
                onClick={handleClickStart}
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

export default CreateQuizDrawer
