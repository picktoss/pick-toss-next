'use client'

import { useGetTopFiveQuery } from '@/apis/fetchers/document/get-top-five/query'
import Loading from '@/components/loading'
import icons from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'

export default function TopFive() {
  const { data: documents, isLoading } = useGetTopFiveQuery()

  return (
    <section className="relative flex min-h-[400px] flex-col gap-[24px] rounded-none bg-white p-[20px] pb-[17px] xl:rounded-[12px]">
      <h2 className="text-h4-bold text-gray-09">내가 자주 틀린 노트 TOP5</h2>
      {isLoading ? (
        <Loading size="small" center />
      ) : (
        <ul className="*:border-b *:border-gray-01 *:px-[12px]">
          {documents?.map((document, index) => (
            <FrequentlyWrongNoteItem
              key={document.id}
              rank={index + 1}
              redirectUrl={`/document/${document.id}`}
              title={document.name}
              categoryName={document.category.name}
              wrongCount={document.incorrectAnswerCount}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function FrequentlyWrongNoteItem({
  rank,
  redirectUrl,
  title,
  categoryName,
  wrongCount,
}: {
  rank: number
  redirectUrl: string
  title: string
  categoryName: string
  wrongCount: number
}) {
  return (
    <Link
      href={redirectUrl}
      className="flex h-[62px] items-center justify-between last:border-none"
    >
      <div className="flex items-center gap-[16px]">
        <span className="text-body2-bold text-orange-06">{rank}</span>
        <div className="flex flex-col gap-[4px]">
          <div className="line-clamp-1 text-body1-medium text-gray-08">{title}</div>
          <div className="line-clamp-1 text-small1-regular text-gray-06">{categoryName}</div>
        </div>
      </div>
      <div className="flex shrink-0 gap-[40px] pl-[12px]">
        <div className="text-body2-medium text-orange-05">오답 {wrongCount}회</div>
        <Image src={icons.chevronRight} width={6} height={10} alt="" />
      </div>
    </Link>
  )
}
