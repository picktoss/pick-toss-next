import Text from '@/shared/components/ui/text'
import { motion } from 'framer-motion'

interface Props {
  handleBarClick: (index: number) => void
  handleBarMouseEnter: (index: number) => void
  handleBarMouseLeave: () => void
  index: number
  activeIndex: number | null
  date: string
  totalCount: number
  rightCount: number
  barHeight: number
  rightHeight: number
}

const WeekGraphItem = ({
  handleBarClick,
  handleBarMouseEnter,
  handleBarMouseLeave,
  index,
  activeIndex,
  date,
  totalCount,
  rightCount,
  barHeight,
  rightHeight,
}: Props) => {
  return (
    <div
      onMouseEnter={() => handleBarMouseEnter(index)}
      onMouseLeave={handleBarMouseLeave}
      onClick={() => handleBarClick(index)}
      className="relative flex size-full flex-col justify-end"
    >
      {index === activeIndex && (
        <div
          className="absolute right-1/2 z-10 mb-2 -translate-y-full translate-x-1/2"
          style={{ bottom: `${barHeight === 100 ? 85 : barHeight}%` }}
        >
          <div className="size-fit rounded-[8px] bg-background-toast px-[8px] py-[4px]">
            <Text as={'span'} typography="text2-bold" color="primary-inverse">
              {rightCount}/{totalCount}
            </Text>
          </div>

          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[-7px] right-1/2 translate-x-1/2"
          >
            <path d="M6.5 10L0.870835 0.249999L12.1292 0.25L6.5 10Z" fill="#393B3D" />
          </svg>
        </div>
      )}

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative mb-[8px] flex w-full flex-col justify-end overflow-hidden rounded-t-[12px] bg-[var(--color-gray-100)]"
        style={{
          height: `${barHeight}%`,
          transformOrigin: 'bottom',
        }}
      >
        <div
          className="w-full"
          style={{
            height: `${rightHeight}%`,
            backgroundColor:
              activeIndex === index ? 'var(--color-blue-500)' : 'var(--color-blue-200)',
          }}
        />
      </motion.div>

      <Text
        typography={index === activeIndex ? 'caption-bold' : 'caption-medium'}
        color={index === activeIndex ? 'primary' : 'sub'}
        className="text-center"
      >
        {date}
      </Text>
    </div>
  )
}

export default WeekGraphItem
