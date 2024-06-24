import Image from 'next/image'
import { MobileOptions, SearchOptions } from '../types'
import { BackButton } from './back-button'
import icons from '@/constants/icons'
import { Button } from '@/components/ui/button'
import { NotificationDialogPage } from '@/components/notification-dialog-page'
import { useSession } from 'next-auth/react'
import { SearchForm, SearchFormSubmitType } from '@/components/search-form'
import { BellIcon, SearchIcon } from '../svgs'

export function Mobile({ children }: React.PropsWithChildren) {
  return children
}

function MobileHeader({
  children,
  mobileOptions,
  setSearchingTrue,
}: {
  children: React.ReactNode
  mobileOptions?: MobileOptions
  setSearchingTrue: () => void
}) {
  const { data: session } = useSession()

  const hasRightContent =
    mobileOptions?.hasNotifications || mobileOptions?.hasSearch || mobileOptions?.hasStars

  return (
    <div className="relative flex h-[48px] items-center px-[20px]">
      {mobileOptions?.hasBackButton && <BackButton />}

      {children}

      {hasRightContent && (
        <div className="ml-auto flex items-center gap-[16px]">
          {mobileOptions.hasStars && (
            <div className="flex items-center gap-[8px] rounded-[16px] bg-gray-02 px-[10px] py-[3.5px]">
              <Image src={icons.star} alt="" width={16} height={16} />
              <div className="mt-[3px] text-body2-bold leading-none text-gray-08">
                {session?.user.dto.point}
              </div>
            </div>
          )}
          {mobileOptions.hasSearch && (
            <Button variant="ghost" className="p-0" onClick={() => setSearchingTrue()}>
              <SearchIcon />
            </Button>
          )}
          {mobileOptions.hasNotifications && <NotificationDialogPage trigger={<BellIcon />} />}
        </div>
      )}
    </div>
  )
}

function SearchingStep({
  searchOptions,
  setSearchingFalse,
  handleSubmit,
}: {
  searchOptions: SearchOptions
  setSearchingFalse: () => void
  handleSubmit: SearchFormSubmitType
}) {
  return (
    <div className="px-[20px] pt-[13px]">
      <div className="flex h-[40px] gap-[10px]">
        <SearchForm placeholder={searchOptions?.placeholder} onSubmit={handleSubmit} />
        <Button
          variant="ghost"
          className="h-full p-0 !text-body2-medium text-gray-08"
          onClick={() => setSearchingFalse()}
        >
          취소
        </Button>
      </div>
    </div>
  )
}

Mobile.Header = MobileHeader
Mobile.SearchingStep = SearchingStep
