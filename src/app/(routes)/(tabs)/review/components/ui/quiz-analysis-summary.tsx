import { msToMin } from '@/utils/time'

interface Props {
  elapsedTime: number
  totalQuizCount: number
  correctAnswerCount: number
}

export function QuizAnalysisSummary({ elapsedTime, totalQuizCount, correctAnswerCount }: Props) {
  const correctRate = Math.round((correctAnswerCount / totalQuizCount) * 100)

  return (
    <div className="flex rounded-[12px] border py-[19px]">
      <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
        <QuizIcon />
        <div className="text-small1-regular text-gray-06">퀴즈 수</div>
        <div className="text-body1-bold text-gray-08">{totalQuizCount}개</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
        <TimerIcon />
        <div className="text-small1-regular text-gray-06">소요시간</div>
        <div className="text-body1-bold text-gray-08">{Math.ceil(msToMin(elapsedTime))}분</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-[4px] border-r border-gray-02 last:border-none">
        <CorrectIcon />
        <div className="text-small1-regular text-gray-06">정답률</div>
        <div className="text-body1-bold text-gray-08">{correctRate}%</div>
      </div>
    </div>
  )
}

function QuizIcon() {
  return (
    <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.437 12.3408C31.6091 12.3408 34.9914 15.723 34.9914 19.8952V24.7421C34.9914 28.9143 31.6091 32.2965 27.437 32.2965H15.5196L10.0277 37.3307C9.42204 37.8859 8.44533 37.4563 8.44532 36.6346L8.44532 32.1496C4.9867 31.4578 2.38086 28.4043 2.38086 24.7421V19.8952C2.38086 15.723 5.76308 12.3408 9.93526 12.3408H27.437Z"
        fill="#95B0F8"
      />
      <circle cx="11.5844" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <circle cx="19.1391" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <circle cx="26.6928" cy="22.2582" r="1.41645" fill="#F5F7F9" />
      <path
        d="M38.4783 13.1215C38.6953 12.7381 39.1894 12.7381 39.4064 13.1215L40.2459 14.6048C40.2812 14.6672 40.326 14.7219 40.3782 14.7665L41.6661 15.8665C41.9589 16.1167 41.9589 16.6153 41.6661 16.8655L40.3782 17.9655C40.326 18.0101 40.2812 18.0648 40.2459 18.1272L39.4064 19.6105C39.1894 19.9939 38.6953 19.9939 38.4783 19.6105L37.6389 18.1272C37.6036 18.0648 37.5588 18.0101 37.5066 17.9655L36.2187 16.8655C35.9258 16.6153 35.9258 16.1167 36.2187 15.8665L37.5066 14.7665C37.5588 14.7219 37.6036 14.6672 37.6389 14.6048L38.4783 13.1215Z"
        fill="#FFAB40"
      />
      <path
        d="M33.5814 3.79943C33.8851 3.28821 34.5769 3.28821 34.8807 3.79943L36.0559 5.77708C36.1054 5.86025 36.1681 5.93327 36.2412 5.99272L38.0442 7.45942C38.4542 7.79296 38.4542 8.45779 38.0442 8.79133L36.2412 10.258C36.1681 10.3175 36.1054 10.3905 36.0559 10.4737L34.8807 12.4513C34.5769 12.9625 33.8851 12.9625 33.5814 12.4513L32.4061 10.4737C32.3567 10.3905 32.294 10.3175 32.2209 10.258L30.4179 8.79133C30.0078 8.45779 30.0078 7.79296 30.4179 7.45942L32.2209 5.99272C32.294 5.93327 32.3567 5.86025 32.4061 5.77708L33.5814 3.79943Z"
        fill="#FFAB40"
      />
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="5.00195" width="4" height="4" rx="0.833333" fill="#FFAB40" />
      <circle cx="20" cy="22.916" r="15" fill="#FFECD0" />
      <circle cx="20" cy="22.916" r="13.9583" stroke="#FF9100" strokeWidth="2.08333" />
      <path
        d="M32.4123 9.11441C31.6312 8.33336 30.3649 8.33336 29.5838 9.11441L27.7071 10.9911L31.3153 14.5993L33.192 12.7226C33.973 11.9415 33.973 10.6752 33.192 9.89414L32.4123 9.11441Z"
        fill="#FF9100"
      />
      <g filter="url(#filter0_f_2837_5401)">
        <path
          d="M20 12.916C18.3555 12.916 16.7364 13.3216 15.286 14.0968C13.8357 14.872 12.5989 15.993 11.6853 17.3603C10.7717 18.7277 10.2093 20.2993 10.0482 21.9358C9.88696 23.5724 10.1319 25.2235 10.7612 26.7428C11.3905 28.2622 12.3848 29.6029 13.6561 30.6461C14.9273 31.6894 16.4362 32.403 18.0491 32.7239C19.662 33.0447 21.3291 32.9628 22.9028 32.4854C24.4765 32.008 25.9082 31.1499 27.0711 29.9871L20 22.916V12.916Z"
          fill="#FFD180"
        />
      </g>
      <rect x="15.832" y="2.08398" width="8.33333" height="4.16667" rx="0.833333" fill="#FF9100" />
      <defs>
        <filter
          id="filter0_f_2837_5401"
          x="8"
          y="10.916"
          width="21.0713"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2837_5401" />
        </filter>
      </defs>
    </svg>
  )
}

function CorrectIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20.625" r="16.875" fill="#63CF75" />
      <path
        d="M13.7305 19.8887L18.8669 25.3134L26.8569 16.875"
        stroke="#F5F7F9"
        strokeWidth="2.81244"
        strokeLinecap="round"
      />
    </svg>
  )
}
