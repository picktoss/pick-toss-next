import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'

export default function RootLoading() {
  return (
    <div className="center flex flex-col items-center lg:gap-[34px]">
      <Loading />

      <div className="hidden flex-col items-center gap-[16px] lg:flex">
        <Text typography="subtitle2-bold" color="secondary">
          페이지를 불러오는 중입니다
        </Text>
        <Text typography="text1-medium" color="sub">
          로딩이 완료될 때까지 잠시만 기다려주세요
        </Text>
      </div>
    </div>
  )
}
