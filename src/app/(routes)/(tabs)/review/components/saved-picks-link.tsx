'use client'

import Image from 'next/image'
import { ArchiveLink } from './archive-link'
import icons from '@/constants/icons'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getBookmarks } from '@/apis/fetchers/key-point/get-bookmarks'

export function SavedPicksLink() {
  const { data: session } = useSession()

  const { data } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () =>
      getBookmarks({
        accessToken: session?.user.accessToken || '',
      }),
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
      count={data?.keyPoints.length || 0}
    />
  )
}
