'use client'

import Lottie from 'react-lottie-player'
import multipleHoverData from '../../../../../../public/lottie/multiple-hover.json'
import oxHoverData from '../../../../../../public/lottie/ox-hover.json'
import blankHoverData from '../../../../../../public/lottie/blank-hover.json'
import { useState } from 'react'
import multipleLeaveData from '../../../../../../public/lottie/multiple-leave.json'
import blankLeaveData from '../../../../../../public/lottie/blank-leave.json'
import oxLeaveData from '../../../../../../public/lottie/ox-leave.json'

export function MultipleLottie() {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <div className="size-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {hover ? (
        <Lottie animationData={multipleHoverData} className="h-full p-[24px] lg:p-[40px]" />
      ) : (
        <Lottie animationData={multipleLeaveData} className="h-full p-[24px] lg:p-[40px]" />
      )}
    </div>
  )
}

export function OXLottie() {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <div className="size-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {hover ? (
        <Lottie animationData={oxLeaveData} className="h-full p-[24px] lg:p-[40px]" />
      ) : (
        <Lottie animationData={oxHoverData} className="h-full p-[24px] lg:p-[40px]" />
      )}
    </div>
  )
}
export function BlackLottie() {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <div className="size-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {hover ? (
        <Lottie animationData={blankLeaveData} className="h-full p-[26px] lg:p-[50px]" />
      ) : (
        <Lottie animationData={blankHoverData} className="h-full p-[26px] lg:p-[50px]" />
      )}
    </div>
  )
}
