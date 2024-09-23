'use client'

import { Button } from '@/shared/components/ui/button'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { cn } from '@/shared/lib/utils'
import { SwitchCase } from '@/shared/components/react/switch-case'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from './ai-pick-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { SLIDE_IN_OUT_VARIANTS } from '@/constants/ai-pick'
import { PickBanner } from '../ui/pick-banner'
import AiPickUnprocessed from './ai-pick-unprocessed'
import { PickAccordion } from '../ui/pick-accordion'
import { GeneratingPicks } from '../ui/generating-picks'
import icons from '@/constants/icons'

// AiPickContentDesktop 컴포넌트
const AiPickContentDesktop = () => {
  const {
    isPickOpen,
    setIsPickOpen,
    showToggle,
    setShowToggle,
    status,
    keyPoints,
    handleCreateAiPick,
    handleReCreateAiPick,
    handleToggleBookmark,
  } = useDocumentDetailContext()

  return (
    <div className="relative z-50">
      {showToggle && (
        <Button
          variant="ghost"
          className={cn(
            'bottom-1/2 h-[80px] w-[24px] translate-y-1/2 rounded-l-[12px] rounded-r-none border border-gray-02 bg-white p-0 shadow-md relative',
            isPickOpen ? 'absolute right-[420px]' : 'fixed right-[0px]'
          )}
          onClick={() => {
            if (isPickOpen) {
              setIsPickOpen(false)
            } else {
              setIsPickOpen(true)
            }
          }}
        >
          <SwitchCase
            value={String(isPickOpen)}
            caseBy={{
              false: (
                <div>
                  <div className="absolute bottom-[80px] right-[24px] flex size-[40px] items-center justify-center rounded-full rounded-br-none bg-blue-06">
                    <Image src={icons.pin} width={20} height={20} alt="" />
                  </div>
                  <ChevronLeftIcon />
                </div>
              ),
              true: <ChevronRightIcon />,
            }}
          />
        </Button>
      )}

      <AnimatePresence>
        {isPickOpen && (
          <motion.div
            className="relative top-0 flex h-screen w-[420px] flex-col bg-white"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={SLIDE_IN_OUT_VARIANTS}
            onAnimationStart={() => setShowToggle(false)}
            onAnimationComplete={() => setShowToggle(true)}
          >
            <div className="mb-[20px] flex flex-col gap-[15px] pt-[23px]">
              <div className="flex h-[48px] items-center px-[19px]">
                <h3 className="text-h3-bold text-gray-08">
                  AI <i>p</i>ick
                </h3>
              </div>

              <div className="px-[10px]">
                <PickBanner status={status} rePick={() => handleReCreateAiPick()} />
              </div>
            </div>

            <div className="flex-1 overflow-scroll">
              {status === 'UNPROCESSED' ? (
                <div className="relative h-full">
                  <AiPickUnprocessed isDesktop={true} handleCreateAiPick={handleCreateAiPick} />
                </div>
              ) : (
                <div className="flex flex-col gap-[40px] pb-[60px] pl-[16px] pr-[18px]">
                  <PickAccordion
                    keyPoints={keyPoints}
                    handleToggleBookmark={(data: { keyPointId: number; bookmark: boolean }) =>
                      handleToggleBookmark(data)
                    }
                  />
                  {status === 'PROCESSING' && <GeneratingPicks />}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AiPickContentDesktop
