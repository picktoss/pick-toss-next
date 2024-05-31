'use client'

import Lottie from 'react-lottie-player'
import loadCirclesData from '../../public/lottie/load-circles.json'
import sparkleData from '../../public/lottie/sparkle.json'
import { HTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  center?: boolean
  size?: 'small' | 'large'
}

export default function Loading({ center, size = 'small', className }: Props) {
  const [isCirclesDataLoaded, setIsCirclesDataLoaded] = useState(false)
  const [isSparkleDataLoaded, setIsSparkleDataLoaded] = useState(false)

  const isReady = isCirclesDataLoaded && isSparkleDataLoaded

  return (
    <div className={cn(center ? 'center' : className)}>
      {!isReady && (
        <LoadingSkeletonIcon className={cn(size === 'large' ? 'size-[262px]' : 'size-[104.5px]')} />
      )}
      <div
        className={cn('relative overflow-hidden', !isReady && 'hidden')}
        style={{
          width: size === 'large' ? 262 : 104.5,
          height: size === 'large' ? 262 : 104.5,
        }}
      >
        <Lottie
          onLoad={() => setIsCirclesDataLoaded(true)}
          loop
          animationData={loadCirclesData}
          play
          speed={0.8}
          className="center absolute"
          style={{
            width: size === 'large' ? 600 : 240,
            height: size === 'large' ? 600 : 240,
          }}
        />
        <Lottie
          onLoad={() => setIsSparkleDataLoaded(true)}
          loop
          animationData={sparkleData}
          play
          className="absolute"
          style={{
            width: size === 'large' ? 56 : 22.4,
            height: size === 'large' ? 80 : 32,
            top: size === 'large' ? 67 : 26.7,
            right: size === 'large' ? 55 : 22,
          }}
        />
      </div>
    </div>
  )
}

function LoadingSkeletonIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      viewBox="0 0 262 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="53.5109"
        cy="53.5109"
        r="53.5109"
        transform="matrix(1 0 0.000990467 1 75.9688 94.9785)"
        fill="#FFAB40"
      />
      <circle cx="150" cy="41" r="26" fill="#FFAB40" />
      <circle cx="229" cy="202" r="33" fill="#95B0F8" />
      <circle cx="16.5" cy="155.5" r="16.5" fill="#FFD180" />
      <path
        d="M193.002 77.8956C193.703 76.7015 195.297 76.7015 195.998 77.8956L198.707 82.5149C198.821 82.7092 198.966 82.8797 199.134 83.0186L203.291 86.4445C204.236 87.2236 204.236 88.7764 203.291 89.5555L199.134 92.9814C198.966 93.1203 198.821 93.2908 198.707 93.4851L195.998 98.1044C195.297 99.2985 193.703 99.2985 193.002 98.1044L190.293 93.4851C190.179 93.2908 190.034 93.1203 189.866 92.9814L185.709 89.5555C184.764 88.7764 184.764 87.2236 185.709 86.4445L189.866 83.0186C190.034 82.8797 190.179 82.7092 190.293 82.5149L193.002 77.8956Z"
        fill="#FFE1AC"
      />
      <path
        d="M175.426 99.5022C176.863 97.2571 180.137 97.2571 181.575 99.5022L187.136 108.187C187.37 108.553 187.667 108.873 188.012 109.134L196.545 115.576C198.485 117.04 198.485 119.96 196.545 121.425L188.012 127.866C187.667 128.127 187.37 128.448 187.136 128.813L181.575 137.498C180.137 139.743 176.863 139.743 175.426 137.498L169.864 128.813C169.63 128.448 169.334 128.127 168.988 127.866L160.455 121.425C158.515 119.96 158.515 117.04 160.455 115.576L168.988 109.134C169.334 108.873 169.63 108.553 169.864 108.187L175.426 99.5022Z"
        fill="#FFE1AC"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3478_1341"
          x1="53.5109"
          y1="0"
          x2="53.5109"
          y2="107.022"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF9C28" />
          <stop offset="1" stop-color="#FFD298" />
        </linearGradient>
      </defs>
    </svg>
  )
}
