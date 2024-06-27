'use client'

import Image from 'next/image'
import { ArchiveLink } from './archive-link'
import icons from '@/constants/icons'
import { useGetBookmarksQuery } from '@/apis/fetchers/key-point/get-bookmarks/query'

export function SavedPicksLink() {
  const { data: keyPoints } = useGetBookmarksQuery()

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
