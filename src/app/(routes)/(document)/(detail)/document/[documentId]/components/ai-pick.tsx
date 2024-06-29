'use client'

import icons from '@/constants/icons'
import Image from 'next/image'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { SwitchCase } from '@/components/react/switch-case'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { DocumentStatus } from '@/apis/types/dto/document.dto'
import { GeneratingPicks } from '../ui/generating-picks'
import { PickBanner } from '../ui/pick-banner'
import { PickAccordion } from '../ui/pick-accordion'
import {
  GET_KEY_POINTS_BY_ID_KEY,
  useGetKeyPointsByIdQuery,
} from '@/apis/fetchers/key-point/get-key-points-by-id/query'
import { GetKeyPointsByIdResponse } from '@/apis/fetchers/key-point/get-key-points-by-id/fetcher'
import { useCreateAIPickMutation } from '@/apis/fetchers/document/create-ai-pick/mutation'
import { useToggleBookmarkMutation } from '@/apis/fetchers/key-point/toggle-bookmark/mutation'

interface Props {
  initKeyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  initStatus: DocumentStatus
}

const slideInOutVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
    },
  },
}

export function AiPick({ initKeyPoints, initStatus }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { isPickOpen, setIsPickOpen } = useDocumentDetailContext()
  const [showToggle, setShowToggle] = useState(false)
  const documentId = Number(useParams().documentId as string)
  const queryClient = useQueryClient()
  const prevStatusRef = useRef<DocumentStatus>()

  const {
    data: { documentStatus: status, keyPoints },
  } = useGetKeyPointsByIdQuery({
    documentId,
    initialData: {
      documentStatus: initStatus,
      keyPoints: initKeyPoints,
    },
  })

  const { mutate: mutateCreateAiPick } = useCreateAIPickMutation()

  const handleCreateAiPick = (option?: { rePick: boolean }) => {
    prevStatusRef.current = 'PROCESSING'

    queryClient.setQueryData<GetKeyPointsByIdResponse>(
      [GET_KEY_POINTS_BY_ID_KEY, documentId],
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          documentStatus: 'PROCESSING',
          keyPoints: option?.rePick ? [] : oldData.keyPoints,
        }
      }
    )

    mutateCreateAiPick({
      documentId,
    })
  }

  const { mutate: mutateToggleBookmark } = useToggleBookmarkMutation({
    documentId,
  })

  const handleToggleBookmark = (data: { keyPointId: number; bookmark: boolean }) => {
    queryClient.setQueryData<GetKeyPointsByIdResponse>(
      [GET_KEY_POINTS_BY_ID_KEY, documentId],
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          keyPoints: oldData?.keyPoints.map((keypoint) =>
            keypoint.id !== data.keyPointId ? keypoint : { ...keypoint, bookmark: data.bookmark }
          ),
        }
      }
    )

    mutateToggleBookmark(data)
  }

  useEffect(() => {
    // 문서 생성 polling이 완료 된 후 View 컴포넌트의 document refetch
    if (prevStatusRef.current === 'PROCESSING' && status === 'PROCESSED') {
      const refetchDocument = async () => {
        prevStatusRef.current === 'PROCESSED'
        await queryClient.refetchQueries({
          queryKey: [GET_KEY_POINTS_BY_ID_KEY, Number(documentId)],
        })
      }

      void refetchDocument()
    }
  }, [status, documentId, queryClient])

  useEffect(() => {
    if (status !== 'PROCESSING') return

    const refetchKeyPoints = async () => {
      await queryClient.refetchQueries({ queryKey: [GET_KEY_POINTS_BY_ID_KEY, Number(documentId)] })
      if (status === 'PROCESSING') {
        timerId = setTimeout(refetchKeyPoints, 4000)
      }
    }

    let timerId = setTimeout(refetchKeyPoints, 4000)

    return () => clearTimeout(timerId)
  }, [status, queryClient, documentId])

  useEffect(() => {
    if (isDesktop) {
      setIsPickOpen(true)
    }
  }, [isDesktop, setIsPickOpen])

  if (isDesktop) {
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
              variants={slideInOutVariants}
              onAnimationStart={() => setShowToggle(false)}
              onAnimationComplete={() => setShowToggle(true)}
            >
              <div className="mb-[20px] flex flex-col gap-[15px] pt-[23px]">
                <div className="flex h-[48px] items-center px-[19px]">
                  <h3 className="text-h3-bold text-gray-08">
                    A<i>I</i> pick
                  </h3>
                </div>

                <div className="px-[10px]">
                  <PickBanner status={status} rePick={() => handleCreateAiPick()} />
                </div>
              </div>

              <div className="flex-1 overflow-scroll">
                {status === 'UNPROCESSED' ? (
                  <div className="relative h-full">
                    <div className="absolute bottom-1/2 flex w-full flex-col items-center gap-[24px] text-center text-text-medium text-gray-08">
                      <p>
                        AI pick으로 퀴즈 내용을 선정하고
                        <br />
                        노트 요약을 확인해보세요
                      </p>
                      <Button
                        variant="gradation"
                        size="sm"
                        className="w-fit gap-[4px]"
                        onClick={() => handleCreateAiPick()}
                      >
                        <StarsIcon />
                        pick 시작
                      </Button>
                    </div>
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

  return (
    <Drawer open={isPickOpen} onOpenChange={setIsPickOpen}>
      <DrawerTrigger asChild>
        {status === 'UNPROCESSED' ? (
          <Button
            variant="gradation"
            size="sm"
            className="absolute bottom-[50px] right-1/2 flex h-[40px] w-[144px] translate-x-1/2 gap-[4px] rounded-full !text-body2-bold text-white"
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
        <div className="mt-[10px] flex h-[90vh] flex-col">
          <div className="flex flex-col gap-[15px]">
            <h3 className="pl-[24px] text-h3-bold text-gray-08">
              AI <i>p</i>ick
            </h3>

            <div className="px-[15px]">
              <PickBanner status={status} rePick={() => handleCreateAiPick()} />
            </div>
          </div>

          {status === 'UNPROCESSED' ? (
            <div className="absolute bottom-1/2 flex w-full flex-col items-center gap-[24px] text-center text-text2-bold text-gray-08">
              <p>
                AI pick으로 퀴즈 내용을 선정하고
                <br />
                노트 요약을 확인해보세요
              </p>
              <Button
                variant="gradation"
                size="sm"
                className="w-fit gap-[4px]"
                onClick={() => handleCreateAiPick()}
              >
                <StarsIcon />
                pick 시작
              </Button>
            </div>
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

function ChevronRightIcon() {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L6 7L1 13"
        stroke="#A2A6AB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 13L1 7L6 1"
        stroke="#7095F8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarsIcon() {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5251 0.951505C9.68269 0.682832 10.0415 0.682832 10.1991 0.951505L10.8087 1.99086C10.8344 2.03457 10.8669 2.07294 10.9048 2.10419L11.8401 2.87501C12.0528 3.0503 12.0528 3.3997 11.8401 3.57499L10.9048 4.34581C10.8669 4.37706 10.8344 4.41544 10.8087 4.45915L10.1991 5.4985C10.0415 5.76717 9.68269 5.76717 9.5251 5.4985L8.91549 4.45915C8.88986 4.41544 8.85732 4.37706 8.81941 4.34581L7.88413 3.57499C7.67144 3.3997 7.67144 3.0503 7.88413 2.87501L8.81941 2.10419C8.85732 2.07294 8.88986 2.03457 8.91549 1.99085L9.5251 0.951505Z"
        fill="white"
      />
      <path
        d="M5.34395 5.86637C5.63885 5.37788 6.31037 5.37788 6.60527 5.86637L7.74605 7.7561C7.79403 7.83557 7.85491 7.90535 7.92586 7.96216L9.67609 9.36365C10.0741 9.68237 10.0741 10.3176 9.67609 10.6364L7.92586 12.0378C7.85491 12.0947 7.79403 12.1644 7.74605 12.2439L6.60526 14.1336C6.31037 14.6221 5.63885 14.6221 5.34395 14.1336L4.20316 12.2439C4.15519 12.1644 4.0943 12.0947 4.02335 12.0378L2.27313 10.6364C1.8751 10.3176 1.8751 9.68237 2.27313 9.36365L4.02335 7.96216C4.0943 7.90535 4.15519 7.83557 4.20317 7.7561L5.34395 5.86637Z"
        fill="white"
      />
    </svg>
  )
}
