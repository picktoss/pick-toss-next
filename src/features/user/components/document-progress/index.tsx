'use client'

import Text from '@/shared/components/ui/text'
import { useUserStore } from '@/store/user'

const DocumentProgress = () => {
  const { userInfo: user } = useUserStore()

  const maxPossessDocumentCount = user?.documentUsage.maxPossessDocumentCount ?? 0
  const possessDocumentCount = user?.documentUsage.possessDocumentCount ?? 0
  const addableDocumentCount = maxPossessDocumentCount - possessDocumentCount

  return (
    <div className="mt-[4px] flex flex-col gap-[8px] rounded-[12px] border border-border-default px-[19px] pb-[15px] pt-[18px]">
      <div className="flex items-center justify-between">
        <Text typography="text1-bold" className="text-text-secondary">
          남은 퀴즈노트
        </Text>
        <Text typography="text1-bold" className="font-suit text-[var(--color-orange-400)]">
          {possessDocumentCount} / {maxPossessDocumentCount}
        </Text>
      </div>
      <div className="relative h-[8px] w-full overflow-hidden rounded-[12px] bg-background-base-02">
        <div
          style={{ width: (addableDocumentCount / maxPossessDocumentCount) * 100 + '%' }}
          className="absolute right-0 top-0 z-10 h-full bg-fill-secondary-orange"
        ></div>
      </div>
      <Text typography="text1-medium" className="self-end text-text-sub">
        {addableDocumentCount}개의 노트를 더 저장할 수 있습니다
      </Text>
    </div>
  )
}

export default DocumentProgress
