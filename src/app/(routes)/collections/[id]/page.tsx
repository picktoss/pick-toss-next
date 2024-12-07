import DetailInfo from '@/features/collection/components/detail-info'

interface Props {
  params: {
    id: string
  }
}

const CollectionDetailPage = ({ params }: Props) => {
  return <DetailInfo id={Number(params.id)} />
}

export default CollectionDetailPage
