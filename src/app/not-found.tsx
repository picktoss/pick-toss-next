'use client'

import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="center flex-center h-dvh w-dvw max-w-mobile flex-col bg-background-base-02">
      <NotFoundIcon className="h-[128px] w-[204px]" />
      <div className="mt-[22.4px] flex flex-col items-center gap-[10px] lg:mt-[15.7px] lg:gap-[16px] lg:py-0">
        <Text typography="title3">페이지를 찾을 수 없습니다.</Text>
        <Text typography="text1-medium" color="sub" className="px-[45px] text-center">
          존재하지 않는 주소를 입력했거나, 요청하신 페이지의 <br /> 주소가 변경, 삭제되어 찾을 수
          없습니다.
        </Text>
      </div>
      <div className="mt-[54px] flex w-full max-w-[480px] flex-col gap-[16px] px-[20px]">
        <div className="flex items-center justify-center gap-[8px]">
          <Text typography="question" color="accent">
            Q.
          </Text>
          <Text typography="question">다음 중 이동을 원하는 페이지는?</Text>
        </div>
        <div className="flex flex-col gap-[8px]">
          <RedirectOption
            order="A"
            label="픽토스 홈으로 돌아가기"
            onClick={() => router.replace('/main')}
          />
          <RedirectOption order="B" label="이전 페이지로 돌아가기" onClick={() => router.back()} />
        </div>
      </div>
    </div>
  )
}

function RedirectOption({
  onClick,
  order,
  label,
}: {
  onClick: () => void
  order: string
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-[16px] rounded-[12px] bg-white px-[11px] py-[9px] text-start text-subtitle2-medium text-gray-800"
    >
      <Text
        typography="subtitle2-bold"
        className="flex size-[36px] items-center justify-center rounded-full bg-gray-100 text-gray-500"
      >
        {order}
      </Text>
      <Text>{label}</Text>
    </button>
  )
}

function NotFoundIcon({ className }: { className?: HTMLElement['className'] }) {
  return (
    <svg className={className} viewBox="0 0 341 215" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.6369 0C94.8431 0 90.957 3.88611 90.957 8.67987V36.8895C90.957 41.6832 94.8432 45.5693 99.6369 45.5693H146.508L161.176 57.7926C162.589 58.9704 164.735 57.9653 164.735 56.1256L164.735 45.5693H166.906C171.7 45.5693 175.586 41.6832 175.586 36.8895V8.67987C175.586 3.88611 171.7 0 166.906 0H99.6369Z"
        fill="#D2D6DB"
      />
      <path
        d="M103.979 13.02L162.568 13.02"
        stroke="#F5F7F9"
        strokeWidth="4.33994"
        strokeLinecap="round"
      />
      <path
        d="M103.979 21.7007L162.568 21.7007"
        stroke="#F5F7F9"
        strokeWidth="4.33994"
        strokeLinecap="round"
      />
      <path
        d="M103.979 30.3794L130.018 30.3794"
        stroke="#F5F7F9"
        strokeWidth="4.33994"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3594 58.6963C7.77191 58.6963 -0.000305176 66.4685 -0.000305176 76.056V98.4964C-0.000305176 108.084 7.77193 115.856 17.3595 115.856H100.518L125.694 127.191C127.416 127.966 129.238 126.324 128.646 124.532L122.904 107.143C124.369 104.597 125.207 101.645 125.207 98.4965V76.056C125.207 66.4685 117.435 58.6963 107.847 58.6963H17.3594Z"
        fill="#D2D6DB"
      />
      <circle
        cx="4.08285"
        cy="4.08285"
        r="4.08285"
        transform="matrix(-1 0 0 1 87.0977 83.1938)"
        fill="#F5F7F9"
      />
      <circle
        cx="4.08285"
        cy="4.08285"
        r="4.08285"
        transform="matrix(-1 0 0 1 65.3242 83.1938)"
        fill="#F5F7F9"
      />
      <circle
        cx="4.08285"
        cy="4.08285"
        r="4.08285"
        transform="matrix(-1 0 0 1 43.5508 83.1938)"
        fill="#F5F7F9"
      />
      <path
        d="M316.084 28.6275C316.084 28.6275 315.869 28.6621 315.772 28.7038C271.268 39.9973 223.873 55.7254 188.822 86.8273C173.93 100.066 162.086 117.312 160.856 137.785C158.932 169.809 183.224 197.326 215.109 199.241C228.235 200.03 241.4 196.236 252.126 188.567C262.432 181.181 269.454 170.201 275.174 158.834C284.014 141.217 308.588 93.1672 308.588 93.1672C309.443 91.5321 307.828 89.6773 306.108 90.3578C297.964 92.0776 279.7 97.6789 272.713 101.772C271.757 102.333 270.606 101.408 270.93 100.359C274.031 90.0698 281.114 80.0436 286.694 71.4C296.006 56.9471 306.496 43.7526 318.333 31.3518C318.711 30.9706 319.093 30.5185 319.125 29.9741C319.203 28.6724 317.421 28.4228 316.083 28.6512L316.084 28.6275Z"
        fill="#EAECEF"
      />
      <circle
        cx="42.502"
        cy="42.502"
        r="42.502"
        transform="matrix(1 0 0.000990467 1 176.648 101.305)"
        fill="#D2D6DB"
      />
      <path
        d="M144.637 71.9491C149.243 63.9718 160.757 63.9717 165.363 71.9491L212.187 153.051C216.793 161.028 211.036 171 201.824 171H108.176C98.9644 171 93.2072 161.028 97.813 153.051L144.637 71.9491Z"
        fill="#FF9100"
      />
      <path
        d="M160.143 99.4287L158.949 135.279H151.251L149.857 99.4287H160.143ZM150.654 145.685C150.654 143.338 152.246 141.434 155.1 141.434C158.02 141.434 159.546 143.338 159.546 145.685C159.546 148.097 158.02 150 155.1 150C152.246 150 150.654 148.097 150.654 145.685Z"
        fill="#F5F7F9"
      />
    </svg>
  )
}
