'use client'

import { useGetDocumentDetail } from '@/requests/document/hooks'
import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { useParams } from 'next/navigation'

const DocumentContent = () => {
  const { id } = useParams()
  const { data, isPending } = useGetDocumentDetail(Number(id[0]))

  return (
    <div className="px-[20px] pb-[132px] pt-[10px]">
      {isPending ? <Loading center /> : data && <Text className="font-suit">{data.content}</Text>}
    </div>
  )
}

export default DocumentContent
