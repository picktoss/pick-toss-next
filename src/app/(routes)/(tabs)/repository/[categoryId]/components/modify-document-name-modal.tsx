import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import { useState } from 'react'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/shared/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Document } from '@/actions/fetchers/document/get-documents-for-category'
import { updateDocumentName } from '@/actions/fetchers/document/update-document-name'
import { useParams } from 'next/navigation'
import { SortOption } from './document-list'
import { GET_DOCUMENTS_FOR_CATEGORY_KEY } from '@/actions/fetchers/document/get-documents-for-category/query'
import { useSession } from 'next-auth/react'

interface Props extends Document {
  open: boolean
  onOpenChange: (open: boolean) => void
  sortOption: SortOption
}

export default function ModifyDocumentNameModal({
  id,
  name,
  sortOption,
  open,
  onOpenChange,
}: Props) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [documentName, setDocumentName] = useState(name)
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const { mutate } = useMutation({
    mutationFn: updateDocumentName,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
      })

      const prevDocuments = queryClient.getQueryData<Document[]>([
        GET_DOCUMENTS_FOR_CATEGORY_KEY,
        Number(categoryId),
        sortOption,
      ])

      queryClient.setQueryData(
        [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
        (prevDocuments: Document[]) =>
          prevDocuments.map((document) => {
            if (id !== document.id) return document

            return {
              ...document,
              name: documentName,
            }
          })
      )

      return prevDocuments
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
        context
      )
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents'] }),
  })

  const handleModifyName = () => {
    if (documentName === '') return alert('노트 이름을 설정해주세요')

    mutate({ documentId: id, name: documentName, accessToken: session?.user.accessToken || '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        displayCloseButton={false}
        className="w-[320px] lg:w-[448px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h4 className="mb-[30px] text-h4-bold text-gray-09">노트 이름 바꾸기</h4>
        <div className="mb-[40px] flex items-center gap-[10px]">
          <div className="mr-[6px] flex size-[32px] items-center justify-center rounded-full bg-gray-01">
            <Image src={icons.file} alt="" width={16} height={16} />
          </div>
          <input
            className="h-[32px] w-full rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none"
            value={documentName}
            onChange={(event) => setDocumentName(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <DialogClose asChild>
            <Button className="w-[160px]" onClick={handleModifyName}>
              완료
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
