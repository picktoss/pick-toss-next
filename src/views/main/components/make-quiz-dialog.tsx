import { useQuizCountMutation } from '@/actions/fetchers/document/quiz-count/mutation'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { QuizType } from '@/actions/types/dto/quiz.dto'
import { DEFAULT_QUIZ_COUNT, QUIZ_COUNT_OPTIONS } from '@/constants/quiz'
import { useCheckList } from '@/shared/hooks/use-check-list'
import { SelectDocumentItem } from '@/types/quiz'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import Image from 'next/image'
import icons from '@/constants/icons'
import { CategorySelector, DocumentSelector, QuizCountSelector } from './make-quiz-dialog-selector'

interface Props {
  categories: CategoryDTO[]
  handleCreateQuizzes: ({ documentIds, count }: { documentIds: number[]; count: number }) => void
  quizType: QuizType
  filteredIgnoreIds: number[]
}

// MakeQuizDialog 컴포넌트
const MakeQuizDialog = ({
  categories,
  handleCreateQuizzes,
  quizType,
  filteredIgnoreIds,
}: Props) => {
  const { data: session } = useSession()
  const userPoints = session?.user.dto.point || 0

  const [selectCategoryId, setSelectCategoryId] = useState<CategoryDTO['id']>(categories[0]?.id)
  const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [maxQuizCount, setMaxQuizCount] = useState(
    QUIZ_COUNT_OPTIONS[QUIZ_COUNT_OPTIONS.length - 1]
  )
  const { mutate: quizCountMutate, isPending } = useQuizCountMutation()

  const [documentMap, setDocumentMap] = useState<Record<CategoryDTO['id'], SelectDocumentItem[]>>(
    () => {
      return categories.reduce((acc, category) => {
        acc[category.id] = [
          ...category.documents.map((document) => ({ ...document, checked: false })),
        ]
        return acc
      }, {} as Record<CategoryDTO['id'], SelectDocumentItem[]>)
    }
  )

  const { list: documentList, set: setDocumentList } = useCheckList([] as SelectDocumentItem[], {
    ignoreIds: filteredIgnoreIds,
  })

  const allSelectedDocuments = Object.values(documentMap).flatMap((documents) =>
    documents.filter((document) => document.checked)
  )

  const curCategory = categories.find((category) => category.id === selectCategoryId)!

  useEffect(() => {
    if (allSelectedDocuments.length > 0) {
      quizCountMutate(
        {
          documentIds: allSelectedDocuments.map((document) => document.id),
          type: quizType,
        },
        {
          onSuccess: (data) => {
            setMaxQuizCount(data.quizCount)

            if (quizCount > data.quizCount) {
              setQuizCount(DEFAULT_QUIZ_COUNT)
            }
          },
        }
      )
    }
  }, [allSelectedDocuments.length])

  useEffect(() => {
    setDocumentMap((prev) => ({
      ...prev,
      [curCategory.id]: documentList,
    }))
  }, [documentList])

  useEffect(() => {
    setDocumentList(documentMap[selectCategoryId])
  }, [selectCategoryId])

  return (
    <div className="">
      <div className="flex flex-col gap-[8px] text-center">
        <h4 className="text-h4-bold text-gray-09">객관식 퀴즈</h4>
        <p className="text-text-medium text-gray-07">원하는 폴더와 노트, 퀴즈 수를 선택해주세요</p>
      </div>

      <div className="mb-[33px] mt-[40px] flex h-[226px] justify-between gap-[19px] pl-[46px] pr-[17px]">
        <div className="flex flex-1 flex-col justify-around">
          <div className="flex items-center">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">폴더</div>
            <CategorySelector
              categories={categories}
              selectCategoryId={selectCategoryId}
              setSelectCategoryId={setSelectCategoryId}
            />
          </div>

          <div className="flex items-center">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">노트</div>
            <DocumentSelector filteredIgnoreIds={filteredIgnoreIds} />
          </div>

          <div className="flex items-center">
            <div className="w-[52px] text-body2-medium text-gray-08">퀴즈 수</div>
            <QuizCountSelector
              quizCount={quizCount}
              setQuizCount={setQuizCount}
              isPendingQuizCount={isPending}
              maxQuizCount={maxQuizCount}
            />
          </div>
        </div>

        <div className="flex h-[226px] w-[192px] flex-col overflow-hidden rounded-[12px] border border-gray-02 bg-gray-01">
          <div className="bg-gray-06 pb-[12px] pt-[14px] text-center text-small1-bold text-white">
            선택된 노트
          </div>
          <ul className="flex flex-1 flex-col gap-[8px] overflow-auto px-[19px] py-[13px]">
            {allSelectedDocuments.map((document) => (
              <li key={document.id} className="text-text-medium text-gray-08">
                <span className="line-clamp-1">{document.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[8px]">
        <div className="text-center text-small1-regular">
          <span className="text-gray-06">나의 별: </span>
          <span className="text-gray-08">{userPoints}개</span>
        </div>
        <Button
          variant="gradation"
          className="flex w-[335px] gap-[10px] text-white"
          onClick={() => {
            handleCreateQuizzes({
              documentIds: allSelectedDocuments.map((document) => document.id),
              count: quizCount,
            })
          }}
        >
          <div>퀴즈 시작</div>
          <div className="flex items-start gap-[8px] rounded-[16px] px-[10px] py-[3px]">
            <Image src={icons.star} width={16} height={16} alt="" className="mt-px" />
            <div className="text-text-bold">{quizCount}</div>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default MakeQuizDialog
