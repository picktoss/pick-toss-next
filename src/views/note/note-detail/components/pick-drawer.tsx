'use client'

import Icon from '@/shared/components/icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import QuizCard from './quiz-card'
import Tag from '@/shared/components/ui/tag'

// 임시
const fakeSelectors = [
  { key: 'A', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
  { key: 'B', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
  { key: 'C', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
  { key: 'D', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
]
const fakeExplanation =
  '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 전통적인 생선, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야 합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이 안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을 불러일으키지 않는 중립적인 이름이어야 합니다.'

const PickDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex-center mb-[14px] h-[44px] w-full gap-[4px] bg-background-container-03">
          <Text typography="text1-medium" className="flex-center gap-[16px] text-text-info">
            <Text className="flex items-center">
              <Icon name="pin" className="mr-[2.5px] size-[16px]" />
              내가 어려워했던 문제는?
            </Text>
            <Text className="font-bold">
              복습 <i>p</i>ick
            </Text>
          </Text>
          <Icon name="chevron-down" className="text-icon-tertiary" />
        </div>
      </DrawerTrigger>

      <DrawerContent className="rounded-t-[16px]">
        <div className="my-[24px] flex h-[85dvh] flex-col items-center">
          <div className="w-full px-[9px]">
            <header className="flex flex-col px-[9px]">
              <DrawerTitle className="text-title3">
                복습 <i>p</i>ick
              </DrawerTitle>
              <Text typography="text1-medium" className="mt-[8px] text-text-sub">
                7일 이내에 틀린 적이 있거나, 시간이 오래 걸린 문제들이에요
              </Text>
            </header>

            <div className="mt-[24px] flex h-[calc(85dvh-75px)] flex-col gap-[14px] overflow-y-auto px-[9px] pb-[14px]">
              {/* 카드 리스트 map */}
              {Array.from({ length: 5 }).map((_, idx) => (
                <QuizCard
                  key={idx}
                  isReviewPick
                  headerComponent={<Tag colors={'tertiary'}>오답</Tag>}
                  question={'식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?'}
                  quizType={'multiple'}
                  selectors={fakeSelectors}
                  answer={'A'}
                  explanation={fakeExplanation}
                  pickReason={{ wrongAnswer: 'C' }}
                />
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PickDrawer
