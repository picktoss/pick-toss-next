import Icon from '@/shared/components/icon'
import Collection from '../../components/collection'
import CollectionList from '../../components/collection-list'
import Text from '@/shared/components/ui/text'

const controlButtons = ['분야', '퀴즈 유형', '문제 수']

const Exploration = () => {
  return (
    <>
      <div className="flex h-[60px] items-center justify-between px-[16px]">
        <div className="flex gap-[8px]">
          {controlButtons.map((button) => (
            <button
              key={button}
              className="flex items-center gap-[4px] rounded-full border bg-button-fill-outlined py-[7.5px] pl-[14px] pr-[10px]"
            >
              <Text typography="button4" className="text-button-label-tertiary">
                {button}
              </Text>
              <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
            </button>
          ))}
        </div>
        <Icon name="sort" className="size-[16px]" />
      </div>

      <CollectionList>
        {Array.from({ length: 10 }).map((_, idx) => (
          <Collection
            key={idx}
            emoji="🔥"
            title="파이썬 OX"
            category="IT·프로그래밍"
            problemCount={35}
            lastUpdated="2일 전"
            isBookMarked={true}
            bookMarkCount={123}
          />
        ))}
      </CollectionList>
    </>
  )
}

export default Exploration
