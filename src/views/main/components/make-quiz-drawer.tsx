import { useQuizCountMutation } from '@/actions/fetchers/document/quiz-count/mutation'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { QuizType } from '@/actions/types/dto/quiz.dto'
import { DEFAULT_QUIZ_COUNT, QUIZ_COUNT_OPTIONS } from '@/constants/quiz'
import { Button } from '@/shared/components/ui/button'
import { useCheckList } from '@/shared/hooks/use-check-list'
import { SelectDocumentItem } from '@/types/quiz'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import icons from '@/constants/icons'
import { FolderDrawer, DocumentDrawer } from './make-quiz-drawer-content'
import { QuizCountSelector } from './make-quiz-dialog-selector'

interface Props {
  categories: CategoryDTO[]
  handleCreateQuizzes: ({ documentIds, count }: { documentIds: number[]; count: number }) => void
  closeDrawer: () => void
  quizType: QuizType
  filteredIgnoreIds: number[]
}

// MakeQuizDrawer 컴포넌트
const MakeQuizDrawer = ({
  categories,
  handleCreateQuizzes,
  closeDrawer,
  quizType,
  filteredIgnoreIds,
}: Props) => {
  const { data: session } = useSession()
  const userPoints = session?.user.dto.point || 0

  const [step, setStep] = useState<'folder' | 'document'>('folder')
  const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [maxQuizCount, setMaxQuizCount] = useState(
    QUIZ_COUNT_OPTIONS[QUIZ_COUNT_OPTIONS.length - 1]
  )
  const { mutate: quizCountMutate, isPending } = useQuizCountMutation()

  /** TODO: 어떤 카테고리를 보여줄 것인가 */
  // const [selectCategoryId, setSelectCategoryId] = useState<CategoryDTO['id']>(categories[0].id)

  const initialCheckList = useMemo(() => {
    const checkList = [...categories.map((category) => ({ ...category, checked: false }))]
    return checkList
  }, [categories])

  const { list: documentList, getCheckedIds: getDocumentCheckedIds } = useCheckList(
    [] as SelectDocumentItem[],
    {
      ignoreIds: filteredIgnoreIds,
    }
  )

  const documentLength = getDocumentCheckedIds().length

  useEffect(() => {
    if (documentLength > 0) {
      quizCountMutate(
        {
          documentIds: getDocumentCheckedIds() as number[],
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
  }, [documentLength])

  return (
    <div className="px-[20px]">
      <div className="relative h-[48px]">
        <Button variant="ghost" size="icon" className="ml-[-12px]" onClick={() => closeDrawer()}>
          <X />
        </Button>
        <div className="center text-body1-bold text-gray-09">
          {quizType === 'MIX_UP' ? 'O/X 퀴즈' : '객관식 퀴즈'}
        </div>
      </div>

      <h3 className="text-h3-bold text-gray-09">
        원하는 폴더와 노트,
        <br />
        퀴즈 수를 선택해주세요
      </h3>

      <div className="mt-[48px]">
        <div className="flex items-center gap-[27px]">
          <div className="flex flex-col gap-[10px]">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">폴더</div>
            <FolderDrawer
              categories={categories}
              step={step}
              setStep={setStep}
              initialCheckList={initialCheckList}
              filteredIgnoreIds={filteredIgnoreIds}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">노트</div>
            <DocumentDrawer
              categories={categories}
              step={step}
              setStep={setStep}
              initialCheckList={initialCheckList}
              filteredIgnoreIds={filteredIgnoreIds}
            />
          </div>
        </div>

        <div className="mt-[12px] line-clamp-2 text-body2-regular text-orange-06">
          선택된 노트:{' '}
          <span className="text-body2-bold">
            {documentList
              .filter((document) => getDocumentCheckedIds().includes(document.id))
              .map((document) => document.name)
              .join(', ')}
          </span>
        </div>

        <div className="mt-[31px] flex flex-col gap-[10px]">
          <div className="w-[52px] text-body2-medium text-gray-08">퀴즈 수</div>
          <QuizCountSelector
            quizCount={quizCount}
            setQuizCount={setQuizCount}
            isPendingQuizCount={isPending}
            maxQuizCount={maxQuizCount}
          />
        </div>
      </div>

      <div className="mt-[68px] flex flex-col items-center gap-[8px]">
        <div className="text-center text-small1-regular">
          <span className="text-gray-06">나의 별: </span>
          <span className="text-gray-08">{userPoints}개</span>
        </div>
        <Button
          variant="gradation"
          className="flex w-[335px] gap-[10px] text-white"
          onClick={() => {
            handleCreateQuizzes({
              documentIds: getDocumentCheckedIds() as number[],
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

export default MakeQuizDrawer
