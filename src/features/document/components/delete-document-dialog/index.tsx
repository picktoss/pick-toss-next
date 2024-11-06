import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import DirectoryDialog from '@/features/quiz/components/directory-dialog'

const DeleteDocumentDialog = () => {
  return (
    <>
      <DirectoryDialog
        triggerComponent={
          <button className="flex-center w-[72px] flex-col rounded-lg bg-background-critical p-2 text-text1-medium text-text-primary-inverse">
            <Icon name="bin" className="mb-[4px]" />
            삭제
          </button>
        }
        title={'노트를 삭제할까요?'}
        content={
          // data : 해당 노트 이름, 문제 개수 필요
          <Text typography="text1-medium">
            최근 이슈 노트와 <span className="text-text-wrong">14개의 문제</span>가 <br /> 모두
            삭제됩니다
          </Text>
        }
        onConfirm={() => {}}
        confirmText="삭제하기"
      />
    </>
  )
}

export default DeleteDocumentDialog
