import Text from '@/shared/components/text'

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
    </div>
  )
}

export default Home
