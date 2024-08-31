import { getCurrentDate } from '@/utils/date'
import { motion } from 'framer-motion'
import { msToElapsedTime } from '@/utils/time'
import { cn } from '@/shared/lib/utils'
import { QuizType } from '@/apis/types/dto/quiz.dto'
import ProgressBar from '../../components/progress-bar'

interface QuestionProps {
  question: string
  curQuizIndex: number
  totalQuizCount: number
  totalElapsedTime: number
  quizType: QuizType
}

export default function ExampleQuestion({
  question,
  curQuizIndex,
  totalQuizCount,
  totalElapsedTime,
  quizType,
}: QuestionProps) {
  return (
    <div key={curQuizIndex} className="w-full px-[20px]">
      <ProgressBar curQuizIndex={curQuizIndex} totalQuizCount={totalQuizCount} />
      <DesktopExtraInfo
        totalElapsedTime={totalElapsedTime}
        quizType={quizType}
        className="hidden lg:flex"
      />
      <div className="lg:flex lg:justify-center lg:bg-white">
        <div className="flex w-full rounded-b-[12px] bg-white px-[20px] pb-[40px] pt-[32px] lg:justify-center lg:pb-0 lg:pt-[39px]">
          <motion.div
            className="flex w-full max-w-[680px] flex-col gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-small1-regular text-gray-07 lg:text-body2-regular">
              폴더 이름 {'>'} 문서 이름
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="mt-[-4px] text-h3-bold text-orange-06 lg:mt-[-5px] lg:text-h2-bold-eng">
                Q
              </div>
              <div className="text-h4-bold text-gray-09 lg:text-h3-bold">{question}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function DesktopExtraInfo({
  totalElapsedTime,
  quizType,
  className,
}: {
  totalElapsedTime: number
  quizType: QuizType
  className: HTMLElement['className']
}) {
  const quizSort = quizType === 'MIX_UP' ? 'O/X 퀴즈' : '객관식 퀴즈'

  return (
    <div className={cn('h-[72px] justify-between border-b border-gray-02 lg:bg-white', className)}>
      <div className="mt-[14px] pl-[24px]">
        <div className="text-h4-bold text-gray-07">{quizSort}</div>
        <div className="mt-[4px] text-body2-medium text-gray-06">
          {getCurrentDate({ month: true, day: true })}
        </div>
      </div>
      <div className="flex">
        <div className="mt-[13px] h-[48px] w-px rounded-full bg-gray-02" />
        <div className="mt-[17px] pl-[25px] pr-[37px]">
          <div className="flex gap-[8px]">
            <TimerIcon className="h-[35.8px] w-[30px]" />
            <div className="flex w-[70px] flex-col gap-[2px] text-gray-07">
              <span className="text-small1-regular">소요시간</span>
              <span className="text-body1-medium">{msToElapsedTime(totalElapsedTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimerIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8.00049" y="2" width="2" height="2.25" rx="0.5" fill="#FFAB40" />
      <circle cx="9" cy="12.75" r="9" fill="#FFECD0" />
      <circle cx="9" cy="12.75" r="8.375" stroke="#FF9100" strokeWidth="1.25" />
      <path
        d="M16.1117 4.13219C15.8286 3.84911 15.3696 3.84911 15.0866 4.13219L13.6246 5.59419L15.1753 7.14497L16.6373 5.68297C16.9204 5.39989 16.9204 4.94093 16.6373 4.65785L16.1117 4.13219Z"
        fill="#FF9100"
      />
      <path
        d="M1.7892 4.13219C2.07228 3.84911 2.53124 3.84911 2.81432 4.13219L4.27632 5.59419L2.72554 7.14497L1.26353 5.68297C0.980457 5.39989 0.980456 4.94093 1.26353 4.65785L1.7892 4.13219Z"
        fill="#FF9100"
      />
      <g filter="url(#filter0_f_2672_5384)">
        <path
          d="M9 6.75C8.01329 6.75 7.04182 6.99334 6.17162 7.45847C5.30142 7.9236 4.55937 8.59616 4.01118 9.41658C3.463 10.237 3.12561 11.1799 3.02889 12.1619C2.93218 13.1439 3.07913 14.1345 3.45672 15.0461C3.83432 15.9577 4.43091 16.7621 5.19364 17.3881C5.95637 18.014 6.86171 18.4422 7.82946 18.6347C8.7972 18.8272 9.79749 18.7781 10.7417 18.4916C11.6859 18.2052 12.5449 17.6903 13.2426 16.9926L9 12.75V6.75Z"
          fill="#FFD180"
        />
      </g>
      <rect x="6.50049" y="0.249756" width="5" height="2.5" rx="0.5" fill="#FF9100" />
      <defs>
        <filter
          id="filter0_f_2672_5384"
          x="1.8"
          y="5.55"
          width="12.6427"
          height="14.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.6" result="effect1_foregroundBlur_2672_5384" />
        </filter>
      </defs>
    </svg>
  )
}
