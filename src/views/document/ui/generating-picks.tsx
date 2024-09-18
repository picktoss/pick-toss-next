import Lottie from 'react-lottie-player'
import sparkleData from '../../../../../../../../public/lottie/sparkle.json'

export function GeneratingPicks() {
  return (
    <div className="flex flex-col items-center justify-center gap-[16px]">
      <Lottie
        animationData={sparkleData}
        play
        loop
        className="h-[36px] w-[25px] text-orange-06"
        color="#FB7E20"
      />
      <div className="bg-gradient-to-r from-[#93B0FF] to-[#FF8428] bg-clip-text text-text-medium text-transparent">
        AI가 pick을 생성하고 있어요...
      </div>
    </div>
  )
}
