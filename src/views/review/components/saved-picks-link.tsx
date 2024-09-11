'use client'

import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import { ArchiveLink } from './archive-link'
import Icon from '@/shared/components/icon'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const SavedPicksLink = ({ className }: Props) => {
  const { data: keyPoints } = useQuery(queries.keyPoints.list())

  return (
    <div className={cn(className)}>
      <ArchiveLink
        redirectUrl="/review/picks"
        title="저장한 pick"
        icon={
          <div className="flex size-[56px] items-center justify-center rounded-full bg-orange-01">
            <Icon name="save-pick" className="size-[31px]" />
          </div>
        }
        count={keyPoints?.length || 0}
      />
    </div>
  )
}
