'use client'

import { SVGProps } from 'react'

interface OXChoiceProps {
  condition: Exclude<Quiz.Condition, 'DISABLED'>
  userAnswer?: Quiz.OXAnswer
  onSelect: (userAnswer: Quiz.OXAnswer) => void
}

const OXChoice = ({ condition, userAnswer, onSelect }: OXChoiceProps) => {
  const disabled = condition === 'RIGHT' || condition === 'WRONG'

  const getIconColors = (type: Quiz.OXAnswer) => {
    const defaultColors = {
      bg: type === 'correct' ? '#4D7BF9' : '#FB8320', // 기본 배경색
      fill: 'white', // 기본 채우기색
    }

    if (condition === 'IDLE') {
      return defaultColors
    }

    if (condition === 'RIGHT') {
      return {
        bg: type === userAnswer ? '#e6f7e3' : '#ebeff3',
        fill: type === userAnswer ? '#3acc83' : 'white',
      }
    }

    if (condition === 'WRONG') {
      return {
        bg: type !== userAnswer ? '#e6f7e3' : '#ebeff3',
        fill: type !== userAnswer ? '#3acc83' : '#f4502c',
      }
    }

    return defaultColors
  }

  return (
    <div className="flex w-full gap-[13px] transition-all">
      <button
        id="correctBtn"
        className="flex-1"
        disabled={disabled}
        onClick={() => {
          onSelect('correct')
        }}
      >
        <CorrectOptionIcon className="size-full" {...getIconColors('correct')} />
      </button>
      <button
        id="incorrectBtn"
        className="flex-1"
        disabled={disabled}
        onClick={() => {
          onSelect('incorrect')
        }}
      >
        <WrongOptionIcon className="size-full" {...getIconColors('incorrect')} />
      </button>
    </div>
  )
}

export default OXChoice

interface IconProps extends SVGProps<SVGSVGElement> {
  bg?: string
  fill?: string
}

const CorrectOptionIcon = ({ bg, fill, ...props }: IconProps) => {
  return (
    <svg
      width="165"
      height="126"
      viewBox="0 0 165 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 20C0 8.9543 8.95431 0 20 0H145C156.046 0 165 8.95431 165 20V106C165 117.046 156.046 126 145 126H20C8.95431 126 0 117.046 0 106V20Z"
        fill={bg ?? '#4D7BF9'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.5 88.6667C97.0726 88.6667 108.643 77.042 108.643 63C108.643 48.958 97.0726 37.3333 82.5 37.3333C67.9274 37.3333 56.3571 48.958 56.3571 63C56.3571 77.042 67.9274 88.6667 82.5 88.6667ZM82.5 101.5C104.039 101.5 121.5 84.263 121.5 63C121.5 41.737 104.039 24.5 82.5 24.5C60.9609 24.5 43.5 41.737 43.5 63C43.5 84.263 60.9609 101.5 82.5 101.5Z"
        fill={fill ?? 'white'}
      />
    </svg>
  )
}

const WrongOptionIcon = ({ bg, fill, ...props }: IconProps) => {
  return (
    <svg
      width="165"
      height="126"
      viewBox="0 0 165 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 20C0 8.9543 8.95431 0 20 0H145C156.046 0 165 8.95431 165 20V106C165 117.046 156.046 126 145 126H20C8.95431 126 0 117.046 0 106V20Z"
        fill={bg ?? '#FB8320'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M112.575 35.5204C114.137 37.0825 114.137 39.6152 112.575 41.1773L60.6785 93.0741C59.1164 94.6362 56.5837 94.6362 55.0216 93.0741L52.4271 90.4795C50.865 88.9174 50.865 86.3848 52.4271 84.8227L104.324 32.9258C105.886 31.3637 108.419 31.3637 109.981 32.9258L112.575 35.5204Z"
        fill={fill ?? 'white'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.4257 35.5204C50.8636 37.0825 50.8636 39.6152 52.4257 41.1773L104.322 93.0741C105.885 94.6362 108.417 94.6362 109.979 93.0741L112.574 90.4795C114.136 88.9174 114.136 86.3848 112.574 84.8227L60.6771 32.9258C59.115 31.3637 56.5823 31.3637 55.0202 32.9258L52.4257 35.5204Z"
        fill={fill ?? 'white'}
      />
    </svg>
  )
}
