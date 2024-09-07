import Image from 'next/image'
import { CommonLayout } from '@/shared/components/common-layout'
import { LOCAL_KEY } from '@/constants/local-key'
import CategoryList from './category-list'
import CategoryAccordionList from './category-accordion-list'
import AddNoteFloatingButton from '@/shared/components/add-note-floating-button'
import { useSession } from 'next-auth/react'
import { RepositoryProps } from './render-search-result'
import Loading from '@/shared/components/loading'

export default function RenderRepository({ handleSubmit }: Omit<RepositoryProps, 'term'>) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loading center />
  }

  return (
    <CommonLayout
      title={
        <div className="flex gap-[8px]">
          <span>{session?.user.dto.name}님의 노트 창고</span>
          <Image src="/icons/book.svg" alt="" width={32} height={32} />
        </div>
      }
      mobileOptions={{
        hasSearch: true,
        hasNotifications: true,
        mobileTitle: (
          <div className="flex gap-[8px]">
            <span>노트 창고</span>
            <Image src="/icons/book.svg" alt="" width={24} height={24} />
          </div>
        ),
      }}
      searchOptions={{
        placeholder: '노트명, 노트 내용을 입력하세요',
        recentTermsLocalKey: LOCAL_KEY.SEARCH_DOCUMENT,
        onSubmit: handleSubmit,
      }}
    >
      {/* TODO: height calc 계산보다 더 나은 방식(상대적인 height 계산) 필요 */}
      <main className="mt-[28px] flex min-h-[calc(100vh-160px)] flex-col lg:mt-[40px]">
        <CategoryList className="px-[20px]" />

        <div className="mt-[40px] w-full flex-1 rounded-t-[20px] bg-white p-[20px] lg:hidden">
          <h3 className="mb-[20px] text-h4-bold text-gray-09">노트</h3>
          <CategoryAccordionList className="h-[90%] overflow-auto" />
        </div>
        <AddNoteFloatingButton />
      </main>
    </CommonLayout>
  )
}
