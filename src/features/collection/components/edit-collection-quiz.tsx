'use client'

import DirectorySelect from '../../directory/components/directory-select'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import SelectableQuizCard from './selectable-quiz-card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import { useCollectionInfo, useUpdateCollectionQuizzes } from '@/requests/collection/hooks'
import { useDirectories } from '@/requests/directory/hooks'
import { useDirectoryQuizzes } from '@/requests/quiz/hooks'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/shared/components/custom/loading'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/shared/hooks/use-toast'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  quizzes: z.array(z.number()).min(5, '최소 5개의 문제를 선택해주세요'),
})

type FormValues = z.infer<typeof formSchema>

const EditCollectionQuiz = () => {
  const router = useRouter()
  const { id } = useParams()
  const { data: collectionInfoData } = useCollectionInfo(Number(id))

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizzes: [],
    },
  })

  const { data: directoriesData, isLoading: directoriesLoading } = useDirectories()
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(null)
  const [allChecked, setAllChecked] = useState(false)

  const { data: directoryQuizzesData, isLoading: directoryQuizzesLoading } =
    useDirectoryQuizzes(selectedDirectoryId)

  const { mutate: updateCollectionQuizzesMutate, isPending: isUpdateCollectionQuizzesPending } =
    useUpdateCollectionQuizzes()

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

  const onSubmit = (values: FormValues) => {
    if (isUpdateCollectionQuizzesPending) return

    updateCollectionQuizzesMutate(
      {
        collectionId: Number(id),
        payload: {
          quizzes: values.quizzes,
        },
      },
      {
        onSuccess: () => {
          router.replace(`/collections/${id}`)
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: '컬렉션 수정에 실패했습니다.',
            description: '다시 시도해주세요.',
          })
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

  useEffect(() => {
    if (!collectionInfoData) return
    form.reset({
      quizzes: collectionInfoData.quizzes.map((quiz) => quiz.id),
    })
  }, [collectionInfoData, form])

  const selectedQuizCount = form.watch('quizzes').length

  if (!collectionInfoData || directoriesLoading || directoryQuizzesLoading) {
    return <Loading center />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-[27px]">
          <Text typography="title3" className="text-text-primary">
            컬렉션의 문제를 수정해주세요
          </Text>
          <Text typography="text1-medium" className="mt-[8px] text-text-sub">
            5문제 이상 선택해주세요.
          </Text>
        </div>

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
              type="submit"
              variant="largeRound"
              colors="primary"
              className="flex-1"
              disabled={selectedQuizCount < 5 || isUpdateCollectionQuizzesPending}
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
