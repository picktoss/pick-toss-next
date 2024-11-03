import Loading from '@/shared/components/custom/loading'

export default function RootLoading() {
  return (
    <div className="center flex flex-col items-center lg:gap-[34px]">
      <Loading className="lg:hidden" />
      <Loading className="hidden lg:block" size="large" />

      <div className="hidden flex-col items-center gap-[16px] lg:flex">
        <div className="text-h2-bold text-gray-08">페이지를 불러오는 중입니다</div>
        <div className="text-body1-medium text-gray-07">
          로딩이 완료될 때까지 잠시만 기다려주세요
        </div>
      </div>
    </div>
  )
}
