import Text from '@/shared/components/ui/text'
import DimmedBackground from './dimmed-background'
import AnimatedButtons from './animate-buttons'
import { cn } from '@/shared/lib/utils'

export interface AddNoteProps {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

const AddNoteMenu = ({ isExpanded, setIsExpanded }: AddNoteProps) => {
  return (
    <div
      className={cn(
        'absolute right-1/2 top-0 h-screen w-dvw max-w-mobile translate-x-1/2 pointer-events-none',
        isExpanded && 'z-40'
      )}
    >
      <DimmedBackground isExpanded={isExpanded}>
        <div className="flex-center absolute bottom-[396px] right-[16px] z-20 h-[32px] w-[243px] rounded-[16px] bg-background-tooltip opacity-100">
          <Text as="span" typography="text2-medium" className="text-text-primary-inverse">
            노션 페이지를 수정해도 업데이트 할 수 있어요
          </Text>
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[-8px] right-[26.14px]"
          >
            <path
              d="M6.85648 9L13.8564 5.28376e-06L3.62396e-05 2.86103e-06L6.85648 9Z"
              fill="#4D7BF9"
            />
          </svg>
        </div>
      </DimmedBackground>
      <AnimatedButtons isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </div>
  )
}

export default AddNoteMenu
