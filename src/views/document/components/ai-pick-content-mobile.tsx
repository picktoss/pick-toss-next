'use client'

import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { Button } from '@/shared/components/ui/button'
import { StarsIcon } from '../ui/pick-icons'
import Image from 'next/image'
import icons from '@/constants/icons'
import { PickBanner } from '../ui/pick-banner'
import AiPickUnprocessed from './ai-pick-unprocessed'
import { PickAccordion } from '../ui/pick-accordion'
import { GeneratingPicks } from '../ui/generating-picks'

// AiPickContentMobile 컴포넌트
const AiPickContentMobile = () => {
  const {
    isPickOpen,
    setIsPickOpen,
    status,
    keyPoints,
    handleCreateAiPick,
    handleReCreateAiPick,
    handleToggleBookmark,
  } = useDocumentDetailContext()

  return (
    <Drawer open={isPickOpen} onOpenChange={setIsPickOpen}>
      <DrawerTrigger asChild>
        {status === 'UNPROCESSED' ? (
          <Button
            variant="gradation"
            size="sm"
            className="absolute bottom-[50px] right-1/2 flex h-[40px] w-[144px] translate-x-1/2 gap-[4px] rounded-full !text-body2-bold text-white shadow-lg"
          >
            <StarsIcon />
            pick 시작
          </Button>
        ) : (
          <Button className="absolute bottom-[50px] right-1/2 flex h-[40px] w-[144px] translate-x-1/2 gap-[8px] rounded-full bg-blue-06 !text-body2-bold hover:bg-blue-06">
            <Image src={icons.pin} width={16.6} height={20.4} alt="" />
            <span>
              AI <i>p</i>ick 보기
            </span>
          </Button>
        )}
      </DrawerTrigger>

      <DrawerContent className="rounded-t-[20px]">
        <div className="mt-[10px] flex h-[90dvh] flex-col">
          <div className="flex flex-col gap-[15px]">
            <h3 className="pl-[24px] text-h3-bold text-gray-08">
              AI <i>p</i>ick
            </h3>

            <div className="px-[15px]">
              <PickBanner status={status} rePick={() => handleReCreateAiPick()} />
            </div>
          </div>

          {status === 'UNPROCESSED' ? (
            <AiPickUnprocessed isDesktop={false} handleCreateAiPick={handleCreateAiPick} />
          ) : (
            <div className="mt-[12px] flex flex-col gap-[40px] overflow-auto pb-[60px] pl-[16px] pr-[24px]">
              <PickAccordion
                keyPoints={keyPoints}
                handleToggleBookmark={(data: { keyPointId: number; bookmark: boolean }) => {
                  handleToggleBookmark(data)
                }}
              />
              {status === 'PROCESSING' && <GeneratingPicks />}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AiPickContentMobile
