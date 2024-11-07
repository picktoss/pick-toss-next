'use client'

import { productInfoList } from '@/features/payment/constants/product-info-list'
import { motion } from 'framer-motion'
import ItemCard from '../item-card'
import { useRef } from 'react'

const ProductContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (event: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY
    }
  }

  return (
    <motion.div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex h-fit min-h-[200px] w-dvw max-w-mobile snap-x gap-[8px] overflow-x-scroll px-[16px] scrollbar-hide"
      style={{
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {productInfoList.map((product) => (
        <motion.div key={product.key} className="snap-center" style={{ scrollSnapAlign: 'center' }}>
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
