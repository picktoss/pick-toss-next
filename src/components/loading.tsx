'use client'

import Lottie from 'react-lottie-player'
import loadCirclesData from '../../public/lottie/load-circles.json'
import sparkleData from '../../public/lottie/sparkle.json'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  center?: boolean
  size?: 'small' | 'large'
}

export default function Loading({ center, size = 'small', className }: Props) {
  return (
    <div className={cn(center ? 'center' : className)}>
      <div
        className={cn(
          'relative overflow-hidden z-50',
          size === 'large' ? 'size-[262px]' : 'size-[104.5px]'
        )}
      >
        <Lottie
          loop
          animationData={loadCirclesData}
          play
          speed={0.8}
          className="center absolute"
          style={{
            width: size === 'large' ? 262 : 104.5,
            height: size === 'large' ? 262 : 104.5,
          }}
        />
        <Lottie
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
