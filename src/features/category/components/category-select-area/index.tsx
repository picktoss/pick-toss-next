'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { motion } from 'framer-motion'
import { useState } from 'react'

const CategorySelectArea = () => {
  const MAX_CATEGORY = 2
  const [categoryCheckList, setCheckList] = useState<interestedCategory[]>([])

  const isChecked = (category: interestedCategory) => {
    return categoryCheckList.find((value) => value === category) ? true : false
  }

  const handleCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const category = target.id as interestedCategory

    if (!category) return

    if (categoryCheckList.find((value) => value === category)) {
      const newCheckList = categoryCheckList.filter((value) => value !== category)
      setCheckList([...newCheckList])
      return
    }

    if (categoryCheckList.length === MAX_CATEGORY) return

    setCheckList((prev) => [...prev, category])
  }

  const handleSubmit = () => {
    // 완료 클릭 시 서버로 전송
    // onSuccess: /main으로 이동
  }

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariant = {
    hidden: { x: -50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="mb-[70px] mt-[40px] flex flex-col"
      >
        <Text typography="text2-medium" color="accent" className="mb-[20px]">
          *최대 2개 선택 가능
        </Text>

        <div onClick={(e) => handleCheck(e)} className="flex flex-col gap-[20px]">
          <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
            <Button
              id={'IT'}
              variant={'smallSquare'}
              colors={isChecked('IT') ? 'selected' : 'outlined'}
            >
              🤖 IT·프로그래밍
            </Button>
            <Button
              id={'BUSINESS_ECONOMY'}
              variant={'smallSquare'}
              colors={isChecked('BUSINESS_ECONOMY') ? 'selected' : 'outlined'}
            >
              💰 경영·경제
            </Button>
          </motion.div>

          <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
            <Button
              id={'SCIENCE_ENGINEERING'}
              variant={'smallSquare'}
              colors={isChecked('SCIENCE_ENGINEERING') ? 'selected' : 'outlined'}
            >
              🔬 과학·공학
            </Button>
            <Button
              id={'LAW'}
              variant={'smallSquare'}
              colors={isChecked('LAW') ? 'selected' : 'outlined'}
            >
              📖 법학
            </Button>
          </motion.div>

          <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
            <Button
              id={'SOCIETY_POLITICS'}
              variant={'smallSquare'}
              colors={isChecked('SOCIETY_POLITICS') ? 'selected' : 'outlined'}
            >
              ⚖️ 사회·정치
            </Button>
            <Button
              id={'HISTORY_PHILOSOPHY'}
              variant={'smallSquare'}
              colors={isChecked('HISTORY_PHILOSOPHY') ? 'selected' : 'outlined'}
            >
              📜 역사·철학
            </Button>
            <Button
              id={'ART'}
              variant={'smallSquare'}
              colors={isChecked('ART') ? 'selected' : 'outlined'}
            >
              🎨 예술
            </Button>
          </motion.div>

          <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
            <Button
              id={'LANGUAGE'}
              variant={'smallSquare'}
              colors={isChecked('LANGUAGE') ? 'selected' : 'outlined'}
            >
              💬 언어
            </Button>
            <Button
              id={'MEDICINE_PHARMACY'}
              variant={'smallSquare'}
              colors={isChecked('MEDICINE_PHARMACY') ? 'selected' : 'outlined'}
            >
              🩺 의학·약학
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Button onClick={handleSubmit} className="w-full" disabled={categoryCheckList.length === 0}>
        완료
      </Button>
    </>
  )
}

export default CategorySelectArea
