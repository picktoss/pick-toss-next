'use client'

import Header from './components/header'
import NoteContent from './screens/note-content'
import Quiz from './screens/quiz'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { QuizListProvider } from './context/quiz-list-context'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/icon'
import NewQuizDrawer from '../shared/new-quiz-drawer'
import ReplayQuizDrawer from '../shared/replay-quiz-drawer'
import PickDrawer from './components/pick-drawer'

const tabs = [
  { key: 'note-content', label: '노트', component: <NoteContent /> },
  {
    key: 'quiz',
    label: '퀴즈',
    component: <Quiz />,
  },
] as const

const Note = () => {
  const [activeTab, setActiveTab] = useState<'note-content' | 'quiz'>('note-content')

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* tab */}
        <div className="sticky top-[54px]">
          <div className="flex items-center justify-between bg-background-base-01 text-text-disabled">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'grow px-[16px] pb-[12px] mt-[12px] border-b border-border-divider',
                  activeTab === tab.key && 'border-b-2 border-button-fill-selected'
                )}
              >
                <Text
                  typography="subtitle2-medium"
                  className={cn(
                    'transition-colors',
                    activeTab === tab.key && 'text-text-primary font-bold'
                  )}
                >
                  {tab.label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        <QuizListProvider>
          <PickDrawer />

          {tabs.find((tab) => tab.key === activeTab)?.component}
        </QuizListProvider>

        {/* bottom button */}
        <div className="flex-center fixed bottom-[130px] right-1/2 w-[266px] translate-x-1/2 rounded-full border border-border-default bg-background-base-01 px-[28px] py-[10px] text-button2 shadow-custom-shadow">
          <ReplayQuizDrawer
            triggerComponent={
              <button className="flex-center border-r border-border-divider py-[5.5px] pr-[20px]">
                <Icon name="past-record" className="mr-[4px] size-[16px]" />
                <Text className="text-button-text-secondary">다시풀기</Text>
              </button>
            }
          />

          <NewQuizDrawer
            triggerComponent={
              <button className="flex-center py-[5.5px] pl-[20px]">
                <Icon
                  name="picktoss"
                  fill="var(--color-orange-500)"
                  className="mr-[4px] size-[16px]"
                />
                <Text className="bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">
                  퀴즈 만들기
                </Text>
              </button>
            }
          />
        </div>
      </main>
    </>
  )
}

export default Note
