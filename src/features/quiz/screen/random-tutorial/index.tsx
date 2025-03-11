'use client'

import 'swiper/css'
import { useState, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Text from '@/shared/components/ui/text'
import { setLocalStorage } from '@/shared/utils/storage'
import { LOCAL_KEY } from '@/constants'
import QuizOptions from '../quiz-view/components/quiz-option'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Tag from '@/shared/components/ui/tag'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '@/shared/lib/utils'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { isMobile } from 'react-device-detect'

const RandomTutorial = () => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  const router = useRouter()

  const exitTutorial = () => {
    setLocalStorage(LOCAL_KEY.RANDOM_TUTORIAL_COMPLETE, true)
    router.replace('/quiz/random')
  }

  return (
    <div>
      <div className="fixed h-dvh w-screen max-w-mobile bg-orange-100"></div>

      <FirstStep handleNext={exitTutorial} />
    </div>
  )
}

// 튜토리얼 진행 화면 - 1
const FirstStep = ({ handleNext }: { handleNext: () => void }) => {
  const [SwiperContainerWidth, setSwiperContainerWidth] = useState<number>(0)
  const swiperContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (swiperContainerRef.current) {
      setSwiperContainerWidth(swiperContainerRef.current.clientWidth)
    }
    const handleResize = () => {
      if (swiperContainerRef.current) {
        setSwiperContainerWidth(swiperContainerRef.current.clientWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mockQuiz: Quiz.RandomItem = {
    id: 1,
    question: '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준이 아닌 것은?',
    options: [
      '소비자가 새로 기반 제품을 기존 제품과 구별할 수 있어야 한다',
      '알레르기가 있는 사람들이 새로 기반 제품을 식별할 수 있도록 해야 한다',
      '세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 한다',
      '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다',
    ],
    quizType: 'MULTIPLE_CHOICE',
    answer: '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다',
    explanation:
      '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준에는 특정한 이미지나 감정을 불러일으키는 것이 포함되지 않습니다.',
    collection: {
      id: 2,
      name: '최근 이슈',
    },
  }

  const slideItems = [
    {
      id: 1,
      name: '재태크상식',
      emoji: '💸',
    },
    {
      id: 2,
      name: '전공 공부',
      emoji: '🔥',
    },
    {
      id: 3,
      name: '세계사 1급',
      emoji: '🌎️',
    },
  ]

  const repository = 'directory'

  return (
    <div className="fixed z-10 flex w-screen max-w-mobile flex-col">
      <div className="absolute inset-0 z-10 h-screen bg-black/80" />

      <div className="relative h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
        {/* 헤더 영역 */}
        <div className="flex h-[54px] w-full items-center">
          <GoBackButton icon="cancel" onClick={() => {}} />
        </div>

        {/* 문제 영역 */}
        <div className="flex flex-col items-center">
          <Tag colors={'secondary'} className="px-[8px] py-[4px]">
            <Text typography="text2-bold">{mockQuiz.collection?.name}</Text>
          </Tag>

          <Text typography="question" className="mt-[12px] animate-fadeIn px-[30px] text-center">
            {mockQuiz.question}
          </Text>

          <QuizOptions
            quiz={mockQuiz}
            currentResult={null}
            onAnswer={() => {}}
            className="my-[16px] mt-[4dvh]"
          />
        </div>

        {/* 탭 영역 */}
        <Tabs
          defaultValue="directory"
          className="absolute bottom-4 right-1/2 z-20 h-[36px] w-[210px] translate-x-1/2 rounded-[12px] bg-background-base-02 p-[3px]"
        >
          <div className="absolute bottom-10">
            <Text typography="text1-medium" className="mx-auto text-background-base-01">
              어디에 저장된 퀴즈를 풀지 선택해요
            </Text>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="directory" className="h-[30px]">
              퀴즈노트
            </TabsTrigger>
            <TabsTrigger value="collection" className="h-[30px]">
              컬렉션
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Swiper 영역 */}
      <div ref={swiperContainerRef} className="flex-center size-full grow">
        <div className="flex-center relative mb-[10px] mt-[24px] size-full">
          <Swiper
            key={repository}
            width={SwiperContainerWidth}
            slidesPerView={3}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            initialSlide={1}
          >
            {slideItems.map((item, index) => (
              <SwiperSlide key={index} className="!flex items-center justify-center">
                <SlideItem
                  isActive={index === 1}
                  data={item}
                  variant={repository}
                  quizCount={232}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute z-20 flex h-full flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-4">
              <Text typography="text1-medium" color="primary-inverse">
                좌, 우로 밀어 <span className="text-text-accent">폴더</span>를 전환해요
              </Text>
              <svg
                width="224"
                height="32"
                viewBox="0 0 224 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 15.2929C-0.0976311 15.6834 -0.0976311 16.3166 0.292893 16.7071L6.65685 23.0711C7.04738 23.4616 7.68054 23.4616 8.07107 23.0711C8.46159 22.6805 8.46159 22.0474 8.07107 21.6569L2.41421 16L8.07107 10.3431C8.46159 9.95262 8.46159 9.31946 8.07107 8.92893C7.68054 8.53841 7.04738 8.53841 6.65685 8.92893L0.292893 15.2929ZM223.707 16.7071C224.098 16.3166 224.098 15.6834 223.707 15.2929L217.343 8.92895C216.953 8.53843 216.319 8.53843 215.929 8.92895C215.538 9.31948 215.538 9.95264 215.929 10.3432L221.586 16L215.929 21.6569C215.538 22.0474 215.538 22.6806 215.929 23.0711C216.319 23.4616 216.953 23.4616 217.343 23.0711L223.707 16.7071ZM3.92105 17C4.47334 17 4.92105 16.5523 4.92105 16C4.92105 15.4477 4.47334 15 3.92105 15L3.92105 17ZM9.76316 15C9.21087 15 8.76316 15.4477 8.76316 16C8.76316 16.5523 9.21087 17 9.76316 17L9.76316 15ZM15.6053 17C16.1575 17 16.6053 16.5523 16.6053 16C16.6053 15.4477 16.1575 15 15.6053 15L15.6053 17ZM21.4474 15C20.8951 15 20.4474 15.4477 20.4474 16C20.4474 16.5523 20.8951 17 21.4474 17L21.4474 15ZM27.2895 17C27.8418 17 28.2895 16.5523 28.2895 16C28.2895 15.4477 27.8418 15 27.2895 15L27.2895 17ZM33.1316 15C32.5793 15 32.1316 15.4477 32.1316 16C32.1316 16.5523 32.5793 17 33.1316 17L33.1316 15ZM38.9737 17C39.526 17 39.9737 16.5523 39.9737 16C39.9737 15.4477 39.526 15 38.9737 15L38.9737 17ZM44.8158 15C44.2635 15 43.8158 15.4477 43.8158 16C43.8158 16.5523 44.2635 17 44.8158 17L44.8158 15ZM50.6579 17C51.2102 17 51.6579 16.5523 51.6579 16C51.6579 15.4477 51.2102 15 50.6579 15L50.6579 17ZM56.5 15C55.9477 15 55.5 15.4477 55.5 16C55.5 16.5523 55.9477 17 56.5 17L56.5 15ZM62.3421 17C62.8944 17 63.3421 16.5523 63.3421 16C63.3421 15.4477 62.8944 15 62.3421 15L62.3421 17ZM68.1842 15C67.6319 15 67.1842 15.4477 67.1842 16C67.1842 16.5523 67.6319 17 68.1842 17L68.1842 15ZM74.0263 17C74.5786 17 75.0263 16.5523 75.0263 16C75.0263 15.4477 74.5786 15 74.0263 15L74.0263 17ZM79.8684 15C79.3161 15 78.8684 15.4477 78.8684 16C78.8684 16.5523 79.3161 17 79.8684 17L79.8684 15ZM85.7105 17C86.2628 17 86.7105 16.5523 86.7105 16C86.7105 15.4477 86.2628 15 85.7105 15L85.7105 17ZM91.5526 15C91.0003 15 90.5526 15.4477 90.5526 16C90.5526 16.5523 91.0003 17 91.5526 17L91.5526 15ZM97.3947 17C97.947 17 98.3947 16.5523 98.3947 16C98.3947 15.4477 97.947 15 97.3947 15L97.3947 17ZM103.237 15C102.685 15 102.237 15.4477 102.237 16C102.237 16.5523 102.685 17 103.237 17L103.237 15ZM109.079 17C109.631 17 110.079 16.5523 110.079 16C110.079 15.4477 109.631 15 109.079 15L109.079 17ZM114.921 15C114.369 15 113.921 15.4477 113.921 16C113.921 16.5523 114.369 17 114.921 17L114.921 15ZM120.763 17C121.315 17 121.763 16.5523 121.763 16C121.763 15.4477 121.315 15 120.763 15L120.763 17ZM126.605 15C126.053 15 125.605 15.4477 125.605 16C125.605 16.5523 126.053 17 126.605 17L126.605 15ZM132.447 17C133 17 133.447 16.5523 133.447 16C133.447 15.4477 133 15 132.447 15L132.447 17ZM138.289 15C137.737 15 137.289 15.4477 137.289 16C137.289 16.5523 137.737 17 138.289 17L138.289 15ZM144.132 17C144.684 17 145.132 16.5523 145.132 16C145.132 15.4477 144.684 15 144.132 15L144.132 17ZM149.974 15C149.421 15 148.974 15.4477 148.974 16C148.974 16.5523 149.421 17 149.974 17L149.974 15ZM155.816 17C156.368 17 156.816 16.5523 156.816 16C156.816 15.4477 156.368 15 155.816 15L155.816 17ZM161.658 15C161.106 15 160.658 15.4477 160.658 16C160.658 16.5523 161.106 17 161.658 17L161.658 15ZM167.5 17C168.052 17 168.5 16.5523 168.5 16C168.5 15.4477 168.052 15 167.5 15L167.5 17ZM173.342 15C172.79 15 172.342 15.4477 172.342 16C172.342 16.5523 172.79 17 173.342 17L173.342 15ZM179.184 17C179.736 17 180.184 16.5523 180.184 16C180.184 15.4477 179.736 15 179.184 15L179.184 17ZM185.026 15C184.474 15 184.026 15.4477 184.026 16C184.026 16.5523 184.474 17 185.026 17L185.026 15ZM190.868 17C191.421 17 191.868 16.5523 191.868 16C191.868 15.4477 191.421 15 190.868 15L190.868 17ZM196.71 15C196.158 15 195.71 15.4477 195.71 16C195.71 16.5523 196.158 17 196.71 17L196.71 15ZM202.553 17C203.105 17 203.553 16.5523 203.553 16C203.553 15.4477 203.105 15 202.553 15L202.553 17ZM208.395 15C207.842 15 207.395 15.4477 207.395 16C207.395 16.5523 207.842 17 208.395 17L208.395 15ZM214.237 17C214.789 17 215.237 16.5523 215.237 16C215.237 15.4477 214.789 15 214.237 15L214.237 17ZM220.079 15C219.527 15 219.079 15.4477 219.079 16C219.079 16.5523 219.527 17 220.079 17L220.079 15ZM1 17L3.92105 17L3.92105 15L1 15L1 17ZM9.76316 17L15.6053 17L15.6053 15L9.76316 15L9.76316 17ZM21.4474 17L27.2895 17L27.2895 15L21.4474 15L21.4474 17ZM33.1316 17L38.9737 17L38.9737 15L33.1316 15L33.1316 17ZM44.8158 17L50.6579 17L50.6579 15L44.8158 15L44.8158 17ZM56.5 17L62.3421 17L62.3421 15L56.5 15L56.5 17ZM68.1842 17L74.0263 17L74.0263 15L68.1842 15L68.1842 17ZM79.8684 17L85.7105 17L85.7105 15L79.8684 15L79.8684 17ZM91.5526 17L97.3947 17L97.3947 15L91.5526 15L91.5526 17ZM103.237 17L109.079 17L109.079 15L103.237 15L103.237 17ZM114.921 17L120.763 17L120.763 15L114.921 15L114.921 17ZM126.605 17L132.447 17L132.447 15L126.605 15L126.605 17ZM138.289 17L144.132 17L144.132 15L138.289 15L138.289 17ZM149.974 17L155.816 17L155.816 15L149.974 15L149.974 17ZM161.658 17L167.5 17L167.5 15L161.658 15L161.658 17ZM173.342 17L179.184 17L179.184 15L173.342 15L173.342 17ZM185.026 17L190.868 17L190.868 15L185.026 15L185.026 17ZM196.71 17L202.553 17L202.553 15L196.71 15L196.71 17ZM208.395 17L214.237 17L214.237 15L208.395 15L208.395 17ZM220.079 17L223 17L223 15L220.079 15L220.079 17Z"
                  fill="#FB8320"
                />
                <circle cx="112" cy="16" r="16" fill="#FEC473" />
                <circle cx="112" cy="16" r="10" fill="#FDA53A" />
              </svg>
            </div>
            <button className="p-4 text-button1 text-text-accent" onClick={handleNext}>
              시작
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SlideItemProps {
  isActive: boolean
  data: {
    id: number | string
    name: string
    emoji: string
  }
  variant: 'directory' | 'collection'
  quizCount: number
}

const SlideItem = ({ isActive, data, variant, quizCount }: SlideItemProps) => {
  const styles = {
    directory: {
      background: {
        base: 'bg-orange-200',
        active: 'bg-orange-400',
      },
      shadow: 'drop-shadow-[0_4px_20px_rgba(255,138,0,0.4)]',
      textColor: 'accent',
    },
    collection: {
      background: {
        base: 'bg-blue-200',
        active: 'bg-blue-400',
      },
      shadow: 'drop-shadow-[0_4px_20px_rgba(96,165,250,0.4)]',
      textColor: 'info',
    },
  } as const

  const currentStyle = styles[variant]

  return (
    <div
      className={cn(
        'rounded-[16px] p-[12px_14px_15px_14px] h-[12svh] aspect-[90/108]',
        'flex flex-col items-center justify-between text-center min-h-[106px] max-h-[140px]',
        currentStyle.background.base,
        isActive && [
          'h-[16svh] max-h-[160px] min-h-[130px]',
          currentStyle.shadow,
          currentStyle.background.active,
        ]
      )}
    >
      <div>
        <Text
          typography={isActive ? 'subtitle2-bold' : 'text2-bold'}
          color={isActive ? 'primary-inverse' : currentStyle.textColor}
        >
          {data.name}
        </Text>
        {isActive && (
          <Text typography="text2-medium" color="primary-inverse" className="mt-[3px]">
            {quizCount}문제
          </Text>
        )}
      </div>
      <Text typography="hero">{data.emoji}</Text>
    </div>
  )
}

export default RandomTutorial
