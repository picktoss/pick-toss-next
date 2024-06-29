import { deleteDocument } from '@/apis/fetchers/document/delete-document/fetcher'
import { Document } from '@/apis/fetchers/document/get-documents-for-category/fetcher'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import icons from '@/constants/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { SortOption } from './document-list'
import { useParams } from 'next/navigation'

interface Props extends Document {
  open: boolean
  onOpenChange: (open: boolean) => void
  sortOption: SortOption
}

export default function DeleteDocumentModal({ id, sortOption, name, open, onOpenChange }: Props) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteDocument,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['documents', Number(categoryId), sortOption] })

      const prevDocuments = queryClient.getQueryData<Document[]>([
        'documents',
        Number(categoryId),
        sortOption,
      ])

      queryClient.setQueryData(
        ['documents', Number(categoryId), sortOption],
        (prevDocuments: Document[]) => prevDocuments.filter((document) => document.id !== id)
      )

      return prevDocuments
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['documents', Number(categoryId), sortOption], context)
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['documents'] }),
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
      ]),
  })

  const handleDeleteDocument = () => {
    mutate({ documentId: id, accessToken: session?.user.accessToken || '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-[320px] flex-col items-center" displayCloseButton={false}>
        <h4 className="mb-[20px] text-h4-bold text-gray-09">노트 삭제하기</h4>
        <Image src={icons.deleteFolder} alt="" className="mb-[16px]" />
        <p className="mb-[40px] text-text-medium text-gray-08">
          <span className="text-orange-05">{name} 노트</span>를 삭제하시겠어요?
        </p>
        <DialogClose asChild>
          <Button className="mb-[8px] h-[44px] w-full bg-orange-01 text-orange-05 hover:bg-orange-02">
            노트 유지하기
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="h-[44px] w-full" onClick={handleDeleteDocument}>
            삭제하기
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
