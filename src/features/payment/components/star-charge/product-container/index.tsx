'use client'

import { productInfoList } from '@/features/payment/config/product-info-list'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import ItemCard from '../item-card'
import { useEffect, useRef, useState } from 'react'

const ProductContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    if (containerRef.current && itemRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 32
      const contentWidth = (itemRef.current.offsetWidth + 8) * productInfoList.length

      setConstraints({
        left: -(contentWidth - containerWidth),
        right: 0,
      })
    }
  }, [])

  useEffect(() => {
    void controls.start({ x: 0 })
  }, [controls])

  // 드래그 중 x 위치를 constraints 내로 제한하기 위한 코드
  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      const clampedX = Math.max(constraints.left, Math.min(latest, constraints.right))
      x.set(clampedX)
    })
    return unsubscribe
  }, [constraints.left, constraints.right, x])

  const handleWheel = (event: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY
    }
  }

  const handleDragEnd = () => {
    if (containerRef.current) {
      const currentScroll = containerRef.current.scrollLeft
      const boundedScroll = Math.max(constraints.left, Math.min(currentScroll, constraints.right))
      containerRef.current.scrollLeft = boundedScroll
    }
  }

  return (
    <motion.div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex h-fit min-h-[200px] w-dvw max-w-mobile select-none snap-x gap-[8px] px-[16px] scrollbar-hide"
      style={{
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {productInfoList.map((product) => (
        <motion.div
          key={product.key}
          ref={itemRef}
          className="snap-center"
          drag="x"
          dragConstraints={constraints}
          style={{ x }}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          <ItemCard
            image={product.image}
            tagMessage={product.tagMessage}
            starCount={product.starCount}
            bonusCount={product.bonusCount}
            paymentAmount={product.paymentAmount}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductContainer
