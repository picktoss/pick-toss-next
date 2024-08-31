'use client'

import { Button } from '@/shared/components/ui/button'
import { msToElapsedTime } from '@/utils/time'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SolvingData } from '../types'
import { useMemo } from 'react'
import { getCurrentDate } from '@/utils/date'

type Result = SolvingData[number] & { category: { id: number; name: string } }

interface CategoryDetailResult {
  name: string
  correct: number
  total: number
}

interface Props {
  totalElapsedTime: number
  isTodayQuiz: boolean
  results: Result[]
  reward: number | null
}

export default function QuizResult({ totalElapsedTime, isTodayQuiz, results, reward }: Props) {
  const router = useRouter()

  const categoryDetailResults = useMemo(() => {
    const { categoryMap, totalCorrect, totalQuestions } = results.reduce(
      (acc, result: Result) => {
        const categoryName = result.category.name

        if (!acc.categoryMap[categoryName]) {
          acc.categoryMap[categoryName] = {
            name: categoryName,
            correct: 0,
            total: 0,
          }
        }

        acc.categoryMap[categoryName].total += 1
        if (result.answer) {
          acc.categoryMap[categoryName].correct += 1
          acc.totalCorrect += 1
        }

        acc.totalQuestions += 1

        return acc
      },
      {
        categoryMap: {} as { [key: string]: CategoryDetailResult },
        totalCorrect: 0,
        totalQuestions: 0,
      }
    )

    const details = Object.values(categoryMap)
    const score = Math.round((totalCorrect / totalQuestions) * 100)

    return { score, details }
  }, [results])

  return (
    <div className="mt-[45px] flex flex-col items-center gap-[24px] pb-[86px]">
      <div className="flex h-[58px] flex-col items-center justify-end gap-[8px]">
        {isTodayQuiz && <div className="text-body1-medium text-gray-07">{getCurrentDate()}</div>}
        <div className="relative flex h-[30.76px] items-end">
          <div className="text-h3-bold text-gray-08">
            {isTodayQuiz ? '오늘의 퀴즈 완료!' : '퀴즈 완료!'}
          </div>
          <div className="absolute right-[-34px]">
            <FireworkIcon />
          </div>
        </div>
      </div>
      <div className="w-[335px] rounded-[16px] bg-white pb-[16px] pt-[45px]">
        <motion.div
          className="flex flex-col"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.2 },
          }}
        >
          <div className="flex flex-col items-center gap-[8px]">
            <BadgeIcon />
            <div className="text-h1 text-gray-08">{categoryDetailResults.score || 0}점</div>
            <div className="flex items-center gap-[8px] rounded-[16px] bg-orange-01 px-[13px] py-[2px]">
              <TimerIcon />
              <div className="text-small1-bold text-orange-06">
                {msToElapsedTime(totalElapsedTime)}
              </div>
            </div>
          </div>
          <div className="mb-[16px] mt-[19px] h-px w-full rounded-full bg-gray-01 px-[16px]" />
          <div className="mb-[43px] flex flex-col gap-[24px] px-[24px]">
            <div className="text-body1-bold text-gray-08">폴더별 상세</div>
            <div className="flex flex-col gap-[16px]">
              {categoryDetailResults.details.map((detail) => (
                <div key={detail.name} className="flex flex-col gap-[8px]">
                  <div className="flex items-center justify-between">
                    <div className="text-body2-medium text-gray-08">{detail.name}</div>
                    <div className="text-body2-bold text-orange-04">
                      {detail.correct}/{detail.total}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-[4px] rounded-[9.5px] bg-gray-02" />
                    <div
                      className="absolute bottom-0 h-[4px] rounded-[9.5px] bg-orange-04"
                      style={{
                        width: `${(detail.correct / detail.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-[12px]">
            <Button
              className="w-full"
              onClick={() => router.replace(isTodayQuiz ? `/main?reward=${reward}` : '/main')}
            >
              확인
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FireworkIcon() {
  return (
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.28675 24.8996C7.90913 25.4733 6.50037 24.15 6.98686 22.7392L11.3477 10.0929C11.6878 9.10683 12.8168 8.64388 13.7513 9.10738L18.8799 11.6513C19.1855 11.8028 19.4394 12.0413 19.6097 12.3368L22.4692 17.2965C22.9902 18.2001 22.5987 19.3559 21.6358 19.7569L9.28675 24.8996Z"
        fill="#95B0F8"
      />
      <ellipse
        cx="17.2762"
        cy="14.0902"
        rx="7.35033"
        ry="3.02661"
        transform="rotate(43.2085 17.2762 14.0902)"
        fill="url(#paint0_linear_2396_1900)"
      />
      <path
        d="M19.9998 20.2501C18.994 20.6894 12.0004 21.0002 9.50006 16.5002"
        stroke="#577CFF"
        strokeWidth="1.00001"
        strokeLinecap="round"
      />
      <path
        d="M14.9555 22.4601C13.9496 22.8994 9.99975 23.7501 7.75041 21"
        stroke="#577CFF"
        strokeWidth="1.00001"
        strokeLinecap="round"
      />
      <path
        d="M31.5529 14.1221C31.6451 13.9593 31.8549 13.9593 31.9471 14.1221L32.3036 14.752C32.3186 14.7785 32.3376 14.8018 32.3598 14.8207L32.9067 15.2879C33.0311 15.3941 33.0311 15.6059 32.9067 15.7121L32.3598 16.1793C32.3376 16.1982 32.3186 16.2215 32.3036 16.248L31.9471 16.8779C31.8549 17.0407 31.6451 17.0407 31.5529 16.8779L31.1964 16.248C31.1814 16.2215 31.1624 16.1982 31.1402 16.1793L30.5933 15.7121C30.4689 15.6059 30.4689 15.3941 30.5933 15.2879L31.1402 14.8207C31.1624 14.8018 31.1814 14.7785 31.1964 14.752L31.5529 14.1221Z"
        fill="#FFD180"
      />
      <path
        d="M29.4741 10.1628C29.6031 9.94572 29.8969 9.94572 30.0259 10.1628L30.525 11.0027C30.546 11.038 30.5727 11.0691 30.6037 11.0943L31.3694 11.7172C31.5436 11.8588 31.5436 12.1412 31.3694 12.2828L30.6037 12.9057C30.5727 12.931 30.546 12.962 30.525 12.9973L30.0259 13.8372C29.8969 14.0543 29.6031 14.0543 29.4741 13.8372L28.975 12.9973C28.954 12.962 28.9274 12.931 28.8963 12.9057L28.1306 12.2828C27.9565 12.1412 27.9565 11.8588 28.1306 11.7172L28.8963 11.0943C28.9274 11.0691 28.954 11.038 28.975 11.0027L29.4741 10.1628Z"
        fill="#FFD180"
      />
      <path
        d="M15.8883 12.359C15.0411 11.5227 14.9933 9.97105 16.9195 8.70778C19.3939 7.08501 18.1569 5.86796 17.7543 5.31257C17.2608 4.63165 15.8883 3.63667 18.3629 0.99975"
        stroke="#577CFF"
        strokeWidth="1.50001"
        strokeLinecap="round"
      />
      <path
        d="M18.1483 11.897C18.1658 10.7163 19.2619 9.59973 21.5258 10.0754C24.4339 10.6865 24.4566 8.96546 24.5799 8.29416C24.7311 7.47116 24.4976 5.8097 28.1441 5.71308"
        stroke="#95B0F8"
        strokeWidth="1.50001"
        strokeLinecap="round"
      />
      <path
        d="M19.3417 17.1695C23.1578 14.3157 26.5785 16.5908 27.1577 18.3273"
        stroke="#FB7E20"
        strokeWidth="1.50001"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2396_1900"
          x1="17.2762"
          y1="11.0636"
          x2="17.2762"
          y2="17.1169"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA049" />
          <stop offset="1" stopColor="#FFE5CD" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BadgeIcon() {
  return (
    <svg
      width="72"
      height="108"
      viewBox="0 0 72 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8567 51.2998H50.1424V101.443L35.9995 93.0855L21.8567 101.443V51.2998Z"
        fill="url(#paint0_linear_2672_5472)"
      />
      <path
        d="M34.3729 7.62366C35.3206 6.85269 36.6794 6.85269 37.6271 7.62366L43.024 12.0139C43.594 12.4776 44.3347 12.6761 45.0601 12.5595L51.9291 11.4559C53.1353 11.2621 54.312 11.9414 54.7473 13.083L57.226 19.5835C57.4878 20.27 58.03 20.8123 58.7165 21.074L65.2171 23.5528C66.3586 23.988 67.038 25.1647 66.8442 26.371L65.7405 33.2399C65.624 33.9654 65.8224 34.7061 66.2861 35.2761L70.6764 40.673C71.4474 41.6207 71.4474 42.9794 70.6764 43.9271L66.2861 49.324C65.8224 49.894 65.624 50.6347 65.7405 51.3601L66.8442 58.2291C67.038 59.4354 66.3586 60.6121 65.2171 61.0473L58.7165 63.5261C58.03 63.7878 57.4878 64.3301 57.226 65.0166L54.7473 71.5171C54.312 72.6587 53.1353 73.338 51.9291 73.1442L45.0601 72.0406C44.3347 71.924 43.594 72.1225 43.024 72.5862L37.6271 76.9764C36.6794 77.7474 35.3206 77.7474 34.3729 76.9764L28.976 72.5862C28.406 72.1225 27.6653 71.924 26.9399 72.0406L20.0709 73.1442C18.8647 73.338 17.688 72.6587 17.2527 71.5171L14.774 65.0166C14.5122 64.3301 13.97 63.7878 13.2835 63.5261L6.78291 61.0473C5.64137 60.6121 4.96201 59.4354 5.15582 58.2291L6.25947 51.3601C6.37602 50.6347 6.17755 49.894 5.71389 49.324L1.32361 43.9271C0.552644 42.9794 0.552643 41.6207 1.32361 40.673L5.71389 35.2761C6.17755 34.7061 6.37602 33.9654 6.25947 33.2399L5.15582 26.371C4.96201 25.1647 5.64137 23.988 6.78291 23.5528L13.2835 21.074C13.97 20.8123 14.5122 20.27 14.774 19.5835L17.2527 13.083C17.688 11.9414 18.8647 11.2621 20.0709 11.4559L26.9399 12.5595C27.6653 12.6761 28.406 12.4776 28.976 12.0139L34.3729 7.62366Z"
        fill="#577CFF"
      />
      <circle cx="35.9992" cy="42.3002" r="25.7143" fill="#95B0F8" />
      <path
        d="M25.7134 42.992L31.3664 49.1386C32.42 50.2842 34.2406 50.2422 35.2403 49.0494L46.2848 35.8713"
        stroke="#F5F7F9"
        strokeWidth="5.15676"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2672_5472"
          x1="35.9995"
          y1="79.5855"
          x2="35.9995"
          y2="101.443"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD180" />
          <stop offset="1" stopColor="#FF9635" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.99805" y="2.49805" width="2" height="2" rx="0.416667" fill="#FFAB40" />
      <circle cx="10" cy="11.457" r="7.5" fill="#FFECD0" />
      <circle cx="10" cy="11.457" r="6.97917" stroke="#FF9100" strokeWidth="1.04167" />
      <path
        d="M16.2071 4.55574C15.8166 4.16521 15.1834 4.16522 14.7929 4.55574L13.8545 5.4941L15.6586 7.29818L16.597 6.35982C16.9875 5.96929 16.9875 5.33613 16.597 4.9456L16.2071 4.55574Z"
        fill="#FF9100"
      />
      <g filter="url(#filter0_f_2672_5555)">
        <path
          d="M10 6.45703C9.17775 6.45703 8.36818 6.65982 7.64302 7.04742C6.91785 7.43503 6.29947 7.9955 5.84265 8.67918C5.38583 9.36286 5.10467 10.1486 5.02408 10.9669C4.94348 11.7852 5.06594 12.6108 5.3806 13.3704C5.69527 14.1301 6.19242 14.8005 6.82803 15.3221C7.46364 15.8437 8.21809 16.2005 9.02455 16.361C9.831 16.5214 10.6646 16.4804 11.4514 16.2417C12.2383 16.003 12.9541 15.574 13.5355 14.9926L10 11.457V6.45703Z"
          fill="#FFD180"
        />
      </g>
      <rect x="7.91602" y="1.04004" width="4.16667" height="2.08333" rx="0.416667" fill="#FF9100" />
      <defs>
        <filter
          id="filter0_f_2672_5555"
          x="4"
          y="5.45703"
          width="10.5356"
          height="12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_2672_5555" />
        </filter>
      </defs>
    </svg>
  )
}
