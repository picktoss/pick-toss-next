'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import { useDocumentContext } from '../../contexts/document-context'
import { useDeleteDocument } from '@/requests/document/hooks'

interface Props {
  documentId: number
  quizCount: number
}

const DeleteDocumentSwipeButton = ({ documentId, quizCount }: Props) => {
  const { selectedDirectoryId } = useDirectoryContext()
  const { sortOption } = useDocumentContext()

  const { mutate: deleteDocumentMutation } = useDeleteDocument({
    directoryId: String(selectedDirectoryId),
    sortOption,
  })

  const handleClickDelete = () => {
    deleteDocumentMutation([documentId])
  }

  return (
    <>
      <ConfirmDialogWidget
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
            선택한 노트와 <span className="text-text-wrong">{quizCount}개의 문제</span>가 <br />{' '}
            모두 삭제됩니다
          </Text>
        }
        confirmButton={
          <button onClick={handleClickDelete} className="ml-[21px] p-[4px]">
            <Text color="critical">삭제하기</Text>
          </button>
        }
      />
    </>
  )
}

export default DeleteDocumentSwipeButton
