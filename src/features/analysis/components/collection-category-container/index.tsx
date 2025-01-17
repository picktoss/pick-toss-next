import Text from '@/shared/components/ui/text'
import { CATEGORIES } from '@/features/category/config'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'

interface Props {
  isThisPeriod: boolean
  data?: Quiz.Response.GetWeeklyAnalysis['collectionsAnalysis']
}

const CollectionCategoryContainer = ({ isThisPeriod, data }: Props) => {
  const dataFormattedArray = data
    ? Object.entries(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ?.filter(([category, quizCount]) => quizCount !== 0)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ?.sort(([categoryA, a], [categoryB, b]) => b - a) ?? []
    : []

  const categoryLength = dataFormattedArray.length

  const totalQuizCount = data
    ? Object.values(data)?.reduce((accumulator, value) => accumulator + value, 0)
    : 0
  const mostQuizzesCategory =
    data && dataFormattedArray.length > 0
      ? dataFormattedArray.reduce(
          (maxKey: Collection.Field, [key, value]) =>
            data[maxKey] && value > data[maxKey] ? (key as Collection.Field) : maxKey,
          Object.keys(data)[0] as Collection.Field
        )
      : null

  return (
    <div className="px-[16px] pb-[126px] pt-[24px]">
      <Text as={'span'} typography="subtitle2-medium" color="sub">
        컬렉션
      </Text>

      <Text typography="title3" className="mb-[28px] mt-[8px]">
        {mostQuizzesCategory ? (
          <>
            <Text as={'span'} color="info">
              {CATEGORIES.find((value) => value.id === mostQuizzesCategory)?.name}
            </Text>{' '}
            컬렉션을 가장 많이 풀었어요
          </>
        ) : (
          '최근 푼 컬렉션이 없어요'
        )}
      </Text>

      <div className="flex h-[24px] w-full overflow-hidden rounded-[8px] bg-border-divider">
        {dataFormattedArray.map(([category, quizCount], index) => {
          const width = Math.round((quizCount / totalQuizCount) * 100)
          const color = CATEGORIES.find((value) => value.id === category)?.color

          if (quizCount === 0) return null

          return (
            <div
              key={'bar-' + category}
              className={cn(
                'h-full border-r-[2px] border-white',
                index === categoryLength - 1 && 'border-none'
              )}
              style={{ width: `${width}%`, backgroundColor: color }}
            />
          )
        })}
      </div>

      <div className="mt-[23px] grid grid-cols-2 gap-x-[50px] gap-y-[16px]">
        {dataFormattedArray.map(([category, quizCount]) => {
          const label = CATEGORIES.find((value) => value.id === category)?.name
          const color = CATEGORIES.find((value) => value.id === category)?.color

          if (quizCount === 0) return null

          return (
            <div key={'label-' + category} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-[8px] size-[12px] rounded-[4px]"
                  style={{ backgroundColor: color }}
                />
                <Text typography="text2-medium" className="mr-[12px]">
                  {label}
                </Text>
              </div>

              <Text typography="text2-medium" color="sub">
                {quizCount}문제
              </Text>
            </div>
          )
        })}
      </div>

      {isThisPeriod && dataFormattedArray.length === 0 && (
        <Link href={'/collections'}>
          <Button variant={'mediumRound'} colors={'secondary'} className="mt-[32px] w-full">
            풀만한 컬렉션 보러가기
          </Button>
        </Link>
      )}
    </div>
  )
}

export default CollectionCategoryContainer
