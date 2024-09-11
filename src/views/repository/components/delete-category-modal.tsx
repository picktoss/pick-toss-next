import { Category } from '@/actions/fetchers/category/get-categories'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import icons from '@/constants/icons'
import Image from 'next/image'
import { useDeleteCategoryMutation } from '@/actions/fetchers/category/delete-category/mutation'

interface Props extends Category {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// DeleteCategoryModal 컴포넌트
const DeleteCategoryModal = ({ id, name, documents, open, onOpenChange }: Props) => {
  const { mutate: deleteCategoryMutate } = useDeleteCategoryMutation()

  const handleDeleteCategory = () => {
    deleteCategoryMutate({ categoryId: id })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-[320px] flex-col items-center" displayCloseButton={false}>
        <h4 className="mb-[20px] text-h4-bold text-gray-09">폴더 삭제하기</h4>
        <Image src={icons.deleteFolder} alt="" className="mb-[16px]" />
        <p className="text-text-medium text-gray-08">
          {name} 폴더와 <span className="text-orange-05">{documents.length}개의 노트</span>가 모두
          삭제됩니다
        </p>
        <p className="mb-[40px] text-text-medium text-gray-08">삭제하시겠어요?</p>
        <DialogClose asChild>
          <Button className="mb-[8px] h-[44px] w-full bg-orange-01 text-orange-05 hover:bg-orange-02">
            폴더 유지하기
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="h-[44px] w-full" onClick={handleDeleteCategory}>
            삭제하기
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategoryModal
