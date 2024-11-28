'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

import './style.css'

const RandomQuizView = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      뭐고
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(data) => setActiveIndex(data.activeIndex)}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide key={index} className="!flex items-center justify-center">
            <div
              className={cn(
                'size-[60px] rounded-[4px] bg-blue-300',
                index === activeIndex && 'size-[90px]'
              )}
            >
              Slide Item
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RandomQuizView
