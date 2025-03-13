'use client'

import Icon from '@/shared/components/custom/icon'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import Link from 'next/link'

interface Props {
  ranking: number
  documentId: number
  documentTitle: string
  directory: string
  reviewCount?: number
}

const ReviewTop5Item = ({ ranking, documentId, documentTitle, directory, reviewCount }: Props) => {
  const { top5NoteClickEvent } = useAmplitudeContext()

  return (
    <Link
      href={`/document/${documentId}?prev=home`}
      className="flex h-fit w-full items-center justify-between px-[20px] py-[16px]"
      onClick={() => {
        top5NoteClickEvent({
          rank: ranking,
        })
      }}
    >
      <div className="flex items-center gap-[20px]">
        <Text typography="text1-bold" color="accent">
          {ranking}
        </Text>
        <div className="flex flex-col items-start gap-[2px]">
          <Text
            typography="subtitle2-medium"
            className="w-[calc(100dvw-200px)] max-w-[calc(430px-200px)] truncate"
          >
            {documentTitle}
          </Text>
          <Text typography="text2-medium" color="caption">
            {directory}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-[19px]">
        {reviewCount ? <Tag colors={'secondary'}>복습 필요 {reviewCount}</Tag> : null}
        <Icon name="chevron-right" className="size-[12px] text-icon-tertiary" />
      </div>
    </Link>
  )
}

export default ReviewTop5Item
