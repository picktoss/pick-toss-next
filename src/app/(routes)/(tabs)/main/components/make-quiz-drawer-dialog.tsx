'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { useCheckList } from '@/hooks/use-check-list'
import { useMutation } from '@tanstack/react-query'
import { createQuizzes } from '@/apis/fetchers/quiz/create-quizzes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading'
import Image from 'next/image'
import icons from '@/constants/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FakeSelectTrigger } from '@/components/fake-select-trigger'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const QUIZ_COUNT_OPTIONS = [3, 5, 10, 15, 20]
const DEFAULT_QUIZ_COUNT = 5

interface Props {
  categories: CategoryDTO[]
  trigger: ReactNode
  quizType?: 'MIX_UP' | 'MULTIPLE_CHOICE'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MakeQuizDrawerDialog({ trigger, categories, quizType = 'MIX_UP' }: Props) {
  const session = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [startedCreate, setStartedState] = useState(false)

  const userPoints = session.data?.user.dto.point || 0

  const { mutate: mutateCreateQuizzes } = useMutation({
    mutationKey: ['create-quizzes'],
    mutationFn: ({ documentIds, count }: { documentIds: number[]; count: number }) =>
      createQuizzes({
        documentIds,
        point: count,
        quizType,
        accessToken: session.data?.user.accessToken || '',
      }),
  })

  const handleCreateQuizzes = ({
    documentIds,
    count,
  }: {
    documentIds: number[]
    count: number
  }) => {
    if (documentIds.length < 1) {
      /** TODO: Toast 메시지로 대체 */
      alert('문서를 선택 해 주세요.')
      return
    }
    if (userPoints < count) {
      /** TODO: Toast 메시지로 대체 */
      alert('보유 별이 부족합니다.')
      return
    }

    setStartedState(true)

    mutateCreateQuizzes(
      {
        documentIds,
        count,
      },
      {
        onSuccess: ({ quizSetId }) => {
          router.push(`/quiz?quizSetId=${quizSetId}`)
        },
      }
    )
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-h-[480px] min-w-[560px] rounded-[12px] border-none py-[26px]">
          {startedCreate ? (
            <Loading center />
          ) : (
            <MakeQuizDialogContent
              categories={categories}
              handleCreateQuizzes={handleCreateQuizzes}
            />
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-[510px]">
        {startedCreate ? (
          <Loading center />
        ) : (
          <MakeQuizDrawerContent
            categories={categories}
            handleCreateQuizzes={handleCreateQuizzes}
          />
        )}
      </DrawerContent>
    </Drawer>
  )
}

function MakeQuizDialogContent({
  categories,
  handleCreateQuizzes,
}: {
  categories: CategoryDTO[]
  handleCreateQuizzes: ({ documentIds, count }: { documentIds: number[]; count: number }) => void
}) {
  const session = useSession()

  const [openSelectCategory, setOpenSelectCategory] = useState(false)
  const [selectCategoryId, setSelectCategoryId] = useState<number>(categories[0].id)

  const [openSelectDocuments, setOpenSelectDocuments] = useState(false)
  const {
    list: documentList,
    set: setDocumentList,
    isAllChecked: isDocumentAllChecked,
    checkAll: checkDocumentAll,
    unCheckAll: unCheckDocumentAll,
    getCheckedIds: getDocumentCheckedIds,
    toggle: toggleDocumentChecked,
  } = useCheckList([] as { id: number; name: string; order: number; checked: false }[])

  const curCategory = categories.find((category) => category.id === selectCategoryId)!

  useEffect(() => {
    const category = categories.find((category) => category.id === selectCategoryId)!

    setDocumentList(
      category.documents.map((document) => ({
        ...document,
        checked: false,
      }))
    )
  }, [categories, setDocumentList, selectCategoryId])

  const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT)

  const userPoints = session.data?.user.dto.point || 0

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
            <DropdownMenu open={openSelectCategory} onOpenChange={setOpenSelectCategory}>
              <DropdownMenuTrigger className="w-full">
                <FakeSelectTrigger emoji={curCategory.emoji} value={curCategory.name} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-[8px] pb-[10px] pt-[18px]">
                <div className="px-[18px] text-body2-medium">전체</div>
                <div className="flex flex-col">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="flex items-center gap-[8px] rounded-[8px] px-[18px] py-[8px] text-body2-regular hover:bg-gray-01"
                      onClick={() => {
                        setOpenSelectCategory(false)
                        setSelectCategoryId(category.id)
                      }}
                    >
                      {category.emoji && <div>{category.emoji}</div>}
                      <div>{category.name}</div>
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">노트</div>
            <DropdownMenu open={openSelectDocuments} onOpenChange={setOpenSelectDocuments}>
              <DropdownMenuTrigger className="w-[95px]">
                <FakeSelectTrigger value={`${getDocumentCheckedIds().length}개`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[320px]">
                <SelectCheckItems
                  items={documentList}
                  isAllChecked={isDocumentAllChecked()}
                  unCheckAll={unCheckDocumentAll}
                  checkAll={checkDocumentAll}
                  toggle={toggleDocumentChecked}
                  selectType="document"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center">
            <div className="w-[52px] text-body2-medium text-gray-08">퀴즈 수</div>
            <Select
              defaultValue={String(DEFAULT_QUIZ_COUNT)}
              onValueChange={(value) => setQuizCount(+value)}
            >
              <SelectTrigger className="w-[85px] border-none bg-gray-01 pl-[14px] text-body1-bold outline-none">
                <SelectValue placeholder={quizCount} />
              </SelectTrigger>
              <SelectContent className="flex min-w-[85px]">
                {QUIZ_COUNT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option}
                    value={String(option)}
                    className="flex justify-center px-0"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex h-[226px] w-[192px] flex-col overflow-hidden rounded-[12px] border border-gray-02 bg-gray-01">
          <div className="bg-gray-06 pb-[12px] pt-[14px] text-center text-small1-bold text-white">
            선택된 노트
          </div>
          <ul className="flex flex-1 flex-col gap-[8px] overflow-auto px-[19px] py-[13px]">
            {documentList
              .filter((document) => getDocumentCheckedIds().includes(document.id))
              .map((document) => (
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
            const documentCheckedIds = getDocumentCheckedIds() as number[]
            handleCreateQuizzes({
              documentIds: documentCheckedIds,
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

function MakeQuizDrawerContent({
  categories,
  handleCreateQuizzes,
}: {
  categories: CategoryDTO[]
  handleCreateQuizzes: ({ documentIds, count }: { documentIds: number[]; count: number }) => void
}) {
  const [step, setStep] = useState<'folder' | 'document'>('folder')

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
    isAllChecked: isDocumentAllChecked,
    checkAll: checkDocumentAll,
    unCheckAll: unCheckDocumentAll,
    getCheckedIds: getDocumentCheckedIds,
    toggle: toggleDocumentChecked,
  } = useCheckList([] as { id: number; name: string; order: number; checked: false }[])

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

        <div className="mt-[24px]">
          <SelectCheckItems
            items={step === 'folder' ? categoryList : documentList}
            isAllChecked={step === 'folder' ? isCategoryAllChecked() : isDocumentAllChecked()}
            unCheckAll={step === 'folder' ? unCheckCategoryAll : unCheckDocumentAll}
            checkAll={step === 'folder' ? checkCategoryAll : checkDocumentAll}
            toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
            selectType={step === 'folder' ? 'category' : 'document'}
          />
        </div>
      </div>

      <div className="px-[20px]">
        {step === 'folder' ? (
          <Button
            className="w-full"
            onClick={() => {
              const checkedCategoryIds = getCategoryCheckedIds()
              setDocumentList(
                categories
                  .filter((category) => checkedCategoryIds.includes(category.id))
                  .flatMap((category) =>
                    category.documents.map((document) => ({ ...document, checked: false }))
                  )
              )
              setStep('document')
            }}
          >
            노트 선택
          </Button>
        ) : (
          <div className="flex w-full gap-[6px]">
            <Button
              className="flex-[100]"
              variant="secondary"
              onClick={() => {
                unCheckCategoryAll()
                setStep('folder')
              }}
            >
              초기화
            </Button>
            <Button
              className="flex-[230]"
              onClick={() => {
                const documentCheckedIds = getDocumentCheckedIds() as number[]
                handleCreateQuizzes({
                  documentIds: documentCheckedIds,
                  count: 3,
                })
              }}
            >
              완료
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

type CheckItem = {
  id: number
  name: string
  checked: boolean
  emoji?: string
}

function SelectCheckItems(props: {
  items: CheckItem[]
  isAllChecked: boolean
  unCheckAll: () => void
  checkAll: () => void
  toggle: (id: number) => void
  selectType?: 'category' | 'document'
}) {
  const { items, isAllChecked, unCheckAll, checkAll, toggle, selectType = 'category' } = props

  return (
    <div>
      <div className="flex gap-[16px] px-[27px] py-[9px]">
        <Checkbox
          id="allFolder"
          className="size-[20px]"
          checked={isAllChecked}
          onClick={() => {
            isAllChecked ? unCheckAll() : checkAll()
          }}
        />
        <label
          htmlFor="allFolder"
          className="flex h-[20px] items-end text-body2-regular text-gray-08"
        >
          전체 <span className="text-orange-06">{items.length}</span>개
        </label>
      </div>

      {items.length > 0 && (
        <>
          <div className="mb-[7px] px-[19px]">
            <div className="h-px w-full rounded-full bg-gray-01" />
          </div>

          <div className="flex max-h-[280px] flex-col gap-[3px] overflow-auto pb-[10px]">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-[12px] px-[27px] py-[9px]">
                <div className="flex gap-[16px]">
                  <Checkbox
                    id={String(item.id)}
                    className="size-[20px]"
                    checked={item.checked}
                    onClick={() => toggle(item.id)}
                  />
                  <label
                    htmlFor={String(item.id)}
                    className="flex h-[20px] items-end text-body2-regular text-gray-08"
                  >
                    <span className="line-clamp-1">
                      {item.emoji ? item.emoji : ''} {item.name}
                    </span>
                  </label>
                </div>

                {selectType === 'document' && (
                  <Link
                    href={`/document/${item.id}`}
                    className="mt-[3px] shrink-0 text-small1-regular text-blue-05 underline underline-offset-2"
                  >
                    노트 보기
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
