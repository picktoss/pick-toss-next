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
// import InviteRewardInfo from '../invite-reward-info'
import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useKakaoSDK } from '@/shared/hooks/use-kakao-sdk'
import { shareToKakao } from '@/shared/utils/kakao'
import { nativeShare } from '@/shared/utils/share'
import { useToast } from '@/shared/hooks/use-toast'

// TODO: PRO버전으로 변경 시 내용 수정
const inviteText = {
  title: '지금 가입하고 별 50개 더 받으세요!',
  description:
    '픽토스에서는 AI퀴즈로 매일 간단하게 내가 배운 걸 기억할 수 있어요. 이 초대권을 통해 픽토스에 가입하실 경우 두 분 모두에게 퀴즈를 만들 수 있는 별 50를 추가로 드려요!',
}

interface Props {
  triggerComponent: React.ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

const InviteRewardDrawer = ({ triggerComponent, open, onOpenChange }: Props) => {
  const { data, refetch } = useQuery(queries.auth.inviteLink())
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const { isLoaded: isKakaoSDKLoaded, error: kakaoSDKError } = useKakaoSDK()

  const toastId = useId()
  const { toast } = useToast()

  // Drawer가 열릴 때마다 쿼리 강제 리페치
  useEffect(() => {
    const inviteLinkRefetch = async () => {
      try {
        if (open) {
          await refetch()
          return
        }

        if (shouldRefetch) {
          await refetch()
          return
        }
      } catch (error) {
        console.error('리페치 중 오류 발생:', error)
      }
    }

    void inviteLinkRefetch()
  }, [open, refetch, shouldRefetch])

  useEffect(() => {
    if (data) {
      setInviteLink(data.inviteLink)
    }
  }, [data])

  // 카카오톡에 공유
  const handleKakaoShare = async () => {
    if (!isKakaoSDKLoaded || kakaoSDKError) {
      console.error('Kakao SDK 로드 실패:', kakaoSDKError)
      return
    }

    try {
      const imageUrl = `${process.env.NEXTAUTH_URL}/images/share-thumbnail.png`

      await shareToKakao({
        title: inviteText.title,
        description: inviteText.description,
        imageUrl: imageUrl,
        inviteLinkUrl: inviteLink,
      })
    } catch (error) {
      console.error('공유하기 실패:', error)
    }
  }

  // 기본 공유하기
  const handleNativeShare = async () => {
    const content = {
      title: inviteText.title,
      text: inviteText.description,
      url: inviteLink,
    }

    // fallback: 공유 API를 지원하지 않는 환경에서는 클립보드에 복사
    await nativeShare(content, handleCopy)
  }

  const handleCopy = async () => {
    if (!inviteLink) return

    try {
      await navigator.clipboard.writeText(inviteLink)

      toast({}).update({
        id: toastId,
        title: '링크가 복사되었어요',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger onClick={() => setShouldRefetch(true)} asChild className="cursor-pointer">
        {triggerComponent}
      </DrawerTrigger>

      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto flex h-[80dvh] max-w-mobile flex-col rounded-t-[20px]"
      >
        <div className="my-[20px] flex h-[calc(80dvh-12px)] w-full flex-col gap-[45px] overflow-y-auto px-[45px]">
          <DrawerHeader className="flex h-fit w-full flex-col items-center gap-[24px] px-0">
            <Image src={'/images/stars-in-box.png'} alt="" width={115.54} height={109.95} />
            {/* 아래는 PRO버전 이미지 코드입니다 */}
            {/* <div className="flex-center h-[110px] w-[212px]">
              <Icon name="infinite-color-inverse" />
            </div> */}

            <div className="flex flex-col items-center gap-[8px]">
              <div className="relative">
                <DrawerTitle>
                  <Text typography="title2">초대할 때마다 50개!</Text>
                </DrawerTitle>
                {/* 아래는 PRO버전 코드입니다 */}
                {/* <InviteRewardInfo /> */}
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
                onClick={async () => await handleKakaoShare()}
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
