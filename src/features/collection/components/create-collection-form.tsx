'use client'

import { useEffect, useState } from 'react'
import DirectorySelect from '../../directory/components/directory-select'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import SelectableQuizCard from './selectable-quiz-card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import { useDirectories } from '@/requests/directory/hooks'
import { useDirectoryQuizzes } from '@/requests/quiz/hooks'
import { useRouter } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Textarea } from '@/shared/components/ui/textarea'
import CategoryTag from '@/shared/components/custom/category-tag'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { CATEGORIES } from '@/features/category/config'
import { useCreateCollection } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/ui/input'
import { toast } from '@/shared/hooks/use-toast'
import GoBackButton from '@/shared/components/custom/go-back-button'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

const CategoryId = z.enum([
  'IT',
  'LAW',
  'BUSINESS_ECONOMY',
  'SOCIETY_POLITICS',
  'LANGUAGE',
  'MEDICINE_PHARMACY',
  'ART',
  'SCIENCE_ENGINEERING',
  'HISTORY_PHILOSOPHY',
  'OTHER',
])

const formSchema = z.object({
  title: z.string().min(1, '컬렉션 이름을 입력해주세요'),
  description: z
    .string()
    .min(1, '컬렉션 설명을 입력해주세요')
    .max(200, '컬렉션 설명은 200자를 초과할 수 없습니다'),
  emoji: z.string().min(1, '이모지를 선택해주세요'),
  categoryCode: CategoryId,
  quizzes: z.array(z.number()),
})

type FormValues = z.infer<typeof formSchema>

