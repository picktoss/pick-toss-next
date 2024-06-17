import { Input } from '@/components/ui/input'
import { useEditDocumentContext } from '../contexts/edit-document-context'

export function TitleInput() {
  const { documentName, changeDocumentName } = useEditDocumentContext()

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
