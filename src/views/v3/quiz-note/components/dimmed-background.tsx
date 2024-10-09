import Text from '@/shared/components/text'
import { addNoteText } from '../constants/add-note-buttons'
import { cn } from '@/shared/lib/utils'

// DimmedBackground 컴포넌트
const DimmedBackground = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div
      className={cn(
        'fixed right-1/2 translate-x-1/2 top-0 h-screen w-full max-w-[430px] -z-10 opacity-0 transition-all duration-300',
        isExpanded && 'opacity-100 z-40'
      )}
    >
      <div className="fixed left-0 top-0 z-10 h-screen w-full max-w-[430px] bg-black opacity-75"></div>
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
      {addNoteText.map((text) => (
        <Text
          as="span"
          key={text.key}
          className={cn(
            'absolute z-[20] text-text-primary-inverse text-sm',
            text.bottomCss,
            text.rightCss
          )}
        >
          {text.content}
        </Text>
      ))}
    </div>
  )
}

export default DimmedBackground
