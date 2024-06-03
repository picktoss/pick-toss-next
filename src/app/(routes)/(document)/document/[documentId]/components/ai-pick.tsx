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

interface Props {
  keyPoints: {
    id: number
    question: string
    answer: string
  }[]
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

export function AiPick({ keyPoints }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { isPickOpen, setIsPickOpen } = useDocumentDetailContext()
  const [showToggle, setShowToggle] = useState(false)

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
              className="top-0 flex h-screen w-[420px] flex-col gap-[6px] overflow-scroll bg-white"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideInOutVariants}
              onAnimationStart={() => setShowToggle(false)}
              onAnimationComplete={() => setShowToggle(true)}
            >
              <div>
                <div className="flex h-[80px] items-center gap-[24px] px-[19px]">
                  <h3 className="text-h2-bold text-gray-08">AI pick</h3>
                  <Button className="h-[36px] w-[120px] rounded-full">다시 생성하기</Button>
                </div>
              </div>

              <div className="flex flex-col gap-[36px] px-[16px] pb-[80px]">
                <div className="flex items-center justify-between rounded-[8px] bg-blue-01 py-[16px] pl-[14px] pr-[18px]">
                  <div className="flex items-center gap-[8px]">
                    <Image src={icons.pin} width={24} height={24} alt="" />
                    <div className="text-text-bold text-blue-06">
                      픽토스 AI의 질문을 통해 내용을 돌아보세요
                    </div>
                  </div>
                  <div className="text-small1-regular text-orange-06 underline">가이드 보기</div>
                </div>

                <div className="flex-1 overflow-scroll px-[20px]">
                  <Accordion type="multiple" className="flex flex-col px-[16px] py-[7px]">
                    {keyPoints.map((keyPoint, index) => (
                      <AccordionItem value={keyPoint.id.toString()} key={keyPoint.id}>
                        <AccordionTrigger
                          className="flex items-center justify-between"
                          chevronDownIcon={
                            <div className="flex size-[24px] items-center justify-center rounded-full bg-blue-02">
                              <ChevronDown size={16} color="#7095F8" strokeWidth={3} />
                            </div>
                          }
                        >
                          <div className="flex flex-1 gap-1">
                            <span className="text-body2-bold text-blue-06">{index + 1}</span>
                            <span className="text-left text-body2-medium text-gray-09">
                              {keyPoint.question}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-[14px] text-body2-regular text-gray-08">
                          {keyPoint.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
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
        <Button className="absolute bottom-[109px] right-1/2 flex h-[40px] w-[144px] translate-x-1/2 gap-[8px] rounded-full bg-blue-06 !text-body2-bold hover:bg-blue-06">
          <Image src={icons.pin} width={16.6} height={20.4} alt="" />
          AI pick 보기
        </Button>
      </DrawerTrigger>

      <DrawerContent hideSidebar>
        <div className="flex h-[95vh] w-full flex-col rounded-[16px] bg-blue-01">
          <div className="flex h-[64px] items-center justify-between rounded-t-[16px] border-b border-blue-02 bg-white px-[18px]">
            <div className="flex items-end gap-[6px]">
              <Image src={icons.pin} width={32} height={32} alt="" />
              <h3 className="text-h3-bold text-gray-08">AI pick</h3>
            </div>
            <Button className="mr-[46px] h-[28px] w-[96px] rounded-full">pick 시작</Button>
          </div>

          <div className="flex-1 overflow-scroll pb-[168px]">
            <Accordion type="multiple" className="flex flex-col px-[16px] py-[7px]">
              {keyPoints.map((keyPoint, index) => (
                <AccordionItem value={keyPoint.id.toString()} key={keyPoint.id}>
                  <AccordionTrigger
                    className="flex items-center justify-between"
                    chevronDownIcon={
                      <div className="flex size-[24px] items-center justify-center rounded-full bg-blue-02">
                        <ChevronDown size={16} color="#7095F8" strokeWidth={3} />
                      </div>
                    }
                  >
                    <div className="flex flex-1 gap-1">
                      <span className="text-body2-bold text-blue-06">{index + 1}</span>
                      <span className="text-left text-body2-medium text-gray-09">
                        {keyPoint.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-[14px] text-body2-regular text-gray-08">
                    {keyPoint.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Button
            className="absolute bottom-[109px] right-1/2 h-[40px] w-[144px] translate-x-1/2 rounded-full bg-blue-06 !text-body2-bold hover:bg-blue-06"
            onClick={() => setIsPickOpen(false)}
          >
            노트로 돌아가기
          </Button>
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
