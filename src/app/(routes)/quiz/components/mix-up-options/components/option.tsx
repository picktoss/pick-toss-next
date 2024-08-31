'use client'

import { cn } from '@/shared/lib/utils'
import { QuizProgress } from '../../../types'
import { motion } from 'framer-motion'

interface MixUpOptionProps {
  variant: 'correct' | 'incorrect'
  progress: QuizProgress['progress']
  isCorrect: boolean | null
  onClick: () => void
}

export default function MixUpOption({ variant, progress, isCorrect, onClick }: MixUpOptionProps) {
  return (
    <motion.button
      className={cn(
        'flex h-[126px] flex-1 max-w-[165px] lg:max-w-[215px] items-center justify-center rounded-[16px] lg:h-[144px]',
        variant === 'correct' ? 'bg-blue-05' : 'bg-orange-05',
        progress === 'result' && !isCorrect && 'bg-gray-04'
      )}
      onClick={onClick}
      disabled={progress !== 'idle'}
      layout
    >
      {variant === 'correct' ? <CircleIcon /> : <XIcon />}
    </motion.button>
  )
}

function CircleIcon() {
  return (
    <svg width="83" height="82" viewBox="0 0 83 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M75.7496 41C75.7496 59.5695 60.5083 74.75 41.5496 74.75C22.591 74.75 7.34961 59.5695 7.34961 41C7.34961 22.4305 22.591 7.25 41.5496 7.25C60.5083 7.25 75.7496 22.4305 75.7496 41Z"
        stroke="white"
        strokeWidth="13.5"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 60.2345L60.2345 7"
        stroke="white"
        strokeWidth="12.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60.2344 60.2345L6.99989 7"
        stroke="white"
        strokeWidth="12.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
