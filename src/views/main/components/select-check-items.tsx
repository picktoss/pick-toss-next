import { Checkbox } from '@/shared/components/ui/checkbox'
import { CheckItem } from '@/types/quiz'
import Link from 'next/link'

const SelectCheckItems = (props: {
  items: CheckItem[]
  isAllChecked: boolean
  unCheckAll: () => void
  checkAll: () => void
  toggle: (id: number) => void
  selectType?: 'category' | 'document'
}) => {
  const { items, isAllChecked, unCheckAll, checkAll, toggle, selectType = 'category' } = props

  return (
    <div>
      <div className="flex gap-[16px] px-[27px] py-[9px]">
        <Checkbox
          id="allFolder"
          className="size-[20px]"
          checked={isAllChecked}
          onClick={() => {
            isAllChecked ? unCheckAll() : checkAll()
          }}
        />
        <label
          htmlFor="allFolder"
          className="flex h-[20px] items-end text-body2-regular text-gray-08"
        >
          전체 <span className="text-orange-06">{items.length}</span>개
        </label>
      </div>

      {items.length > 0 && (
        <>
          <div className="mb-[7px] px-[19px]">
            <div className="h-px w-full rounded-full bg-gray-01" />
          </div>

          <div className="flex max-h-[280px] flex-col gap-[3px] overflow-auto pb-[10px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative flex justify-between gap-[12px] px-[27px] py-[9px]"
              >
                <div className="flex gap-[16px]">
                  <Checkbox
                    id={String(item.id)}
                    className="size-[20px]"
                    checked={item.checked}
                    onClick={() => toggle(item.id)}
                  />
                  <label
                    htmlFor={String(item.id)}
                    className="flex h-[20px] items-end text-body2-regular text-gray-08"
                  >
                    <span className="line-clamp-1">
                      {item.emoji ? item.emoji : ''} {item.name}
                    </span>
                  </label>
                </div>

                {selectType === 'document' && (
                  <Link
                    href={`/document/${item.id}`}
                    className="mt-[3px] shrink-0 text-small1-regular text-blue-05 underline underline-offset-2"
                    target="_blank"
                  >
                    노트 보기
                  </Link>
                )}

                {(item.documentStatus === 'UNPROCESSED' ||
                  item.documentStatus === 'DEFAULT_DOCUMENT') && (
                  <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-gray-09/60">
                    <div className="text-small1-bold text-white">
                      {item.documentStatus === 'UNPROCESSED'
                        ? '퀴즈가 생성되지 않은 문서입니다.'
                        : '기본 문서는 선택할 수 없습니다.'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SelectCheckItems
