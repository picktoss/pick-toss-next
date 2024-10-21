import Text from '@/shared/components/ui/text'

const CategoryTooltip = () => {
  return (
    <div className="absolute right-[5px] top-[-6px]">
      <Text
        typography="text2-medium"
        className="rounded-[16px] bg-background-tooltip px-[16px] py-[7px] text-text-primary-inverse"
      >
        설정한 분야의 컬렉션을 홈에서 볼 수 있어요
      </Text>
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[-6px] left-[30px]"
      >
        <path d="M6.85648 9L13.8564 2.86102e-06H3.4666e-05L6.85648 9Z" fill="#4D7BF9" />
      </svg>
    </div>
  )
}

export default CategoryTooltip
