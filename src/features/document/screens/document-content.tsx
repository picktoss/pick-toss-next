'use client'

import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const DocumentContent = () => {
  const { id } = useParams()
  const { data, isPending } = useQuery(queries.document.item(Number(id[0])))

  return (
    <div className="px-[20px] pb-[132px] pt-[10px]">
      {isPending ? <Loading center /> : data && <Text className="font-suit">{data.content}</Text>}
    </div>
  )
}

export default DocumentContent
