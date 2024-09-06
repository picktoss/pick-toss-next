'use client'

import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/shared/components/loading'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { FrequentlyWrongNoteItem } from './frequently-wrong-note-item'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const TopFive = ({ className }: Props) => {
  const { data: documents, isLoading } = useQuery(queries.document.topFive())
  const { clickedEvent } = useAmplitudeContext()

  return (
    <div className={cn(className)}>
      <section className="relative flex min-h-[340px] flex-col gap-[24px] rounded-none bg-white p-[20px] pb-[17px] lg:min-h-[400px] xl:rounded-[12px]">
        <h2 className="text-h4-bold text-gray-09">내가 자주 틀린 노트 TOP5</h2>
        {isLoading ? (
          <Loading size="small" center />
        ) : (
          <>
            {documents && documents.length > 0 ? (
              <>
                {documents?.map((document, index) => (
                  <FrequentlyWrongNoteItem
                    key={document.id}
                    rank={index + 1}
                    redirectUrl={`/document/${document.id}`}
                    title={document.name}
                    categoryName={document.category.name}
                    wrongCount={document.incorrectAnswerCount}
                    onClick={() =>
                      clickedEvent({
                        buttonType: 'topFive',
                        buttonName: 'top_five_list_item',
                      })
                    }
                  />
                ))}
              </>
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
    </div>
  )
}
