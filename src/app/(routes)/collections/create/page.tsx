import SelectQuizFromCollection from '@/features/collection/components/select-quiz-from-collection'
import Text from '@/shared/components/ui/text'

const CreateCollectionPage = () => {
  return (
    <div className="px-[20px]">
      <div className="mt-[27px]">
        <Text typography="title3" className="text-text-primary">
          컬렉션으로 만들 문제를 선택해주세요
        </Text>
        <Text typography="text1-medium" className="mt-[8px] text-text-sub">
          5문제 이상 선택해주세요.
        </Text>
      </div>

      <SelectQuizFromCollection />
    </div>
  )
}

export default CreateCollectionPage