const CreateCollectionForm = () => {
  const { collectionCreateClickEvent: collectionCreateEvent } = useAmplitudeContext()
  const router = useRouter()
  const [step, setStep] = useState<'select-document' | 'create-form'>('select-document')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      emoji: '🥹',
      categoryCode: CATEGORIES[0]?.id ?? 'IT',
      quizzes: [],
    },
  })

  const { data: directoriesData, isLoading: directoriesLoading } = useDirectories()
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(null)
  const [allChecked, setAllChecked] = useState(false)

  const { data: directoryQuizzesData, isLoading: directoryQuizzesLoading } =
    useDirectoryQuizzes(selectedDirectoryId)

  const { mutate: createCollectionMutate, isPending: isCreateCollectionPending } =
    useCreateCollection()

  const handleSelectAllClick = (check: boolean) => {
    if (!directoryQuizzesData) return

    setAllChecked(check)
    if (check) {
      const quizIds = directoryQuizzesData.quizzes.map((quiz) => quiz.id)
      form.setValue('quizzes', quizIds)
      return
    }
    form.setValue('quizzes', [])
  }

  const onSelectableQuizCardClick = (quizId: number) => {
    const currentQuizzes = form.getValues('quizzes')
    if (currentQuizzes.includes(quizId)) {
      form.setValue(
        'quizzes',
        currentQuizzes.filter((id) => id !== quizId)
      )
      return
    }
    form.setValue('quizzes', [...currentQuizzes, quizId])
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    const quizzes = form.getValues('quizzes')
    if (quizzes.length < 5) {
      toast({
        description: '최소 5개의 문제를 선택해주세요.',
      })
      return
    }

    setStep('create-form')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const quizzes = form.getValues('quizzes')
    if (quizzes.length < 5) {
      toast({
        description: '최소 5개의 문제를 선택해주세요.',
      })
      setStep('select-document')
      return
    }

    const values = form.getValues()
    const result = formSchema.safeParse(values)

    if (!result.success) {
      toast({
        description: result.error.errors[0]?.message,
      })
      return
    }

    createCollectionMutate(
      {
        name: values.title,
        description: values.description,
        collectionCategory: values.categoryCode,
        emoji: values.emoji,
        quizzes: values.quizzes,
      },
      {
        onSuccess: (data) => {
          collectionCreateEvent({
            category:
              CATEGORIES.find((category) => category.id === values.categoryCode)?.name ?? '',
          })
          router.replace(`/collections/${data.collectionId}`)
        },
      }
    )
  }

  useEffect(() => {
    if (!directoriesData) return
    setSelectedDirectoryId(directoriesData.directories[0]?.id || null)
  }, [directoriesData])

  useEffect(() => {
    if (!directoryQuizzesData) return
    const currentQuizzes = form.getValues('quizzes')
    setAllChecked(currentQuizzes.length === directoryQuizzesData.quizzes.length)
  }, [directoryQuizzesData, form])

  const selectedQuizCount = form.watch('quizzes').length

  if (step === 'select-document') {
    return (
      <Form {...form}>
        <form onSubmit={handleNextStep} className="px-[20px]">
          <div className="mt-[27px]">
            <Text typography="title3" className="text-text-primary">
              컬렉션으로 만들 문제를 선택해주세요
            </Text>
            <Text typography="text1-medium" className="mt-[8px] text-text-sub">
              5문제 이상 선택해주세요.
            </Text>
          </div>
          {directoriesLoading || directoryQuizzesLoading ? (
            <Loading center />
          ) : (
            <div className="mt-[24px] pb-[120px]">
              <div className="sticky top-[54px] z-20 flex h-[44px] items-center justify-between bg-white">
                <DirectorySelect
                  directories={directoriesData?.directories ?? []}
                  selectedDirectoryId={selectedDirectoryId}
                  selectDirectoryId={(directoryId: number) => setSelectedDirectoryId(directoryId)}
                />
                <Text typography="text2-bold" className="text-text-accent">
                  {selectedQuizCount}개 선택됨
                </Text>
              </div>

              <FormField
                control={form.control}
                name="quizzes"
                render={() => (
                  <FormItem>
                    <div className="mt-[16px] flex items-center gap-[12px]">
                      <Checkbox
                        id="check-all"
                        checked={allChecked}
                        onCheckedChange={handleSelectAllClick}
                      />
                      <Label htmlFor="check-all" className="!text-text1-medium text-text-secondary">
                        전체 선택
                      </Label>
                    </div>
                  </FormItem>
                )}
              />

              <ul className="mt-[23px] flex flex-col gap-[8px]">
                {directoryQuizzesData?.quizzes.map((quiz) => (
                  <SelectableQuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onSelect={onSelectableQuizCardClick}
                    selected={form.watch('quizzes').includes(quiz.id)}
                    order={form.watch('quizzes').indexOf(quiz.id) + 1}
                  />
                ))}
              </ul>

              <FixedBottom className="flex gap-[6px]">
                <Button
                  type="button"
                  variant="largeRound"
                  colors="tertiary"
                  className="w-[35%]"
                  onClick={() => form.setValue('quizzes', [])}
                >
                  초기화
                </Button>
                <Button
                  variant="largeRound"
                  colors="primary"
                  className="flex-1"
                  disabled={selectedQuizCount < 5}
                >
                  다음
                </Button>
              </FixedBottom>
            </div>
          )}
        </form>
      </Form>
    )
  }

  return (
    <>
      <header className="fixed top-0 z-50 flex h-[54px] w-full max-w-mobile shrink-0 items-center bg-white px-[16px]">
        <GoBackButton onClick={() => setStep('select-document')} />
        <div className="absolute right-1/2 translate-x-1/2">
          <Text as="h1" typography="subtitle2-medium">
            컬렉션 만들기
          </Text>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="mt-3 px-[20px]">
          <div>
            <div className="flex items-center gap-[20px]">
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <div className="flex-center size-[48px] rounded-[12px] bg-background-base-02 text-3xl">
                          {field.value}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <EmojiPicker
                          skinTonesDisabled
                          height="60vh"
                          onEmojiClick={(emojiData) => field.onChange(emojiData.emoji)}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="새로운 컬렉션"
                        className="flex-1 bg-transparent text-title2 placeholder:text-text-placeholder-02 focus:outline-none"
                        autoFocus
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[25px] flex items-center gap-[5px]">
              <Text typography="text1-medium" color="secondary">
                분야<span className="text-text-accent">*</span>
              </Text>
              <FormField
                control={form.control}
                name="categoryCode"
                render={({ field }) => (
                  <FormItem>
                    <Drawer>
                      <DrawerTrigger>
                        <div className="rounded-full bg-background-base-02 px-[14px] py-[5px]">
                          <CategoryTag
                            title={
                              CATEGORIES.find((category) => category.id === field.value)?.name ?? ''
                            }
                          />
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>카테고리를 선택해주세요.</DrawerTitle>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 p-4">
                          {CATEGORIES.map((category) => (
                            <DrawerClose key={category.id}>
                              <CategoryTag
                                title={category.name}
                                onClick={() => field.onChange(category.id)}
                              />
                            </DrawerClose>
                          ))}
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[27px]">
              <Text typography="text1-medium" color="secondary">
                컬렉션 설명<span className="text-text-accent">*</span>
              </Text>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="mt-2 min-h-[130px] rounded-[8px] border-none bg-background-base-02"
                      />
                    </FormControl>
                    <Text typography="text2-medium" color="caption" className="mt-2">
                      200자 이내로 입력해주세요 ({field.value.length}/200)
                    </Text>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FixedBottom className="flex gap-[6px]">
            <Button
              type="submit"
              variant="largeRound"
              className="w-full"
              disabled={isCreateCollectionPending}
            >
              만들기
            </Button>
          </FixedBottom>
        </form>
      </Form>
    </>
  )
}

export default CreateCollectionForm
