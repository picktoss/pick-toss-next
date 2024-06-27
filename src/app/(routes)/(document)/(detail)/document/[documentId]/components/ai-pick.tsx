'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import icons from '@/constants/icons'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { SwitchCase } from '@/components/react/switch-case'
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAiPick } from '@/apis/fetchers/document/create-ai-pick'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { ToggleBookmarkResponse, toggleBookmark } from '@/apis/fetchers/key-point/toggle-bookmark'
import { DocumentStatus } from '@/apis/types/dto/document.dto'
import {
  GetKeyPointsByIdResponse,
  getKeyPointsById,
} from '@/apis/fetchers/key-point/get-key-points'
import { useToast } from '@/hooks/use-toast'

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

const GET_KEY_POINTS_BY_ID_QUERY_KEY = 'get-key-points-by-id'

export function AiPick({ initKeyPoints, initStatus }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { isPickOpen, setIsPickOpen } = useDocumentDetailContext()
  const [showToggle, setShowToggle] = useState(false)
  const session = useSession()
  const documentId = useParams().documentId as string
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    data: { documentStatus: status, keyPoints },
  } = useQuery({
    queryKey: [GET_KEY_POINTS_BY_ID_QUERY_KEY, documentId],
    queryFn: () =>
      getKeyPointsById({
        accessToken: session.data?.user.accessToken || '',
        documentId: Number(documentId),
      }),
    initialData: {
      documentStatus: initStatus,
      keyPoints: initKeyPoints,
    },
  })

  useEffect(() => {
    if (status !== 'PROCESSING') return

    const refetchKeyPoints = async () => {
      await queryClient.refetchQueries({ queryKey: [GET_KEY_POINTS_BY_ID_QUERY_KEY, documentId] })
      if (status === 'PROCESSING') {
        timerId = setTimeout(refetchKeyPoints, 4000)
      }
    }

    let timerId = setTimeout(refetchKeyPoints, 4000)

    return () => clearTimeout(timerId)
  }, [status, queryClient, documentId])

  const { mutate: mutateCreateAiPick } = useMutation({
    mutationKey: ['create-ai-pick'],
    mutationFn: () => {
      queryClient.setQueryData<GetKeyPointsByIdResponse>(
        [GET_KEY_POINTS_BY_ID_QUERY_KEY, documentId],
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            documentStatus: 'PROCESSING',
          }
        }
      )

      return createAiPick({
        documentId: Number(documentId),
        accessToken: session.data?.user.accessToken || '',
      })
    },
  })

  const { mutate: mutateToggleBookmark } = useMutation({
    mutationKey: ['patch-toggle-bookmark'],
    mutationFn: (data: { keypointId: number; bookmark: boolean }) => {
      queryClient.setQueryData<GetKeyPointsByIdResponse>(
        [GET_KEY_POINTS_BY_ID_QUERY_KEY, documentId],
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            keyPoints: oldData?.keyPoints.map((keypoint) =>
              keypoint.id !== data.keypointId ? keypoint : { ...keypoint, bookmark: data.bookmark }
            ),
          }
        }
      )

      return toggleBookmark({
        ...data,
        accessToken: session.data?.user.accessToken || '',
      })
    },
    onSuccess: (_, variable) => {
      const description = variable.bookmark ? 'pick이 저장되었습니다' : 'pick이 저장 해제되었습니다'

      toast({
        description: description,
      })
    },
    onSettled: async () => {
      await queryClient.refetchQueries({
        queryKey: [GET_KEY_POINTS_BY_ID_QUERY_KEY, documentId],
        exact: true,
      })
    },
    onError: async () => {
      /** TODO: 실패 안내 */
    },
  })

  useEffect(() => {
    if (isDesktop) {
      setIsPickOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                  <PickBanner status={status} />
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
                        onClick={() => mutateCreateAiPick()}
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
                      mutateToggleBookmark={mutateToggleBookmark}
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
              <PickBanner status={status} />
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
                onClick={() => mutateCreateAiPick()}
              >
                <StarsIcon />
                pick 시작
              </Button>
            </div>
          ) : (
            <div className="mt-[12px] flex flex-col gap-[40px] overflow-auto pb-[60px] pl-[16px] pr-[24px]">
              <PickAccordion keyPoints={keyPoints} mutateToggleBookmark={mutateToggleBookmark} />
              {status === 'PROCESSING' && <GeneratingPicks />}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function PickBanner({ status }: { status: DocumentStatus }) {
  return (
    <SwitchCase
      value={status}
      caseBy={{
        PROCESSED: (
          <div className="flex items-center justify-between rounded-[8px] bg-blue-01 py-[16px] pl-[14px] pr-[18px]">
            <div className="flex items-center gap-[8px]">
              <Image src={icons.pin} width={24} height={24} alt="" />
              <div className="text-small1-bold text-blue-06 lg:text-text-bold">
                픽토스 AI의 질문을 통해 내용을 돌아보세요
              </div>
            </div>
          </div>
        ),
        KEYPOINT_UPDATE_POSSIBLE: (
          <div className="flex items-center justify-between rounded-[8px] bg-gray-01 px-[16px] py-[21px]">
            <div className="flex items-center gap-[8px]">
              <GradientStarsIcon />
              <div className="text-small1-bold text-gray-08 lg:text-text-medium">
                퀴즈와 요약에 수정한 내용을 반영해보세요
              </div>
            </div>
            <div role="button" className="p-[5px] text-small1-bold text-orange-06">
              pick 다시하기
            </div>
          </div>
        ),
      }}
      defaultComponent={null}
    />
  )
}

function PickAccordion({
  keyPoints,
  mutateToggleBookmark,
}: {
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  mutateToggleBookmark: UseMutateFunction<
    ToggleBookmarkResponse,
    Error,
    {
      keypointId: number
      bookmark: boolean
    },
    unknown
  >
}) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-[19px]">
      {keyPoints.map((keyPoint, index) => (
        <AccordionItem value={keyPoint.id.toString()} key={keyPoint.id}>
          <AccordionTrigger
            className="flex items-center justify-between py-[12px]"
            chevronDownIcon={
              <div className="flex size-[24px] items-center justify-center rounded-full bg-blue-02">
                <ChevronDown size={16} color="#7095F8" strokeWidth={3} />
              </div>
            }
          >
            <div className="flex gap-[4px]">
              <div className="flex w-[16px] shrink-0 text-text-bold text-blue-06">{index + 1}</div>
              <span className="pr-[8px] text-left text-text-medium text-gray-09">
                {keyPoint.question}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 pl-[20px]">
            <div className="flex flex-col gap-[12px]">
              <div className="!text-text-regular text-gray-08">{keyPoint.answer}</div>
              <div
                role="button"
                onClick={() =>
                  mutateToggleBookmark({
                    keypointId: keyPoint.id,
                    bookmark: !keyPoint.bookmark,
                  })
                }
                className={cn(
                  'h-[31px] w-[69px] rounded-[24px] border flex justify-center items-center !text-small1-bold',
                  keyPoint.bookmark
                    ? 'border-blue-03 bg-blue-02 text-blue-06'
                    : 'border-gray-04 text-gray-06'
                )}
              >
                {keyPoint.bookmark ? (
                  <div className="flex items-center gap-[4px]">
                    <FilledBookMarkIcon />
                    <span>저장됨</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-[4px]">
                    <AddBookMarkIcon />
                    <span>저장</span>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function GeneratingPicks() {
  return (
    <div className="flex flex-col items-center justify-center gap-[16px]">
      <OrangeStarsIcon />
      <div className="bg-gradient-to-r from-[#93B0FF] to-[#FF8428] bg-clip-text text-text-medium text-transparent">
        AI가 pick을 생성하고 있어요...
      </div>
    </div>
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

function OrangeStarsIcon() {
  return (
    <svg width="25" height="36" viewBox="0 0 25 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.9669 4.957C17.2796 4.42058 17.9916 4.42058 18.3043 4.957L19.5138 7.03209C19.5647 7.11936 19.6292 7.19597 19.7045 7.25836L21.5602 8.79732C21.9822 9.1473 21.9822 9.84488 21.5602 10.1949L19.7045 11.7338C19.6292 11.7962 19.5647 11.8728 19.5138 11.9601L18.3043 14.0352C17.9916 14.5716 17.2796 14.5716 16.9669 14.0352L15.7574 11.9601C15.7065 11.8728 15.642 11.7962 15.5668 11.7338L13.711 10.1949C13.289 9.84488 13.289 9.1473 13.711 8.79732L15.5667 7.25836C15.642 7.19597 15.7065 7.11936 15.7574 7.03209L16.9669 4.957Z"
        fill="#FB7E20"
      />
      <path
        d="M9.11801 14.6636C9.75981 13.6551 11.2213 13.6551 11.8631 14.6636L14.3458 18.5652C14.4502 18.7292 14.5827 18.8733 14.7371 18.9906L18.5462 21.8841C19.4125 22.5421 19.4125 23.8537 18.5462 24.5117L14.7371 27.4052C14.5827 27.5225 14.4502 27.6666 14.3458 27.8307L11.8631 31.7322C11.2213 32.7407 9.75981 32.7407 9.11801 31.7322L6.63527 27.8307C6.53085 27.6666 6.39835 27.5225 6.24393 27.4052L2.43484 24.5117C1.5686 23.8537 1.5686 22.5421 2.43484 21.8841L6.24393 18.9906C6.39835 18.8733 6.53085 18.7292 6.63527 18.5652L9.11801 14.6636Z"
        fill="#FB7E20"
      />
    </svg>
  )
}

function GradientStarsIcon() {
  return (
    <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4297 1.04161C11.6188 0.719203 12.0494 0.719203 12.2386 1.04161L12.9701 2.28883C13.0008 2.34128 13.0399 2.38733 13.0854 2.42483L14.2077 3.34981C14.4629 3.56017 14.4629 3.97944 14.2077 4.1898L13.0854 5.11478C13.0399 5.15228 13.0008 5.19833 12.9701 5.25078L12.2385 6.498C12.0494 6.82041 11.6188 6.82041 11.4297 6.498L10.6982 5.25078C10.6674 5.19833 10.6284 5.15228 10.5829 5.11478L9.46057 4.1898C9.20533 3.97944 9.20533 3.56017 9.46057 3.34981L10.5829 2.42483C10.6284 2.38733 10.6674 2.34128 10.6982 2.28883L11.4297 1.04161Z"
        fill="url(#paint0_linear_3576_1510)"
      />
      <path
        d="M6.41235 6.93945C6.76623 6.35326 7.57206 6.35326 7.92593 6.93945L9.29487 9.20712C9.35244 9.30249 9.42551 9.38622 9.51065 9.4544L11.6109 11.1362C12.0885 11.5186 12.0885 12.281 11.6109 12.6634L9.51065 14.3452C9.42551 14.4134 9.35244 14.4971 9.29487 14.5925L7.92593 16.8602C7.57205 17.4464 6.76623 17.4464 6.41235 16.8602L5.04341 14.5925C4.98584 14.4971 4.91278 14.4134 4.82763 14.3452L2.72736 12.6634C2.24973 12.281 2.24973 11.5186 2.72736 11.1362L4.82763 9.45439C4.91278 9.38622 4.98584 9.30249 5.04341 9.20712L6.41235 6.93945Z"
        fill="url(#paint1_linear_3576_1510)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3576_1510"
          x1="5"
          y1="6"
          x2="-1.443"
          y2="9.443"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3576_1510"
          x1="5"
          y1="6"
          x2="-1.443"
          y2="9.443"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function AddBookMarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5549 3.11035C4.63809 3.11035 6.73723 3.11035 3.82042 3.11035C3.18329 3.11035 2.66602 3.58891 2.66602 4.17836V14.9431C2.66602 15.2524 3.03505 15.4362 3.31576 15.2699L7.5549 12.7399L11.794 15.2699V15.267C12.0748 15.4362 12.4438 15.2495 12.4438 14.9402V7.99924"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3.11035L14.8889 3.11035"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
      />
      <path
        d="M12.4434 0.666016L12.4434 5.5549"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FilledBookMarkIcon() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.33548 12.9333L5 10.2424L0.664516 12.9333C0.377419 13.1103 0 12.9147 0 12.5857V1.13597C0 0.509016 0.529032 0 1.18064 0H8.81935C9.47097 0 10 0.509016 10 1.13597V12.5826C10 12.9116 9.62258 13.1103 9.33548 12.9302V12.9333Z"
        fill="#577CFF"
      />
    </svg>
  )
}
