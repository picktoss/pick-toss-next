'use client'

import Image from 'next/image'
import { ArchiveLink } from './archive-link'
import icons from '@/constants/icons'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export function SavedPicksLink() {
  const { data: keyPoints } = useQuery({
    ...queries.keyPoints.list(),
  })

  return (
    <ArchiveLink
      redirectUrl="/review/picks"
      title="저장한 pick"
      icon={
        <div className="flex size-[56px] items-center justify-center rounded-full bg-orange-01">
          <Image src={icons.savePick} width={31} height={31} alt="" />
        </div>
      }
      count={keyPoints?.length || 0}
    />
  )
}
