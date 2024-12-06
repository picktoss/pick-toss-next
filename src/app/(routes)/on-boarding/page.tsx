import CategorySelectArea from '@/features/category/components/category-select-area'
import Text from '@/shared/components/ui/text'

const OnBoardingPage = () => {
  return (
    <main className="flex h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden bg-background-base-01 px-[16px] scrollbar-hide">
      <Text typography="title2" className="mt-[70px]">
        관심분야를 선택해주세요
      </Text>
      <Text typography="text1-medium" color="sub">
        픽토스님이 좋아하실만한 퀴즈를 홈에서 볼 수 있어요
      </Text>

      <CategorySelectArea />
    </main>
  )
}

export default OnBoardingPage
