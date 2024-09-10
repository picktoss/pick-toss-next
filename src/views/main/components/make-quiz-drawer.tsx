import { useQuizCountMutation } from '@/actions/fetchers/document/quiz-count/mutation'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { QuizType } from '@/actions/types/dto/quiz.dto'
import { DEFAULT_QUIZ_COUNT, QUIZ_COUNT_OPTIONS } from '@/constants/quiz'
import { FakeSelectTrigger } from '@/shared/components/fake-select-trigger'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import { useCheckList } from '@/shared/hooks/use-check-list'
import { cn } from '@/shared/lib/utils'
import { SelectDocumentItem } from '@/types/quiz'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'
import SelectCheckItems from './select-check-items'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import Loading from '@/shared/components/loading'
import Image from 'next/image'
import icons from '@/constants/icons'

interface Props {
  categories: CategoryDTO[]
  handleCreateQuizzes: ({ documentIds, count }: { documentIds: number[]; count: number }) => void
  closeDrawer: () => void
  quizType: QuizType
}

// MakeQuizDrawer 컴포넌트
const MakeQuizDrawer = ({ categories, handleCreateQuizzes, closeDrawer, quizType }: Props) => {
  const { data: session } = useSession()
  const userPoints = session?.user.dto.point || 0

  const [step, setStep] = useState<'folder' | 'document'>('folder')
  const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT)
  const [maxQuizCount, setMaxQuizCount] = useState(
    QUIZ_COUNT_OPTIONS[QUIZ_COUNT_OPTIONS.length - 1]
  )
  const { mutate: quizCountMutate, isPending } = useQuizCountMutation()

  const [openFolderDrawer, setOpenFolderDrawer] = useState(false)
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false)

  /** TODO: 어떤 카테고리를 보여줄 것인가 */
  // const [selectCategoryId, setSelectCategoryId] = useState<CategoryDTO['id']>(categories[0].id)
  const curCategory = categories[0]

  const {
    list: categoryList,
    isAllChecked: isCategoryAllChecked,
    checkAll: checkCategoryAll,
    unCheckAll: unCheckCategoryAll,
    getCheckedIds: getCategoryCheckedIds,
    toggle: toggleCategoryChecked,
  } = useCheckList([...categories.map((category) => ({ ...category, checked: false }))])

  const {
    list: documentList,
    set: setDocumentList,
    getCheckedIds: getDocumentCheckedIds,
    toggle: toggleDocumentChecked,
    isAllCheckedWithoutIgnored: isDocumentAllCheckedWithoutIgnored,
    checkAllWithoutIgnored: checkDocumentAllWithoutIgnored,
    unCheckAllWithoutIgnored: unCheckDocumentAllWithoutIgnored,
  } = useCheckList([] as SelectDocumentItem[], {
    ignoreIds: categories.flatMap((category) =>
      category.documents
        .filter(
          (document) =>
            document.documentStatus === 'UNPROCESSED' ||
            document.documentStatus === 'DEFAULT_DOCUMENT'
        )
        .map((document) => document.id)
    ),
  })

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
            <Drawer open={openFolderDrawer} onOpenChange={setOpenFolderDrawer}>
              <DrawerTrigger
                className="cursor-pointer"
                onClick={() => {
                  setStep('folder')
                  unCheckDocumentAllWithoutIgnored()
                }}
              >
                <FakeSelectTrigger
                  emoji={curCategory.emoji}
                  value={curCategory.name}
                  className="w-[186px]"
                />
              </DrawerTrigger>
              <DrawerContent className="h-[510px]">
                <SelectDrawerContent
                  step={step}
                  selectCheckItems={
                    <SelectCheckItems
                      items={step === 'folder' ? categoryList : documentList}
                      isAllChecked={
                        step === 'folder'
                          ? isCategoryAllChecked()
                          : isDocumentAllCheckedWithoutIgnored()
                      }
                      unCheckAll={
                        step === 'folder' ? unCheckCategoryAll : unCheckDocumentAllWithoutIgnored
                      }
                      checkAll={
                        step === 'folder' ? checkCategoryAll : checkDocumentAllWithoutIgnored
                      }
                      toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
                      selectType={step === 'folder' ? 'category' : 'document'}
                    />
                  }
                  init={() => {
                    unCheckCategoryAll()
                    unCheckDocumentAllWithoutIgnored()
                    setStep('folder')
                  }}
                  next={() => {
                    if (step === 'folder') {
                      const checkedCategoryIds = getCategoryCheckedIds()
                      setDocumentList(
                        categories
                          .filter((category) => checkedCategoryIds.includes(category.id))
                          .flatMap((category) =>
                            category.documents.map((document) => ({
                              ...document,
                              checked: false,
                            }))
                          )
                      )
                      setStep('document')
                    } else if (step === 'document') {
                      setOpenFolderDrawer(false)
                    }
                  }}
                />
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">노트</div>
            <Drawer open={openDocumentDrawer} onOpenChange={setOpenDocumentDrawer}>
              <DrawerTrigger className="cursor-pointer">
                <FakeSelectTrigger
                  className="w-[74px]"
                  value={`${getDocumentCheckedIds().length}개`}
                />
              </DrawerTrigger>
              <DrawerContent className="h-[510px]">
                <SelectDrawerContent
                  step={step}
                  selectCheckItems={
                    <SelectCheckItems
                      items={step === 'folder' ? categoryList : documentList}
                      isAllChecked={
                        step === 'folder'
                          ? isCategoryAllChecked()
                          : isDocumentAllCheckedWithoutIgnored()
                      }
                      unCheckAll={
                        step === 'folder' ? unCheckCategoryAll : unCheckDocumentAllWithoutIgnored
                      }
                      checkAll={
                        step === 'folder' ? checkCategoryAll : checkDocumentAllWithoutIgnored
                      }
                      toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
                      selectType={step === 'folder' ? 'category' : 'document'}
                    />
                  }
                  init={() => {
                    unCheckCategoryAll()
                    unCheckDocumentAllWithoutIgnored()
                    setStep('folder')
                  }}
                  next={() => {
                    if (step === 'folder') {
                      const checkedCategoryIds = getCategoryCheckedIds()
                      setDocumentList(
                        categories
                          .filter((category) => checkedCategoryIds.includes(category.id))
                          .flatMap((category) =>
                            category.documents.map((document) => ({
                              ...document,
                              checked: false,
                            }))
                          )
                      )
                      setStep('document')
                    } else if (step === 'document') {
                      setOpenDocumentDrawer(false)
                    }
                  }}
                />
              </DrawerContent>
            </Drawer>
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
          <Select
            defaultValue={String(DEFAULT_QUIZ_COUNT)}
            onValueChange={(value) => setQuizCount(+value)}
            value={String(quizCount)}
          >
            <SelectTrigger className="w-[85px] border-none bg-gray-01 pl-[14px] text-body1-bold outline-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="relative flex min-h-[100px] min-w-[85px]">
              {isPending ? (
                <Loading center size="xs" />
              ) : (
                <>
                  {QUIZ_COUNT_OPTIONS.filter((option) => option <= maxQuizCount).map((option) => (
                    <SelectItem
                      key={option}
                      value={String(option)}
                      className="flex justify-center px-0"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
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

// MakeQuizDrawer 내부에서 사용되는 컴포넌트들
interface SelectDrawerContentProps {
  step: 'folder' | 'document'
  selectCheckItems: ReactNode
  next: () => void
  init: () => void
}

function SelectDrawerContent({ step, selectCheckItems, next, init }: SelectDrawerContentProps) {
  return (
    <div className="flex flex-1 flex-col justify-between pb-[22px] pt-[40px]">
      <div>
        <div className="flex gap-[21px] px-[24px] text-h4-bold text-gray-09">
          <div role="button" className={cn(step === 'folder' ? 'text-gray-09' : 'text-gray-06')}>
            폴더
          </div>
          {step === 'document' && (
            <div role="button" className="text-gray-09">
              노트
            </div>
          )}
        </div>

        <div className="mt-[24px]">{selectCheckItems}</div>
      </div>

      <div className="px-[20px]">
        {step === 'folder' ? (
          <Button className="w-full" onClick={() => next()}>
            노트 선택
          </Button>
        ) : (
          <div className="flex w-full gap-[6px]">
            <Button className="flex-[100]" variant="secondary" onClick={() => init()}>
              초기화
            </Button>
            <Button className="flex-[230]" onClick={() => next()}>
              완료
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
