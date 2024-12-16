'use client'

import QuizCard from '@/features/quiz/components/quiz-card'
import { useCollectionInfo } from '@/requests/collection/hooks'
import { useCollectionQuizzesInfo } from '@/requests/quiz/hooks'
import CategoryTag from '@/shared/components/custom/category-tag'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Loading from '@/shared/components/custom/loading'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useUser } from '@/shared/hooks/use-user'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
  id: number
}

const DetailInfo = ({ id }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const { user } = useUser()
  const { data: collectionData } = useCollectionInfo(id)
  const { mutate: createQuizSetMutate } = useCollectionQuizzesInfo()

  const quizCounts = useMemo(() => {
    if (!collectionData?.quizzes) return { multiple: 0, ox: 0 }

    return collectionData.quizzes.reduce(
      (acc, quiz) => {
        if (quiz.quizType === 'MULTIPLE_CHOICE') {
          acc.multiple += 1
        } else if (quiz.quizType === 'MIX_UP') {
          acc.ox += 1
        }
        return acc
      },
      { multiple: 0, ox: 0 }
    )
  }, [collectionData?.quizzes])

  const isMine = user?.id === collectionData?.member.creatorId

  const handleQuizStart = () => {
    if (!collectionData) {
      return
    }

    createQuizSetMutate(
      { collectionId: id },
      {
        onSuccess: ({ quizSetId, quizSetType }) =>
          router.push(
            `/quiz/${quizSetId}?quizSetType=${quizSetType}&collectionName=${collectionData.name}&collectionEmoji=${collectionData.emoji}&redirectUrl=${pathname}`
          ),
      }
    )
  }

  /** TODO: Spinner로 대체 */
  if (!collectionData) return <Loading center size="xs" />

  return (
    <>
      <div>
        <div className="flex flex-col items-center pb-[27px] pt-[16px]">
          <div className="flex-center size-[64px] rounded-full bg-background-base-02 text-hero">
            {collectionData.emoji}
          </div>
          <Text as="h1" typography="title2" className="mt-[16px]">
            {collectionData.name}
          </Text>
          <CategoryTag title={collectionData.collectionCategory} className="mt-[10px]" />
        </div>
        <div className="h-px w-full bg-border-divider" />
        <div className="p-[24px_16px_64px_16px]">
          <div>
            <Text typography="subtitle1-bold" className="text-text-primary">
              {quizCounts.multiple + quizCounts.ox} 문제
            </Text>
            <div className="mt-[8px] flex items-center gap-[8px]">
              <Text typography="text1-medium" className="text-text-sub">
                객관식 {quizCounts.multiple}
              </Text>
              <div className="size-[3px] rounded-full bg-background-container-01" />
              <Text typography="text1-medium" className="text-text-sub">
                O/X {quizCounts.ox}
              </Text>
            </div>
          </div>
          <Text as="p" typography="text1-medium" className="mt-[24px] text-text-secondary">
            {collectionData.description}
          </Text>
        </div>
      </div>

      {isMine && (
        <div className="flex-1 bg-background-base-02 px-[16px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            {collectionData.quizzes.map((quiz) => (
              <QuizCard
                header={
                  <div className="flex items-center justify-between text-icon-tertiary">
                    <Text typography="title3" className="text-text-accent">
                      Q.
                    </Text>

                    {/* 내가 만든 컬렉션일 경우 디렉토리 > 문서이름 이런식으로 breadcrumb 필요 */}
                    {/* <Text typography='text2-medium' color='caption'>전공 공부 {'>'} 최근이슈</Text> */}
                  </div>
                }
                key={quiz.id}
                quiz={quiz}
              />
            ))}
          </div>
        </div>
      )}

      <FixedBottom>
        <Button className="w-full" onClick={handleQuizStart}>
          퀴즈 시작하기
        </Button>
      </FixedBottom>
    </>
  )
}

export default DetailInfo
