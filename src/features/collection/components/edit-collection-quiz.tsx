'use client'

import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useCollectionInfo, useUpdateCollectionQuizzes } from '@/requests/collection/hooks'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/shared/components/custom/loading'
import { toast } from '@/shared/hooks/use-toast'
import EditQuizCard from './edit-quiz-card'
import { useEffect, useState } from 'react'
import DirectorySelect from '../../directory/components/directory-select'
import { useDirectories } from '@/requests/directory/hooks'
import { useDirectoryQuizzes } from '@/requests/quiz/hooks'
import SelectableQuizCard from './selectable-quiz-card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/shared/components/ui/form'

const formSchema = z.object({
  quizzes: z.array(z.number()),
})

type FormValues = z.infer<typeof formSchema>

const EditCollectionQuiz = () => {
  const collectionId = Number(useParams().id)
  const router = useRouter()
  const [isAddMode, setIsAddMode] = useState(false)
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(null)
  const [allChecked, setAllChecked] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizzes: [],
    },
  })

  const { data: collectionInfoData, isLoading: collectionInfoLoading } =
    useCollectionInfo(collectionId)
  const { data: directoriesData, isLoading: directoriesLoading } = useDirectories()
  const { data: directoryQuizzesData, isLoading: directoryQuizzesLoading } =
    useDirectoryQuizzes(selectedDirectoryId)

  const { mutate: updateCollectionQuizzesMutate, isPending: isUpdateCollectionQuizzesPending } =
    useUpdateCollectionQuizzes()

  const handleDeleteQuiz = (quizId: number) => {
    const currentQuizzes = form.getValues('quizzes')
    if (currentQuizzes.length <= 5) {
      toast({
        variant: 'destructive',
        title: '최소 5개의 문제가 필요합니다',
        description: '더 이상 문제를 삭제할 수 없습니다.',
      })
      return
    }

    form.setValue(
      'quizzes',
      currentQuizzes.filter((id) => id !== quizId)
    )
  }

  const handleSelectAllClick = (check: boolean) => {
    if (!directoryQuizzesData) return

    setAllChecked(check)
    const currentQuizzes = form.getValues('quizzes')

    if (check) {
      const newQuizIds = directoryQuizzesData.quizzes
        .map((quiz) => quiz.id)
        .filter((id) => !currentQuizzes.includes(id))
      form.setValue('quizzes', [...currentQuizzes, ...newQuizIds])
      return
    }

    const quizIdsToRemove = directoryQuizzesData.quizzes.map((quiz) => quiz.id)
    const remainingQuizzes = currentQuizzes.filter((id) => !quizIdsToRemove.includes(id))

    if (remainingQuizzes.length < 5) {
      toast({
        variant: 'destructive',
        title: '최소 5개의 문제가 필요합니다',
        description: '더 이상 문제를 삭제할 수 없습니다.',
      })
      return
    }

    form.setValue('quizzes', remainingQuizzes)
  }

  const onSelectableQuizCardClick = (quizId: number) => {
    const currentQuizzes = form.getValues('quizzes')
    if (currentQuizzes.includes(quizId)) {
      if (currentQuizzes.length <= 5) {
        toast({
          variant: 'destructive',
          title: '최소 5개의 문제가 필요합니다',
          description: '더 이상 문제를 삭제할 수 없습니다.',
        })
        return
      }
      form.setValue(
        'quizzes',
        currentQuizzes.filter((id) => id !== quizId)
      )
      return
    }
    form.setValue('quizzes', [...currentQuizzes, quizId])
  }

  const handleSubmit = (values: FormValues) => {
    if (values.quizzes.length < 5) {
      toast({
        variant: 'destructive',
        title: '최소 5개의 문제가 필요합니다',
      })
      return
    }

    updateCollectionQuizzesMutate(
      {
        collectionId,
        payload: {
          quizzes: values.quizzes,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: '컬렉션이 수정되었습니다.',
          })
          router.push(`/collections/${collectionId}`)
          router.refresh()
        },
      }
    )
  }

  useEffect(() => {
    if (!collectionInfoData) return
    form.setValue(
      'quizzes',
      collectionInfoData.quizzes.map((quiz) => quiz.id)
    )
  }, [collectionInfoData, form])

  useEffect(() => {
    if (!directoriesData?.directories.length) return
    setSelectedDirectoryId(directoriesData.directories[0]!.id)
  }, [directoriesData])

  useEffect(() => {
    if (!directoryQuizzesData) return
    const currentQuizzes = form.getValues('quizzes')
    setAllChecked(directoryQuizzesData.quizzes.every((quiz) => currentQuizzes.includes(quiz.id)))
  }, [directoryQuizzesData, form])

  if (collectionInfoLoading || !collectionInfoData) {
    return <Loading center />
  }

  if (isAddMode) {
    if (directoriesLoading || directoryQuizzesLoading) {
      return <Loading center />
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="sticky top-[54px] z-20 flex h-[44px] items-center justify-between bg-white">
            <DirectorySelect
              directories={directoriesData?.directories ?? []}
              selectedDirectoryId={selectedDirectoryId}
              selectDirectoryId={(directoryId: number) => setSelectedDirectoryId(directoryId)}
            />
            <Text typography="text2-bold" className="text-text-accent">
              {form.watch('quizzes').length}개 선택됨
            </Text>
          </div>

          <div className="mt-3 pb-[120px]">
            <div className="flex items-center gap-2">
              <Checkbox id="all" checked={allChecked} onCheckedChange={handleSelectAllClick} />
              <Label htmlFor="all">전체 선택</Label>
            </div>

            <ul className="mt-[23px] flex flex-col gap-[8px]">
              {directoryQuizzesData?.quizzes.map((quiz) => (
                <SelectableQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onSelect={() => onSelectableQuizCardClick(quiz.id)}
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
                onClick={() => setIsAddMode(false)}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="largeRound"
                className="flex-1"
                disabled={isUpdateCollectionQuizzesPending}
              >
                저장하기
              </Button>
            </FixedBottom>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex h-[44px] items-center justify-between">
          <Text typography="text1-medium">
            총 <span className="text-text-accent">{form.watch('quizzes').length}</span> 문제
          </Text>
          <button
            type="button"
            onClick={() => setIsAddMode(true)}
            className="flex items-center gap-3"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#EBEFF3" />
              <path
                d="M11.999 6.6665V17.3332"
                stroke="#4C5052"
                strokeWidth="1.33333"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M17.333 12.0005L6.66634 12.0005"
                stroke="#4C5052"
                strokeWidth="1.33333"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>

            <Text typography="subtitle2-medium" color="secondary">
              문제 추가
            </Text>
          </button>
        </div>

        <div className="mt-3 pb-[120px]">
          <ul className="mt-[23px] flex flex-col gap-[8px]">
            {collectionInfoData.quizzes.map((quiz) => (
              <EditQuizCard key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} />
            ))}
          </ul>

          <FixedBottom>
            <Button
              type="submit"
              variant="largeRound"
              className="w-full"
              disabled={isUpdateCollectionQuizzesPending}
            >
              저장하기
            </Button>
          </FixedBottom>
        </div>
      </form>
    </Form>
  )
}

export default EditCollectionQuiz
