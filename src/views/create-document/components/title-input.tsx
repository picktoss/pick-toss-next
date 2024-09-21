import { Input } from '@/shared/components/ui/input'
import { useCreateDocumentContext } from '../contexts/create-document-context'

// TitleInput 컴포넌트
const TitleInput = () => {
  const { documentName, changeDocumentName } = useCreateDocumentContext()

  return (
    <div className="mx-[20px] border-b pt-[25px]">
      <Input
        value={documentName}
        onChange={(e) => changeDocumentName(e.target.value)}
        placeholder="제목 추가"
        className="border-b border-none border-gray-04 bg-inherit !text-h3-bold placeholder:text-gray-04"
        autoFocus
      />
    </div>
  )
}

export default TitleInput
