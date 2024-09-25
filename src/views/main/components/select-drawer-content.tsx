import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

interface Props {
  step: 'folder' | 'document'
  selectCheckItems: ReactNode
  next: () => void
  init: () => void
}

const SelectDrawerContent = ({ step, selectCheckItems, next, init }: Props) => {
  return (
    <div className="flex flex-1 flex-col justify-between pb-[22px] pt-[40px]">
      <div>
        <div className="flex gap-[21px] px-[24px] text-h4-bold text-gray-09">
          <div role="button" className={cn(step === 'folder' ? 'text-gray-09' : 'text-gray-06')}>
            폴더
          </div>
          {step === 'document' && (
            <div role="button" className="text-gray-09">
              노트
            </div>
          )}
        </div>

        <div className="mt-[24px]">{selectCheckItems}</div>
      </div>

      <div className="px-[20px]">
        {step === 'folder' ? (
          <Button className="w-full" onClick={() => next()}>
            노트 선택
          </Button>
        ) : (
          <div className="flex w-full gap-[6px]">
            <Button className="flex-[100]" variant="secondary" onClick={() => init()}>
              초기화
            </Button>
            <Button className="flex-[230]" onClick={() => next()}>
              완료
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectDrawerContent
