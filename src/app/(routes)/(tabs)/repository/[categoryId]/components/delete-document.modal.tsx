import { deleteDocument } from '@/apis/fetchers/document/delete-document/fetcher'
import { Document } from '@/apis/fetchers/document/get-documents-for-category/fetcher'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import icons from '@/constants/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { SortOption } from './document-list'
import { useParams } from 'next/navigation'
import { GET_DOCUMENTS_FOR_CATEGORY_KEY } from '@/apis/fetchers/document/get-documents-for-category/query'
import { useState } from 'react'
import Loading from '@/shared/components/loading'

interface Props extends Pick<Document, 'id' | 'name'> {
  open: boolean
  setOpen: (open: boolean) => void
  sortOption: SortOption
  onSuccess?: () => void
  showLoading?: boolean
}

export default function DeleteDocumentModal({
  id,
  sortOption,
  name,
  open,
  setOpen,
  onSuccess,
  showLoading = false,
}: Props) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { data: session, update } = useSession()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useMutation({
    mutationFn: deleteDocument,
    onMutate: async () => {
      setIsLoading(true)

      await queryClient.cancelQueries({
        queryKey: [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
      })

      const prevDocuments = queryClient.getQueryData<Document[]>([
        GET_DOCUMENTS_FOR_CATEGORY_KEY,
        Number(categoryId),
        sortOption,
      ])

      if (categoryId) {
        queryClient.setQueryData(
          [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
          (prevDocuments: Document[]) => prevDocuments.filter((document) => document.id !== id)
        )
      }

      return prevDocuments
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [GET_DOCUMENTS_FOR_CATEGORY_KEY, Number(categoryId), sortOption],
        context
      )
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['documents'] }),
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
      ])
      await update({})
      setOpen(false)
      onSuccess?.()
    },
  })

  const handleDeleteDocument = () => {
    mutate({ documentId: id, accessToken: session?.user.accessToken || '' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="flex min-h-[373px] w-[320px] flex-col items-center"
        displayCloseButton={false}
      >
        {showLoading && isLoading ? (
          <Loading center />
        ) : (
          <>
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
            {showLoading ? (
              <Button className="h-[44px] w-full" onClick={handleDeleteDocument}>
                삭제하기
              </Button>
            ) : (
              <DialogClose asChild>
                <Button className="h-[44px] w-full" onClick={handleDeleteDocument}>
                  삭제하기
                </Button>
              </DialogClose>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
