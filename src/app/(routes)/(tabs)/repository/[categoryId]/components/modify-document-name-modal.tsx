import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Document } from '@/apis/fetchers/document/get-documents-for-category'
import { updateDocumentName } from '@/apis/fetchers/document/update-document-name'

interface Props extends Document {}

export default function ModifyDocumentNameModal({ id, name }: Props) {
  const [documentName, setDocumentName] = useState(name)

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateDocumentName,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents'] }),
  })

  const handleCreateCategory = () => {
    mutate({ documentId: id, name: documentName, accessToken: session?.user.accessToken || '' })
  }

  return (
    <DialogContent
      displayCloseButton={false}
      className="w-[448px]"
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
          <Button className="w-[160px]" onClick={handleCreateCategory}>
            완료
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}
