import { Document } from '@/actions/fetchers/document/get-documents-for-category'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import icons from '@/constants/icons'
import Image from 'next/image'
import { SortOption } from './document-list'
import { useParams } from 'next/navigation'
import Loading from '@/shared/components/loading'
import { useDeleteDocumentMutation } from '@/actions/fetchers/document/delete-document/mutation'

interface Props extends Pick<Document, 'id' | 'name'> {
  open: boolean
  setOpen: (open: boolean) => void
  sortOption: SortOption
  onSuccess?: () => void
  showLoading?: boolean
}

// DeleteDocumentModal 컴포넌트
const DeleteDocumentModal = ({
  id,
  sortOption,
  name,
  open,
  setOpen,
  onSuccess,
  showLoading = false,
}: Props) => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { mutate, isPending } = useDeleteDocumentMutation({
    categoryId: Number(categoryId),
    sortOption,
  })

  const handleDeleteDocument = () => {
    mutate(
      { documentId: id },
      {
        onSuccess: () => {
          setOpen(false)
          onSuccess?.()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="flex min-h-[373px] w-[320px] flex-col items-center"
        displayCloseButton={false}
      >
        {showLoading && isPending ? (
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

export default DeleteDocumentModal
