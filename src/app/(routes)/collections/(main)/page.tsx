import Exploration from '@/features/collection/components/exploration'
import MyCollection from '@/features/collection/components/my-collection'

interface Props {
  searchParams: {
    tab: 'exploration' | 'my-collection'
  }
}

const CollectionsPage = ({ searchParams }: Props) => {
  const tab = searchParams.tab
  const activeTab = ['exploration', 'my-collection'].includes(tab) ? tab : 'exploration'

  return (
    <div>
      {activeTab === 'exploration' && <Exploration />}
      {activeTab === 'my-collection' && <MyCollection />}
    </div>
  )
}

export default CollectionsPage
