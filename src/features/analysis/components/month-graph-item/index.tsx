import Text from '@/shared/components/ui/text'
import { motion } from 'framer-motion'

interface Props {
  date: string
  barHeight: number
  rightHeight: number
}

const MonthGraphItem = ({ date, barHeight, rightHeight }: Props) => {
  const pointDate = [1, 8, 15, 23]
  const isPointDate = pointDate.find((value) => value === Number(date.split('.')[1]))

  return (
    <div className="relative flex h-full w-[4px] flex-col justify-end">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative mb-[23px] flex w-full flex-col justify-end overflow-hidden rounded-t-[8px] bg-[var(--color-gray-100)]"
        style={{
          height: `${barHeight}%`,
          transformOrigin: 'bottom',
        }}
      >
        <div
          className="w-full rounded-t-[8px] bg-[var(--color-blue-500)]"
          style={{
            height: `${rightHeight}%`,
          }}
        />
      </motion.div>

      <Text
        typography="caption-bold"
        className="absolute right-1/2 min-w-[25px] translate-x-1/2 text-center"
      >
        {(isPointDate || date === '오늘') && date}
      </Text>
    </div>
  )
}

export default MonthGraphItem
