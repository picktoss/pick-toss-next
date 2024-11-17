import NotionDocument from '@/features/document/screens/notion-document'
import NewQuizDrawer from '@/features/quiz/components/new-quiz-drawer'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'

const CreateWithNotionPage = () => {
  return (
    <>
      <NotionDocument />

      <FixedBottom className="px-[20px]">
        <NewQuizDrawer
          triggerComponent={
            <Button
              variant={'largeRound'}
              colors={'primary'}
              className="flex-center h-[52px] w-full"
            >
              퀴즈 만들기
            </Button>
          }
        />
      </FixedBottom>
    </>
  )
}

export default CreateWithNotionPage
