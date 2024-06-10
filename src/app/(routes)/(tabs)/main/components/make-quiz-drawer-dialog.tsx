'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { useCheckList } from '@/hooks/use-check-list'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { CreateQuizzesResponse, createQuizzes } from '@/apis/fetchers/quiz/create-quizzes'
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

const DEFAULT_POINT = 5

const QUIZ_COUNT_OPTIONS = [3, 5, 10, 15, 20]

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

  const { mutate: mutateCreateQuizzes } = useMutation({
    mutationKey: ['create-quizzes'],
    mutationFn: (documentIds: number[]) => {
      setStartedState(true)

      return createQuizzes({
        documentIds,
        point: DEFAULT_POINT,
        quizType,
        accessToken: session.data?.user.accessToken || '',
      })
    },
    onSuccess: ({ quizSetId }) => {
      router.push(`/quiz?quizSetId=${quizSetId}`)
    },
  })

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-h-[480px] min-w-[560px] rounded-[12px] border-none py-[26px]">
          {startedCreate ? <Loading center /> : <MakeQuizDialogContent categories={categories} />}
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
          <MakeQuizDrawerContent categories={categories} createQuizzes={mutateCreateQuizzes} />
        )}
      </DrawerContent>
    </Drawer>
  )
}

function MakeQuizDialogContent({
  categories,
}: // createQuizzes,
{
  categories: CategoryDTO[]
  // createQuizzes: () => void
}) {
  console.error(categories)
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
            <FakeSelectTrigger emoji={categories[0].emoji} value={categories[0].name} />
          </div>

          <div className="flex items-center">
            <div className="w-[52px] shrink-0 text-body2-medium text-gray-08">노트</div>
            <FakeSelectTrigger value="10개" className="w-[95px]" />
          </div>

          <div className="flex items-center">
            <div className="w-[52px] text-body2-medium text-gray-08">퀴즈 수</div>
            <Select defaultValue="5">
              <SelectTrigger className="w-[85px] border-none bg-gray-01 pl-[14px] text-body1-bold outline-none">
                <SelectValue placeholder="10" />
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
            <li className="text-text-medium text-gray-08">
              <span className="line-clamp-1">대충 매우 긴 문서 이름을 가진 문서</span>
            </li>
            <li className="text-text-medium text-gray-08">
              <span>최근 이슈</span>
            </li>
            <li className="text-text-medium text-gray-08">
              <span>회계원리</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[8px]">
        <div className="text-center text-small1-regular">
          <span className="text-gray-06">나의 별: </span>
          <span className="text-gray-08">16개</span>
        </div>
        <Button variant="gradation" className="flex w-[335px] gap-[10px] text-white">
          <div>퀴즈 시작</div>
          <div className="flex items-start gap-[8px] rounded-[16px] px-[10px] py-[3px]">
            <Image src={icons.star} width={16} height={16} alt="" className="mt-px" />
            <div className="text-text-bold">5</div>
          </div>
        </Button>
      </div>
    </div>
  )
}

function MakeQuizDrawerContent({
  categories,
  createQuizzes,
}: {
  categories: CategoryDTO[]
  createQuizzes: UseMutateFunction<CreateQuizzesResponse, Error, number[], unknown>
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
  } = useCheckList([{ id: 0, name: '', order: 0, checked: false }])

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

        <SelectCheckItems
          items={step === 'folder' ? categoryList : documentList}
          isAllChecked={step === 'folder' ? isCategoryAllChecked() : isDocumentAllChecked()}
          unCheckAll={step === 'folder' ? unCheckCategoryAll : unCheckDocumentAll}
          checkAll={step === 'folder' ? checkCategoryAll : checkDocumentAll}
          toggle={step === 'folder' ? toggleCategoryChecked : toggleDocumentChecked}
        />
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
              onClick={() => createQuizzes(getDocumentCheckedIds() as number[])}
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
}) {
  const { items, isAllChecked, unCheckAll, checkAll, toggle } = props

  return (
    <div className="mt-[24px]">
      <div className="flex h-[38px] items-end gap-[16px] px-[27px] py-[9px]">
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

      <div className="mb-[7px] px-[19px]">
        <div className="h-px w-full rounded-full bg-gray-01" />
      </div>

      <div className="flex max-h-[280px] flex-col gap-[3px] overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="flex h-[38px] items-end gap-[16px] px-[27px] py-[9px] ">
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
              {item.emoji ? item.emoji : ''} {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
