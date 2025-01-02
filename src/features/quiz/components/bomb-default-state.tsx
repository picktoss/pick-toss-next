import Icon from '@/shared/components/custom/icon'
import { motion } from 'framer-motion'

interface Props {
  leftQuizCount: number
  isTutorial?: boolean
}

/** 문제를 푸는 중 보여줄 정지 상태 폭탄 컴포넌트 */
const BombDefaultState = ({ leftQuizCount, isTutorial }: Props) => {
  return (
    <div className="relative h-[100px] w-full overflow-x-hidden overflow-y-visible">
      <motion.div className="center" initial={{ x: '-210px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Icon name="bomb" />
      </motion.div>
      <motion.div className="center" initial={{ x: '-145px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Icon name="bomb" />
      </motion.div>
      <motion.div className="center" initial={{ x: '-80px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Icon name="bomb" />
      </motion.div>

      {!isTutorial && <Icon name="bomb" className="center" />}

      {leftQuizCount >= 2 && (
        <motion.div className="center" initial={{ x: '120px', y: '50%' }}>
          <Icon name="bomb" />
        </motion.div>
      )}

      {leftQuizCount >= 3 && (
        <motion.div className="center" initial={{ x: '200px', y: '50%' }}>
          <Icon name="bomb" />
        </motion.div>
      )}
    </div>
  )
}

export default BombDefaultState
