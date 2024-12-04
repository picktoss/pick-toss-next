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
              {myCollectionsData?.collections.map((collection) => (
                <StartQuizDrawer
                  key={collection.id}
                  collectionId={collection.id}
                  emoji={collection.emoji}
                  multipleChoiceCount={collection.quizCount}
                  oxCount={collection.quizCount}
                  category={collection.collectionField}
                  title={collection.name}
                  description={'asdasd'}
                  isBookMarked={true}
                  bookMarkCount={collection.bookmarkCount}
                  trigger={
                    <Collection
                      collectionId={collection.id}
                      emoji={collection.emoji}
                      title={collection.name}
                      category={collection.collectionField}
                      problemCount={collection.quizCount}
                      lastUpdated="2일 전"
                      isBookMarked={true}
                      bookMarkCount={collection.bookmarkCount}
                    />
                  }
                />
              ))}
            </CollectionList>
          ),
          'save-collection': isBookmarkedCollectionLoading ? (
            <Loading center />
          ) : (
            <CollectionList>
              {bookmarkedCollectionsData?.collections.map((collection) => (
                <StartQuizDrawer
                  key={collection.id}
                  collectionId={collection.id}
                  emoji={collection.emoji}
                  multipleChoiceCount={collection.quizCount}
                  oxCount={collection.quizCount}
                  category={collection.collectionField}
                  title={collection.name}
                  description={'asdasd'}
                  isBookMarked={true}
                  bookMarkCount={collection.bookmarkCount}
                  trigger={
                    <Collection
                      collectionId={collection.id}
                      emoji={collection.emoji}
                      title={collection.name}
                      category={collection.collectionField}
                      problemCount={collection.quizCount}
                      lastUpdated="2일 전"
                      isBookMarked={true}
                      bookMarkCount={collection.bookmarkCount}
                    />
                  }
                />
              ))}
            </CollectionList>
          ),
        }}
      />
    </>
  )
}

export default MyCollection
