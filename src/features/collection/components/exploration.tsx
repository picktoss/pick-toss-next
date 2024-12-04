'use client'

import Icon from '@/shared/components/custom/icon'
import Collection from './collection'
import CollectionList from './collection-list'
import Text from '@/shared/components/ui/text'
import StartQuizDrawer from './start-quiz-drawer'
import { useBookmarkedCollections, useCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'

const controlButtons = ['분야', '퀴즈 유형', '문제 수']

const Exploration = () => {
  const { data: collectionsData, isLoading } = useCollections()
  const { data: bookmarkedCollections, isLoading: isBookmarkedLoading } = useBookmarkedCollections()

  return (
    <>
      <div className="flex h-[60px] items-center justify-between px-[16px]">
        <div className="flex gap-[8px]">
          {controlButtons.map((button) => (
            <button
              key={button}
              className="flex items-center gap-[4px] rounded-full border bg-button-fill-outlined py-[7.5px] pl-[14px] pr-[10px]"
            >
              <Text typography="button4" className="text-button-label-tertiary">
                {button}
              </Text>
              <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
            </button>
          ))}
        </div>
        <Icon name="sort" className="size-[16px]" />
      </div>

      <CollectionList>
        {isBookmarkedLoading || isLoading ? (
          <Loading center />
        ) : (
          collectionsData?.collections.map((collection) => {
            const isBookmarked = Boolean(
              bookmarkedCollections?.collections.some(
                (bookmarkedCollection) => bookmarkedCollection.id === collection.id
              )
            )
            return (
              <StartQuizDrawer
                key={collection.id}
                collectionId={collection.id}
                emoji={collection.emoji}
                multipleChoiceCount={collection.quizCount}
                oxCount={collection.quizCount}
                category={collection.collectionField}
                title={collection.name}
                description={'asdasd'}
                isBookMarked={isBookmarked}
                bookMarkCount={collection.bookmarkCount}
                trigger={
                  <Collection
                    collectionId={collection.id}
                    emoji={collection.emoji}
                    title={collection.name}
                    category={collection.collectionField}
                    problemCount={collection.quizCount}
                    lastUpdated="2일 전"
                    isBookMarked={isBookmarked}
                    bookMarkCount={collection.bookmarkCount}
                  />
                }
              />
            )
          })
        )}
      </CollectionList>
    </>
  )
}

export default Exploration
