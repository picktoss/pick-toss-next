'use client'

import Loading from '@/shared/components/loading'
import icons from '@/constants/icons'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export default function TopFive() {
  const { data: documents, isLoading } = useQuery({
    ...queries.document.topFive(),
  })

  return (
    <section className="relative flex min-h-[340px] flex-col gap-[24px] rounded-none bg-white p-[20px] pb-[17px] lg:min-h-[400px] xl:rounded-[12px]">
      <h2 className="text-h4-bold text-gray-09">내가 자주 틀린 노트 TOP5</h2>
      {isLoading ? (
        <Loading size="small" center />
      ) : (
        <>
          {documents && documents.length > 0 ? (
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
          ) : (
            <div className="center flex flex-col gap-[8px] text-center">
              <div className="text-body1-bold-eng text-gray-09">아직 틀린 노트가 없어요</div>
              <div className="text-body2-regular text-gray-07">
                퀴즈를 풀면 틀린 노트를 알려드려요
              </div>
            </div>
          )}
        </>
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
  const { clickedEvent } = useAmplitudeContext()

  return (
    <Link
      href={redirectUrl}
      className="flex h-[62px] items-center justify-between last:border-none"
      onClick={() =>
        clickedEvent({
          buttonType: 'topFive',
          buttonName: 'top_five_list_item',
        })
      }
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
