'use client'

import { cn } from '@/shared/lib/utils'
import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'

const SwipeableCardList = ({ cardComponents }: { cardComponents: React.ReactNode[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const controls = useAnimation()
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  const [moveAtOnceWidth, setMoveAtOnceWidth] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentOffset, setCurrentOffset] = useState(0)
  const [isMoving, setIsMoving] = useState(false)

  // 컨테이너와 콘텐츠 너비 설정
  useEffect(() => {
    if (containerRef.current && itemRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 32
      const contentWidth = (itemRef.current.offsetWidth + 8) * cardComponents.length
      const moveableWidth = contentWidth - containerWidth

      setMoveAtOnceWidth(containerWidth * (4 / 5))

      setConstraints({
        left: -1 * moveableWidth,
        right: 0,
      })
    }
  }, [cardComponents])

  // containerRef에서는 수직 스크롤을 막기 위한 코드
  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  // 이동 시작 시 호출될 함수
  const handleMoveStart = () => {
    setIsMoving(true)
  }

  // 이동 종료 시 호출될 함수 (타이머를 통해 약간의 지연 후 클릭 활성화)
  const handleMoveEnd = () => {
    setTimeout(() => {
      setIsMoving(false)
    }, 100) // 100ms 후에 클릭 가능하도록 설정
  }

  // 스크롤 방향에 따라 컨테이너 크기만큼 이동하고 끝을 감지
  const handleDirection = (direction: 'next' | 'prev') => {
    setCurrentOffset((prevOffset) => {
      let newOffset = prevOffset

      if (direction === 'next' && prevOffset > constraints.left) {
        const remainingContentWidth = Math.abs(prevOffset - constraints.left)
        newOffset = prevOffset - Math.min(remainingContentWidth, moveAtOnceWidth)
      } else if (direction === 'prev' && prevOffset < 0) {
        const remainingContentWidth = constraints.right - prevOffset
        newOffset = prevOffset + Math.min(remainingContentWidth, moveAtOnceWidth)
      }

      void controls.start({
        x: newOffset,
        transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
      })

      return newOffset
    })
  }

  // 드래그 시작 핸들러
  const handleDragStart = () => {
    handleMoveStart()
  }

  // 드래그 종료 시 방향에 따라 이동
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 1
    if (info.offset.x < -threshold) {
      handleDirection('next')
    } else if (info.offset.x > threshold) {
      handleDirection('prev')
    }

    handleMoveEnd()
  }

  // 휠 이벤트 처리: 휠을 통해 좌우 이동
  const handleWheel = debounce((event: React.WheelEvent | WheelEvent) => {
    if (containerRef.current && containerRef.current.contains(event.target as Node)) {
      if (Math.abs(event.deltaY) > 1) {
        event.preventDefault()
      }

      const threshold = 100 // 이동 방향 감지 임계값

      requestAnimationFrame(() => {
        if (containerRef.current) {
          if (event.deltaY < -threshold) {
            handleDirection('prev')
          } else if (event.deltaY > threshold) {
            handleDirection('next')
          }
        }
      })
    }
  }, 50)

  return (
    <motion.div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex h-fit w-dvw max-w-mobile select-none gap-[8px] overflow-y-hidden overflow-x-scroll scroll-smooth scrollbar-hide"
    >
      {cardComponents.map((cardComponent, index) => (
        <motion.div
          key={'motion_' + index}
          ref={itemRef}
          className={cn(
            index === cardComponents.length - 1 && 'mr-[16px]',
            isMoving ? 'pointer-events-none' : 'pointer-events-auto'
          )}
          drag="x"
          dragConstraints={constraints}
          style={{ x }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {cardComponent}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SwipeableCardList
