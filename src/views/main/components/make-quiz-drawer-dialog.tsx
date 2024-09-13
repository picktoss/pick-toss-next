'use client'

import { ReactNode, useCallback, useMemo, useState } from 'react'
import { CategoryDTO } from '@/actions/types/dto/category.dto'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { QuizType } from '@/actions/types/dto/quiz.dto'
import { useCreateQuizzesMutation } from '@/actions/fetchers/quiz/create-quizzes/mutation'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog'
import { CategoryProtector } from '@/shared/components/category-protector'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import MakeQuizDialog from './make-quiz-dialog'
import MakeQuizDrawer from './make-quiz-drawer'

interface Props {
  categories: CategoryDTO[]
  trigger: ReactNode
  quizType?: QuizType
}

// MakeQuizModal 컴포넌트
const MakeQuizDrawerDialog = ({ trigger, categories, quizType = 'MIX_UP' }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [startedCreate, setStartedState] = useState(false)

  const userPoints = session?.user.dto.point || 0

  const { clickedEvent, quizMadeEvent } = useAmplitudeContext()

  const { mutate: mutateCreateQuizzes } = useCreateQuizzesMutation()

  const filteredIgnoreIds = useMemo(() => {
    const ignoreIds = categories.flatMap((category) =>
      category.documents
        .filter(
          (document) =>
            document.documentStatus === 'UNPROCESSED' ||
            document.documentStatus === 'DEFAULT_DOCUMENT'
        )
        .map((document) => document.id)
    )

    return ignoreIds
  }, [categories])

  const handleCreateQuizzes = useCallback(
    ({ documentIds, count }: { documentIds: number[]; count: number }) => {
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
          point: count,
          quizType,
        },
        {
          onSuccess: ({ quizSetId }) => {
            quizMadeEvent({
              quizType: quizType === 'MULTIPLE_CHOICE' ? 'multiple' : 'ox',
              count,
            })
            router.push(`/quiz?quizSetId=${quizSetId}`)
          },
        }
      )
    },
    [userPoints, quizType, mutateCreateQuizzes, quizMadeEvent, router]
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <CategoryProtector>
          <DialogTrigger
            asChild
            onClick={() =>
              clickedEvent({
                buttonType: 'makeQuiz',
                buttonName: `${quizType}_drawer_dialog_button`,
              })
            }
          >
            {trigger}
          </DialogTrigger>
        </CategoryProtector>
        <DialogContent className="min-h-[480px] min-w-[560px] rounded-[12px] border-none py-[26px]">
          <MakeQuizDialog
            startedCreate={startedCreate}
            categories={categories}
            handleCreateQuizzes={handleCreateQuizzes}
            quizType={quizType}
            filteredIgnoreIds={filteredIgnoreIds}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <CategoryProtector>
        <DrawerTrigger
          asChild
          className="cursor-pointer"
          onClick={() =>
            clickedEvent({
              buttonType: 'makeQuiz',
              buttonName: `${quizType}_drawer_dialog_button`,
            })
          }
        >
          {trigger}
        </DrawerTrigger>
      </CategoryProtector>
      <DrawerContent className="rounded-none" hideSidebar>
        <MakeQuizDrawer
          startedCreate={startedCreate}
          categories={categories}
          handleCreateQuizzes={handleCreateQuizzes}
          closeDrawer={() => setOpen(false)}
          quizType={quizType}
          filteredIgnoreIds={filteredIgnoreIds}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default MakeQuizDrawerDialog
