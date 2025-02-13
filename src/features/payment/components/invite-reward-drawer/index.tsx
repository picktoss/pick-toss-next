'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Input } from '@/shared/components/ui/input'
import Text from '@/shared/components/ui/text'
import InviteRewardInfo from '../invite-reward-info'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Props {
  triggerComponent: React.ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

const InviteRewardDrawer = ({ triggerComponent, open, onOpenChange }: Props) => {
  const { data } = useQuery(queries.auth.inviteLink())
  const [inviteLink, setInviteLink] = useState('')

  useEffect(() => {
    if (data) {
      setInviteLink(data.inviteLink)
    }
  }, [data])

  const handleCopy = async () => {
    if (!inviteLink) return

    try {
      await navigator.clipboard.writeText(inviteLink)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild className="cursor-pointer">
        {triggerComponent}
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <div className="my-[20px] flex h-[calc(80dvh-12px)] w-full flex-col gap-[45px] overflow-y-auto px-[45px]">
          <DrawerHeader className="flex h-fit w-full flex-col items-center gap-[24px] px-0">
            <Image src={'/images/stars-in-box.png'} alt="" width={115.54} height={109.95} />
            {/* <div className="flex-center h-[110px] w-[212px]">
              <Icon name="infinite-color-inverse" />
            </div> */}

            <div className="flex flex-col items-center gap-[8px]">
              <div className="relative">
                <DrawerTitle className="font-suit text-title3">초대할 때마다 50개!</DrawerTitle>
                <InviteRewardInfo />
              </div>

              <Text typography="text1-regular" color="secondary" className="text-center">
                친구, 가족, 지인들에게 픽토스를 공유해주세요 <br />
                그분이 해당 링크를 통해 픽토스에 가입하실 경우 <br />두 분 모두에게 별 50개를
                드려요!
              </Text>
            </div>
          </DrawerHeader>

          <div className="flex flex-col gap-[20px]">
            <Input
              label="내 링크"
              value={inviteLink}
              right={
                <Button variant={'tinySquare'} colors={'outlined'} onClick={handleCopy}>
                  복사하기
                </Button>
              }
              className="mx-[8px]"
              disabled
            />

            <div className="flex flex-col gap-[8px]">
              <Button
                variant={'mediumRound'}
                className="w-full bg-background-kakao text-icon-kakao hover:bg-background-kakao"
              >
                <Icon name="kakao" className="mr-[12px] size-[20px]" />
                카카오톡에 공유하기
              </Button>

              <Button variant={'mediumRound'} className="w-full">
                <Icon name="share" className="mr-[8px] size-[20px]" />
                링크 공유하기
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default InviteRewardDrawer
