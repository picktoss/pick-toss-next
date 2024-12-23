'use client'

import CollectionInfoDropdownMenu from '@/features/collection/components/collection-info-dropdown-menu'
import MyCollectionInfoDropdownMenu from '@/features/collection/components/my-collection-info-dropdown-menu'
import { useCollectionInfo } from '@/requests/collection/hooks'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Icon from '@/shared/components/custom/icon'
import { useUser } from '@/shared/hooks/use-user'
import { useParams } from 'next/navigation'

const Header = () => {
  const { id } = useParams()
  const { user } = useUser()
  const { data } = useCollectionInfo(Number(id))

  if (!data) return null
  const isMine = user?.id === data.member.creatorId

  return (
    <header className="sticky top-0 h-[54px] shrink-0 bg-white">
      <div className="flex h-full items-center justify-between px-[16px] text-icon-system">
        <GoBackButton />
        <div className="flex items-center gap-[16px]">
          <Icon name="share" className="size-[24px]" />
          {isMine ? (
            <MyCollectionInfoDropdownMenu collectionId={data.id} />
          ) : (
            <CollectionInfoDropdownMenu collectionId={data.id} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
