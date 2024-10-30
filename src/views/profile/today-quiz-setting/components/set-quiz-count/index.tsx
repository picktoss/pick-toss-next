'use client'

import { Slider } from '@/shared/components/ui/slider'
import Text from '@/shared/components/ui/text'
import { useTodayQuizSetting } from '../../context/today-quiz-setting-context'

const SetQuizCount = () => {
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
        min={5}
        max={20}
        step={1}
        value={[quizCount]}
        defaultValue={[10]}
        onValueChange={(value) => setQuizCount(value[0])}
      />

      <Text
        typography="text2-medium"
        className="mt-[10px] flex items-center justify-between text-text-sub"
      >
        <span>5 문제</span>
        <span>20 문제</span>
      </Text>
    </div>
  )
}

export default SetQuizCount
