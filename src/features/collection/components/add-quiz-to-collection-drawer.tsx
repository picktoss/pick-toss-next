'use client'

import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle } from '@/shared/components/ui/drawer'
import CategoryTag from '@/shared/components/custom/category-tag'
import { useAddQuizToCollection } from '@/requests/collection/hooks'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface Props {
  selectedQuizId: number
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

// AddQuizToCollectionDrawer 컴포넌트
const AddQuizToCollectionDrawer = ({ selectedQuizId, isOpen, onOpenChange }: Props) => {
  const { data } = useQuery(queries.collection.myListForAddQuiz(selectedQuizId))
  const { mutate: addQuizMutate } = useAddQuizToCollection(selectedQuizId)

  const { addToCollectionClickEvent } = useAmplitudeContext()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addQuiz = (collectionId: number) => {
    addToCollectionClickEvent()

    const payload = {
      collectionId,
      requestBody: { quizId: selectedQuizId },
    }

    addQuizMutate(payload)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent
        overlayProps={{ className: 'max-w-mobile mx-auto' }}
        className="mx-auto h-[80dvh] max-w-mobile rounded-t-[16px]"
      >
        <div className="my-[24px] flex h-[calc(100%-150px)] flex-col px-[17px]">
          <DrawerTitle className="mb-[20px] text-title3">원하는 컬렉션에 추가해주세요</DrawerTitle>

          <div className="flex grow flex-col gap-[24px] overflow-y-auto border-t py-[25px]">
            {/* 컬렉션 map */}
            {data &&
              data.collections.map((collection) => (
                <div key={collection.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <Text typography="subtitle2-medium" className="max-w-[142px] truncate">
                      {collection.emoji} {collection.name}
                    </Text>
                    <CategoryTag title={collection.collectionCategory} />
                  </div>

                  {collection.isQuizIncluded ? (
                    <Text typography="text1-medium" color="caption">
                      추가됨
                    </Text>
                  ) : (
                    <Button
                      onClick={() => addQuiz(collection.id)}
                      variant={'tinySquare'}
                      colors={'secondary'}
                      className="mr-[2px]"
                    >
                      추가하기
                    </Button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddQuizToCollectionDrawer
