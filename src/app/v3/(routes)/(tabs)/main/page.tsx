import { Button } from '@/shared/components/ui/button'

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
      <Input type="text" placeholder="입력해주세요" variant="round" />
      <Input placeholder="입력해주세요" />
      <Input
        placeholder="입력해주세요"
        right={
          <Icon
            name="cancel-circle"
            className="mr-[6px] size-[24px]"
            fill="#B6C1C9"
            stroke="#4C5052"
          />
        }
      />
      <Input
        placeholder="입력해주세요"
        bottomText="메세지입니다"
        label="라벨명"
        right={
          <Icon
            name="cancel-circle"
            className="mr-[6px] size-[24px]"
            fill="#B6C1C9"
            stroke="#4C5052"
          />
        }
      />
      <Input
        placeholder="입력해주세요"
        bottomText={{ text: '메세지입니다', type: 'info' }}
        label="라벨명"
        essential={true}
        right={
          <Icon
            name="cancel-circle"
            className="mr-[6px] size-[24px]"
            fill="#B6C1C9"
            stroke="#4C5052"
          />
        }
      />
      <Input
        placeholder="입력해주세요"
        bottomText="메세지입니다"
        label="라벨명"
        hasError={true}
        right={
          <Icon
            name="cancel-circle"
            className="mr-[6px] size-[24px]"
            fill="#B6C1C9"
            stroke="#4C5052"
          />
        }
      />
      <Input placeholder="입력해주세요" />
    </div>
  )
}

export default Home
