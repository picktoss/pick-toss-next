'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../../components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import icons from '@/constants/icons'
import { useEffect, useState } from 'react'

interface Props {
  reward?: string
}

export function RewordDialog({ reward }: Props) {
  const router = useRouter()
  const session = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const userPoints = session.data?.user.dto.point

  useEffect(() => {
    if (Number(reward) > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [reward])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-[320px] !rounded-[12px] px-[20px] pb-[18px] pt-[32px]">
        <AlertDialogHeader className="*:text-center">
          <AlertDialogTitle className="!text-h4-bold text-gray-09">
            오늘의 퀴즈 보상
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-[8px] !text-text-medium text-gray-08">
            5일 연속 퀴즈를 풀면 별을 20개 드려요
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mx-auto my-[32px] flex w-[180px] flex-col items-center rounded-[12px] bg-gray-01 py-[12px]">
          <div className="flex items-center gap-[12px]">
            <Image src={icons.star} width={40} alt="" />
            <div className="text-[40px] font-bold leading-[50px] text-gray-08">{reward}</div>
          </div>
          <div className="mt-[8px] text-small1-regular text-gray-06">
            현재 나의 별: <span className="text-gray-08">{userPoints}개</span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full"
            onClick={() => {
              router.replace('/main')
            }}
          >
            받기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
