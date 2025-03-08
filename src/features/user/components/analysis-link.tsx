'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import Link from 'next/link'

export const AnalysisLink = () => {
  const { analysisClickEvent } = useAmplitudeContext()

  return (
    <Link
      href={'/analysis'}
      className="flex-center flex-col gap-2"
      onClick={() => analysisClickEvent()}
    >
      <div className="rounded-[20px] bg-[#f8f8f8] p-[16px]">
        <Icon name="graph" className="w-[32px]" />
      </div>
      <Text typography="text2-medium">퀴즈 분석</Text>
    </Link>
  )
}
