import { Checkbox } from '@/shared/components/ui/checkbox'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

const SetNote = () => {
  return (
    <div className="mt-[2px] h-[calc(100%-111px-100px)] w-full py-[15px]">
      <Text typography="subtitle1-bold" className="mb-[13px]">
        문제를 가져올 노트
      </Text>

      <div className="flex h-[calc(100%-40px)] w-full rounded-[12px] border border-border-default">
        {/* 폴더 선택 영역 */}
        <div className="flex h-full w-2/5 flex-col gap-[6px] overflow-y-auto border-r border-border-default px-[4px] py-[8px]">
          <Text
            as="button"
            typography={'text1-bold'}
            className={cn(
              'flex h-fit w-full items-center gap-[8px] rounded-[8px] px-[8px] py-[11px]',
              'bg-background-base-02'
            )}
          >
            전체 노트
            <span className="text-text-accent">28</span>
          </Text>
          <Text
            as="button"
            typography={'text1-medium'}
            className={cn(
              'flex h-fit w-full items-center gap-[8px] rounded-[8px] px-[8px] py-[11px]'
            )}
          >
            전공 공부
            <span className="text-text-accent">13</span>
          </Text>
        </div>

        {/* 노트 선택 영역 */}
        <div className="flex h-full w-3/5 flex-col overflow-y-auto">
          <div className="mb-[4px] flex items-center gap-[8px] px-[10px] py-[16px]">
            <Checkbox id="all" />
            <Text
              as="label"
              htmlFor="all"
              typography="text1-medium"
              className="w-full cursor-pointer"
            >
              전체
            </Text>
          </div>

          {/* 폴더에 속한 노트 수만큼 노출 */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={'noteId_' + idx} className="flex items-center gap-[8px] px-[10px] py-[12px]">
              <Checkbox id={'noteId_' + idx} />
              <Text
                as="label"
                htmlFor={'noteId_' + idx}
                typography="text1-medium"
                className="w-full cursor-pointer"
              >
                최근 이슈
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetNote
