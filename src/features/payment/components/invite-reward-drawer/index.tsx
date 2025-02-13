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
import { useKakaoSDK } from '@/shared/hooks/use-kakao-sdk'

interface Props {
  triggerComponent: React.ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

const InviteRewardDrawer = ({ triggerComponent, open, onOpenChange }: Props) => {
  const { data } = useQuery(queries.auth.inviteLink())
  const [inviteLink, setInviteLink] = useState('')
  const { isLoaded: isKakaoSDKLoaded, error: kakaoSDKError } = useKakaoSDK()

  useEffect(() => {
    if (data) {
      setInviteLink(data.inviteLink)
    }
  }, [data])

  // 카카오톡에 공유
  const handleKakaoShare = () => {
    if (!isKakaoSDKLoaded || kakaoSDKError) {
      console.error('Kakao SDK 로드 실패:', kakaoSDKError)
      return
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '픽토스에 초대합니다!',
        description: '내 노트 필기에서 ai로 문제를 만들어보세요!',
        imageUrl: '(이미지의 웹 url 필요)',
        link: {
          mobileWebUrl: inviteLink,
          webUrl: inviteLink,
        },
      },
      buttons: [
        {
          title: '초대 링크로 가기',
          link: {
            mobileWebUrl: inviteLink,
            webUrl: inviteLink,
          },
        },
      ],
    })
  }

  // 기본 공유하기
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '픽토스에 초대합니다!',
          text: '친구 초대하고 별 50개 받으세요!',
          url: inviteLink,
        })
      } catch (error) {
        console.error('공유하기 실패:', error)
      }
    } else {
      // 공유 API를 지원하지 않는 환경에서는 클립보드에 복사
      await handleCopy()
    }
  }

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
                onClick={handleKakaoShare}
                variant={'mediumRound'}
                className="w-full bg-background-kakao text-icon-kakao hover:bg-background-kakao"
              >
                <Icon name="kakao" className="mr-[12px] size-[20px]" />
                카카오톡에 공유하기
              </Button>

              <Button onClick={handleNativeShare} variant={'mediumRound'} className="w-full">
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
