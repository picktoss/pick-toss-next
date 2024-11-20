'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { MouseEvent, useState } from 'react'
import NoCollectionDialog from '../../collection/components/no-collection-dialog'
import DirectoryDialog from './directory-dialog'
import AddCollectionDrawer from '@/features/collection/components/add-collection-drawer'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuizCardMenu = ({ quizId }: { quizId: number }) => {
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false)
  const [isOpenNoCollection, setIsOpenNoCollection] = useState(false)

  const handleClickBookmark = (e: MouseEvent) => {
    e.preventDefault()

    const isEmptyCollection = !checkExistCollection() // 유저의 컬렉션이 있는지 확인

    if (isEmptyCollection) setIsOpenNoCollection(true) // 컬렉션이 없으면 no collection dialog 노출
    else setIsAddCollectionOpen(true) // 아닐 경우, 컬렉션에 추가 drawer 오픈
  }

  const checkExistCollection = () => {
    // 임시
    const isExistCollection = false
    return isExistCollection
  }

  return (
    <div className="flex-center size-fit gap-[12px]">
      <button onClick={handleClickBookmark}>
        <Icon name="add-book-mark" className="size-[20px]" />
      </button>
      <NoCollectionDialog isOpen={isOpenNoCollection} onOpenChange={setIsOpenNoCollection} />
      <AddCollectionDrawer isOpen={isAddCollectionOpen} onOpenChange={setIsAddCollectionOpen} />

      <DirectoryDialog
        triggerComponent={
          <button>
            <Icon name="bin" className="size-[20px]" />
          </button>
        }
        title={'문제를 삭제할까요?'}
        content={
          <Text typography="text1-medium" color="secondary">
            삭제한 문제는 다시 복구할 수 없으며, <br />
            해당 문제가 컬렉션에 포함되어 있을 경우, <br /> 컬렉션에서도 제거됩니다.
          </Text>
        }
        onConfirm={() => {}}
        confirmText="문제 삭제"
      />
    </div>
  )
}

export default QuizCardMenu
