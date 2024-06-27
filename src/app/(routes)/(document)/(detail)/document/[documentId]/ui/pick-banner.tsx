import { DocumentStatus } from '@/apis/types/dto/document.dto'
import { SwitchCase } from '@/components/react/switch-case'
import icons from '@/constants/icons'
import Image from 'next/image'

interface Props {
  status: DocumentStatus
  rePick: () => void
}

export function PickBanner({ status, rePick }: Props) {
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
            <div
              role="button"
              className="p-[5px] text-small1-bold text-orange-06"
              onClick={() => rePick()}
            >
              pick 다시하기
            </div>
          </div>
        ),
      }}
      defaultComponent={null}
    />
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
