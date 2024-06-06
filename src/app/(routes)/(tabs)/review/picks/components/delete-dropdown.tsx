'use client'

import { toggleBookmark } from '@/apis/fetchers/key-point/toggle-bookmark'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
  keyPointId: number
}

export default function DeleteDropdown({ keyPointId }: Props) {
  const session = useSession()
  const router = useRouter()

  const { mutate: deleteBookmark } = useMutation({
    mutationKey: ['toggle-bookmark', keyPointId],
    mutationFn: () =>
      toggleBookmark({
        keypointId: keyPointId,
        bookmark: false,
        accessToken: session.data?.user.accessToken || '',
      }),
    onSuccess: () => {
      router.refresh()
    },
    onError: () => {
      /** TODO: 에러 Toast */
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-[32px]">
          <ThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-[-10px] top-[-10px] h-[41px] w-[152px] rounded-[8px] p-0 shadow-lg">
        <DropdownMenuItem asChild>
          <button
            className="flex size-full cursor-pointer justify-start gap-[16px] pl-[21px] !text-body2-medium"
            onClick={() => deleteBookmark()}
          >
            <WastebasketIcon />
            <div className="text-notice-red">삭제하기</div>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThreeDots() {
  return (
    <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.5" cy="1.5" r="1.5" transform="rotate(-90 1.5 1.5)" fill="#A2A6AB" />
      <circle cx="7.5" cy="1.5" r="1.5" transform="rotate(-90 7.5 1.5)" fill="#A2A6AB" />
      <circle cx="13.5" cy="1.5" r="1.5" transform="rotate(-90 13.5 1.5)" fill="#A2A6AB" />
    </svg>
  )
}

function WastebasketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.48 13.2497H2.81333V13.2889L2.81794 13.3279L3.48 13.2497ZM12.68 13.2463L13.3421 13.3246L13.3467 13.2856V13.2463H12.68ZM7.10667 6.53967C7.10667 6.17148 6.80819 5.87301 6.44 5.87301C6.07181 5.87301 5.77333 6.17148 5.77333 6.53967H7.10667ZM5.77333 11.873C5.77333 12.2412 6.07181 12.5397 6.44 12.5397C6.80819 12.5397 7.10667 12.2412 7.10667 11.873H5.77333ZM10.44 6.53967C10.44 6.17148 10.1415 5.87301 9.77333 5.87301C9.40514 5.87301 9.10667 6.17148 9.10667 6.53967H10.44ZM9.10667 11.873C9.10667 12.2412 9.40514 12.5397 9.77333 12.5397C10.1415 12.5397 10.44 12.2412 10.44 11.873H9.10667ZM1 4.53967H15.16V3.20634H1V4.53967ZM5.90667 3.36634V2.66634H4.57333V3.36634H5.90667ZM5.90667 2.66634C5.90667 2.29786 6.20486 1.99967 6.57333 1.99967V0.666341C5.46848 0.666341 4.57333 1.56148 4.57333 2.66634H5.90667ZM6.57333 1.99967H9.77667V0.666341H6.57333V1.99967ZM9.77667 1.99967C10.1451 1.99967 10.4433 2.29786 10.4433 2.66634H11.7767C11.7767 1.56148 10.8815 0.666341 9.77667 0.666341V1.99967ZM10.4433 2.66634V3.36634H11.7767V2.66634H10.4433ZM2.81333 3.97967V13.2497H4.14667V3.97967H2.81333ZM2.81794 13.3279C2.95078 14.4519 3.97728 15.2063 5.08 15.2063V13.873C4.53606 13.873 4.18256 13.5141 4.14206 13.1714L2.81794 13.3279ZM5.08 15.2063H11.08V13.873H5.08V15.2063ZM11.08 15.2063C12.1849 15.2063 13.2095 14.4466 13.3421 13.3246L12.0179 13.1681C11.9772 13.5127 11.6217 13.873 11.08 13.873V15.2063ZM13.3467 13.2463V5.87301H12.0133V13.2463H13.3467ZM5.77333 6.53967V11.873H7.10667V6.53967H5.77333ZM9.10667 6.53967V11.873H10.44V6.53967H9.10667Z"
        fill="#F66444"
      />
    </svg>
  )
}
