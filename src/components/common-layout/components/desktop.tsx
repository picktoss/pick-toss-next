import { NotificationDialogPage } from '@/components/notification-dialog-page'
import { UserDropdownMenu } from '@/components/user-dropdown-menu'
import icons from '@/constants/icons'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { BellIcon } from '../svgs'

export function Desktop({ children }: React.PropsWithChildren) {
  return children
}

function DesktopHeader() {
  const { data: session } = useSession()

  return (
    <div className="ml-auto flex h-[60px] w-full items-center justify-end gap-[32px] px-[20px]">
      <NotificationDialogPage trigger={<BellIcon />} />

      <div className="flex items-center gap-[8px] rounded-[16px] bg-gray-02 px-[10px] py-[3.5px]">
        <Image src={icons.star} alt="" width={16} height={16} />
        <div className="mt-[3px] text-body2-bold leading-none text-gray-08">
          {session?.user.dto.point}
        </div>
      </div>

      <UserDropdownMenu />
    </div>
  )
}

Desktop.Header = DesktopHeader
