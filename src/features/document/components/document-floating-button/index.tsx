import NewQuizDrawer from '@/features/quiz/components/new-quiz-drawer'
import ReplayQuizDrawer from '@/features/quiz/components/replay-quiz-drawer'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'

interface Props {
  documentId: number
  documentName: string
  directoryEmoji: string
  savedQuizCount: number
  startAddQuizzes: (quizCount: number, quizType: Quiz.Type) => void
  quizTypes: Quiz.Type[]
}

const DocumentFloatingButton = ({
  documentId,
  documentName,
  directoryEmoji,
  savedQuizCount,
  startAddQuizzes,
  quizTypes,
}: Props) => {
  return (
    <div className="flex-center fixed bottom-[43px] right-1/2 z-50 w-[60dvw] min-w-[266px] max-w-[270px] translate-x-1/2 rounded-full bg-background-toast px-[28px] py-[10px] text-button2 text-button-label-primary shadow-float-thick">
      <ReplayQuizDrawer
        triggerComponent={
          <button className="flex-center border-r border-icon-secondary py-[5.5px] pr-[20px]">
            <Icon name="past-record" className="mr-[4px] size-[16px]" />
            <Text className="text-button-label-primary">다시풀기</Text>
          </button>
        }
        documentId={Number(documentId)}
        documentName={documentName}
        directoryEmoji={directoryEmoji}
        savedQuizCount={savedQuizCount}
        quizTypes={quizTypes}
      />

      <NewQuizDrawer
        triggerComponent={
          <button className="flex-center py-[5.5px] pl-[20px]">
            <Icon name="picktoss" fill="var(--color-orange-500)" className="mr-[4px] size-[16px]" />
            <Text className="bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">
              퀴즈 만들기
            </Text>
          </button>
        }
        documentId={Number(documentId)}
        documentName={documentName}
        directoryEmoji={directoryEmoji}
        startAddQuizzes={startAddQuizzes}
      />
    </div>
  )
}

export default DocumentFloatingButton
