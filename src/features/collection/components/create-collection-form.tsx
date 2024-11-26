'use client'

import { useEffect, useState } from 'react'
import DirectorySelect from '../../directory/components/directory-select'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import SelectableQuizCard from './selectable-quiz-card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import { useDirectories } from '@/requests/directory/hooks'
import { useDirectoryQuizzes } from '@/requests/quiz/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Textarea } from '@/shared/components/ui/textarea'

interface SearchParams {
  step: 'select-document' | 'create-form'
}

const CreateCollectionForm = () => {
  const router = useRouter()
  const stepValue = useSearchParams().get('step') as unknown as SearchParams['step']
  const step = ['select-document', 'create-form'].includes(stepValue)
    ? stepValue
    : 'select-document'

  const { data: directoriesData } = useDirectories()

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(null)
  const [selectedQuizIds, setSelectedQuizIds] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)

  const [emoji, setEmoji] = useState('🥹')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { data: directoryQuizzesData } = useDirectoryQuizzes(selectedDirectoryId)

  const handleSelectAllClick = (check: boolean) => {
    if (!directoryQuizzesData) return

    setAllChecked(check)
    if (check) {
      const quizIds = directoryQuizzesData.quizzes.map((quiz) => quiz.id)
      const unSelectedQuizIds = quizIds.filter((quizId) => !selectedQuizIds.includes(quizId))
      setSelectedQuizIds([...selectedQuizIds, ...unSelectedQuizIds])
      return
    }
    setSelectedQuizIds([])
  }

  const onSelectableQuizCardClick = (quizId: number) => {
    if (selectedQuizIds.includes(quizId)) {
      setSelectedQuizIds(selectedQuizIds.filter((id) => id !== quizId))
      return
    }
    setSelectedQuizIds([...selectedQuizIds, quizId])
  }

  useEffect(() => {
    if (!directoriesData) return
    setSelectedDirectoryId(directoriesData.directories[0].id)
  }, [directoriesData])

  useEffect(() => {
    if (!directoryQuizzesData) return
    selectedQuizIds.length === directoryQuizzesData.quizzes.length
      ? setAllChecked(true)
      : setAllChecked(false)
  }, [selectedQuizIds.length, directoryQuizzesData])

  const selectedQuizCount = selectedQuizIds.length

  if (step === 'select-document') {
    return (
      <>
        <div className="mt-[27px]">
          <Text typography="title3" className="text-text-primary">
            컬렉션으로 만들 문제를 선택해주세요
          </Text>
          <Text typography="text1-medium" className="mt-[8px] text-text-sub">
            5문제 이상 선택해주세요.
          </Text>
        </div>
        <div className="mt-[24px] pb-[120px]">
          <div className="sticky top-[54px] z-20 flex h-[44px] items-center justify-between bg-white">
            <DirectorySelect
              directories={directoriesData?.directories ?? []}
              selectedDirectoryId={selectedDirectoryId}
              selectDirectoryId={(directoryId: number) => setSelectedDirectoryId(directoryId)}
            />
            <Text typography="text2-bold" className="text-text-accent">
              {selectedQuizCount}개 선택됨
            </Text>
          </div>

          <div className="mt-[16px] flex items-center gap-[12px]">
            <Checkbox id="check-all" checked={allChecked} onCheckedChange={handleSelectAllClick} />
            <Label htmlFor="check-all" className="!text-text1-medium text-text-secondary">
              전체 선택
            </Label>
          </div>

          <ul className="mt-[23px] flex flex-col gap-[8px]">
            {directoryQuizzesData?.quizzes.map((quiz) => (
              <SelectableQuizCard
                key={quiz.id}
                quiz={quiz}
                onSelect={onSelectableQuizCardClick}
                selected={selectedQuizIds.includes(quiz.id)}
                order={selectedQuizIds.indexOf(quiz.id) + 1}
              />
            ))}
          </ul>

          <FixedBottom className="flex gap-[6px]">
            <Button
              variant={'largeRound'}
              colors={'tertiary'}
              className="w-[35%]"
              onClick={() => setSelectedQuizIds([])}
            >
              초기화
            </Button>
            <Button
              variant={'largeRound'}
              colors={'primary'}
              className="flex-1"
              disabled={selectedQuizCount < 5}
              onClick={() => router.push('/collections/create?step=create-form')}
            >
              다음
            </Button>
          </FixedBottom>
        </div>
      </>
    )
  }

  return (
    <div className="mt-3">
      <div>
        {/* 이모지 선택 및 컬렉션 이름 입력 */}
        <div className="flex items-center gap-[20px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex-center size-[48px] rounded-[12px] bg-background-base-02 text-3xl">
                {emoji}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <EmojiPicker
                skinTonesDisabled
                height={'60vh'}
                onEmojiClick={(emojiData) => {
                  setEmoji(emojiData.emoji)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새로운 컬렉션"
            className="flex-1 bg-transparent text-title2 placeholder:text-text-placeholder-02 focus:outline-none"
            autoFocus
          />
        </div>

        {/* 분야 선택 */}
        <div className="mt-[25px]">
          <Text typography="text1-medium" color="secondary">
            분야<span className="text-text-accent">*</span>
          </Text>
          <div className="px-[14px] py-[5px]"></div>
        </div>

        {/* 컬렉션 설명 */}
        <div className="mt-[27px]">
          <Text typography="text1-medium" color="secondary">
            컬렉션 설명<span className="text-text-accent">*</span>
          </Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 min-h-[130px] rounded-[8px] border-none bg-background-base-02"
          />
          <Text typography="text2-medium" color="caption" className="mt-2">
            200자 이내로 입력해주세요 ({description.length}/200)
          </Text>
        </div>
      </div>
      <FixedBottom className="flex gap-[6px]">
        <Button variant={'largeRound'} disabled className="w-full">
          만들기
        </Button>
      </FixedBottom>
    </div>
  )
}

export default CreateCollectionForm
