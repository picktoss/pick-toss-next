import Text from '@/shared/components/ui/text'
// import LogoutDialog from '../logout-dialog'

const Footer = () => {
  return (
    <div className="w-full bg-background-base-02 px-[16px] pb-[73px] pt-[20px]">
      <Text typography="caption-medium" color="caption" className="mb-[16px]">
        사업자등록번호 120-20-02237 | 070-7954-1774 | 대표자명 : 이유민 <br /> 서울특별시 서대문구
        연희로41가길 5, B1층 D72호(홍은동)
      </Text>

      <Text typography="caption-medium" color="caption">
        ⓒ 2024. picktoss all rights reserved
      </Text>
    </div>
  )
}

export default Footer
