import Text from '@/shared/components/text'
import { Input } from '@/shared/components/ui/input'
import Icon from '@/shared/components/v3/icon'

const Home = () => {
  return (
    <div className="flex flex-col gap-[10px] p-[40px]">
      <Text as="p" typography="subtitle1-bold">
        example
      </Text>
      {/* a 태그가 됨 */}
      <Text as="a" typography="text1-bold" href="" className="">
        example
      </Text>
      <Input type="text" placeholder="입력해주세요" variant="search" />
      <Input type="text" placeholder="입력해주세요" variant="default" />
      <Input
        type="text"
        placeholder="입력해주세요"
        variant="default"
        right={<Icon name="close-circle" className="size-[24px]" fill="#B6C1C9" stroke="#4C5052" />}
      />
      <Input
        type="text"
        placeholder="입력해주세요"
        variant="info"
        message="메세지입니다"
        label="라벨명"
        right={<Icon name="close-circle" className="size-[24px]" fill="#B6C1C9" stroke="#4C5052" />}
      />
      <Input
        type="text"
        placeholder="입력해주세요"
        message="메세지입니다"
        label="라벨명"
        variant="default"
        hasError={true}
        right={<Icon name="close-circle" className="size-[24px]" fill="#B6C1C9" stroke="#4C5052" />}
      />
    </div>
  )
}

export default Home
