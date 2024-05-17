import { createDocument } from '@/apis/fetchers/document/create-document'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function CreateDocumentForm() {
  return (
    <form
      action={async (formData) => {
        'use server'
        const userDocumentName = formData.get('userDocumentName') as string
        const file = formData.get('file') as string
        const categoryId = '5'
        if (!userDocumentName || !file || !categoryId) {
          return
        }
        await createDocument({
          userDocumentName,
          file,
          categoryId,
        })
      }}
    >
      <Input name="userDocumentName" placeholder="제목 추가" />
      <Textarea name="file" />
      <button>문서 생성하기</button>
    </form>
  )
}
