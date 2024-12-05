'use client'

import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import Collection from './collection'
import CollectionList from './collection-list'
import Link from 'next/link'
import Icon from '@/shared/components/custom/icon'
import StartQuizDrawer from './start-quiz-drawer'
import { useBookmarkedCollections, useMyCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'

const tabs = [
  { key: 'create-collection', label: '만든 컬렉션' },
  { key: 'save-collection', label: '보관한 컬렉션' },
] as const

const MyCollection = () => {
  const [activeTab, setActiveTab] = useState<'create-collection' | 'save-collection'>(
    'create-collection'
  )

  const { data: myCollectionsData, isLoading: isMyCollectionLoading } = useMyCollections()
  const { data: bookmarkedCollectionsData, isLoading: isBookmarkedCollectionLoading } =
    useBookmarkedCollections()
  const { data: bookmarkedCollections, isLoading: isBookmarkedLoading } = useBookmarkedCollections()

  return (
    <>
      <div className="flex h-[60px] border-b border-border-divider text-text-sub transition-all">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={cn(
              'flex-1',
              activeTab === tab.key && 'border-b-[2px] border-button-fill-selected'
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text
              typography="subtitle2-bold"
              className={cn(activeTab === tab.key && 'text-text-primary')}
            >
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <SwitchCase
        value={activeTab}
        caseBy={{
          'create-collection': isMyCollectionLoading ? (
            <Loading center />
          ) : (
            <CollectionList>
              <Link
                href="/collections/create"
                className="flex flex-col items-center gap-[12px] rounded-[16px] border-[3px] border-dashed border-border-default pt-[70px]"
              >
                <Icon name="plus-circle" className="size-[24px]" />
                <Text typography="subtitle2-bold">만들기</Text>
              </Link>
              {myCollectionsData?.collections.map((collection) => {
                const multipleChoiceCount =
                  collection.quizzes?.filter((quiz) => quiz.quizType === 'MULTIPLE_CHOICE')
                    .length ?? 0
                const oxCount =
                  collection.quizzes?.filter((quiz) => quiz.quizType === 'MIX_UP').length ?? 0

                return (
                  <StartQuizDrawer
                    key={collection.id}
                    collectionId={collection.id}
                    emoji={collection.emoji}
                    multipleChoiceCount={multipleChoiceCount}
                    oxCount={oxCount}
                    category={collection.collectionField}
                    title={collection.name}
                    description={collection.description}
                    isOwner={true}
                    bookMarkCount={collection.bookmarkCount}
                    trigger={
                      <Collection
                        collectionId={collection.id}
                        emoji={collection.emoji}
                        title={collection.name}
                        category={collection.collectionField}
                        problemCount={multipleChoiceCount + oxCount}
                        lastUpdated="2일 전"
                        isOwner={true}
                        bookMarkCount={collection.bookmarkCount}
                      />
                    }
                  />
                )
              })}
            </CollectionList>
          ),
          'save-collection': isBookmarkedCollectionLoading ? (
            <Loading center />
          ) : (
            <CollectionList>
              {!isBookmarkedLoading &&
                bookmarkedCollectionsData?.collections.map((collection) => {
                  const isBookmarked = Boolean(
                    bookmarkedCollections?.collections.some(
                      (bookmarkedCollection) => bookmarkedCollection.id === collection.id
                    )
                  )
                  const multipleChoiceCount =
                    collection.quizzes?.filter((quiz) => quiz.quizType === 'MULTIPLE_CHOICE')
                      .length ?? 0
                  const oxCount =
                    collection.quizzes?.filter((quiz) => quiz.quizType === 'MIX_UP').length ?? 0

                  return (
                    <StartQuizDrawer
                      key={collection.id}
                      collectionId={collection.id}
                      emoji={collection.emoji}
                      multipleChoiceCount={multipleChoiceCount}
                      oxCount={oxCount}
                      category={collection.collectionField}
                      title={collection.name}
                      description={collection.description}
                      isBookMarked={isBookmarked}
                      bookMarkCount={collection.bookmarkCount}
                      trigger={
                        <Collection
                          collectionId={collection.id}
                          emoji={collection.emoji}
                          title={collection.name}
                          category={collection.collectionField}
                          problemCount={multipleChoiceCount + oxCount}
                          lastUpdated="2일 전"
                          isBookMarked={isBookmarked}
                          bookMarkCount={collection.bookmarkCount}
                        />
                      }
                    />
                  )
                })}
            </CollectionList>
          ),
        }}
      />
    </>
  )
}

export default MyCollection
