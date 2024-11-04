'use client'

import { useCreateNoteContext } from '@/features/note/contexts/create-note-context'

const TitleInput = () => {
  const { noteTitle, setNoteTitle } = useCreateNoteContext()

  return (
    <input
      value={noteTitle}
      onChange={(e) => setNoteTitle(e.target.value)}
      className="mt-[54px] w-full border-b border-border-divider px-[16px] py-[24px] align-middle text-title2 ring-offset-transparent placeholder:text-title2 placeholder:text-text-placeholder-02 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
      placeholder="새로운 노트"
    />
  )
}

export default TitleInput
