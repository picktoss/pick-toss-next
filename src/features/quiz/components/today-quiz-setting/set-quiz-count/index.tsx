'use client'

import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useTodayQuizSetting } from '../../../context/today-quiz-setting-context'

const SetQuizCount = () => {
  const DEFAULT_QUIZ_COUNT = 10
  const DOCUMENT_MIN_QUIZ_COUNT = 5
  const DOCUMENT_MAX_QUIZ_COUNT = 20

  const { quizCount, setQuizCount } = useTodayQuizSetting()

  return (
    <div className="w-full border-b border-border-divider py-[5px] pb-[16px]">
      <div className="mb-[24px] flex items-center justify-between">
        <Text typography="subtitle1-bold">매일 받을 문제 수</Text>
        <Text typography="subtitle2-bold" className="text-text-accent">
          {quizCount} 문제
        </Text>
      </div>

      <Slider
        min={DOCUMENT_MIN_QUIZ_COUNT}
        max={DOCUMENT_MAX_QUIZ_COUNT}
        step={1}
        value={[quizCount]}
        defaultValue={[DEFAULT_QUIZ_COUNT]}
        onValueChange={(value) => setQuizCount(value[0] || DEFAULT_QUIZ_COUNT)}
      />

      <div className="mt-[10px] flex items-center justify-between text-text2-medium text-text-sub">
        <Text>{DOCUMENT_MIN_QUIZ_COUNT} 문제</Text>
        <Text>{DOCUMENT_MAX_QUIZ_COUNT} 문제</Text>
      </div>
    </div>
  )
}

export default SetQuizCount
