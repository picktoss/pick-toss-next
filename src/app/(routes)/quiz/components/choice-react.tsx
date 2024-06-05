import QuizFireworks from './quiz-fireworks'
import Lottie from 'react-lottie-player'
import rightData from '../../../../../public/lottie/right.json'
import { HTMLAttributes } from 'react'

interface Props {
  duration: number
  condition: boolean
  isCorrect: boolean
}

export function ChoiceReact({ duration, condition, isCorrect }: Props) {
  return (
    <>
      {isCorrect && <QuizFireworks duration={duration} />}
      {condition && (
        <div className="center absolute flex size-[80px] items-center justify-center overflow-hidden">
          {isCorrect ? (
            <Lottie animationData={rightData} play={condition && isCorrect} speed={1.2} />
          ) : (
            <InCorrectIcon className="size-[80px]" />
          )}
        </div>
      )}
    </>
  )
}

function InCorrectIcon({ className }: { className?: HTMLAttributes<HTMLElement>['className'] }) {
  return (
    <svg
      width="80"
      height="80"
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="40" fill="#F66444" />
      <path
        d="M26.6665 26.6665L53.3332 53.3332"
        stroke="white"
        strokeWidth="6.66667"
        strokeLinecap="round"
      />
      <path
        d="M53.3335 26.6665L26.6668 53.3332"
        stroke="white"
        strokeWidth="6.66667"
        strokeLinecap="round"
      />
    </svg>
  )
}
