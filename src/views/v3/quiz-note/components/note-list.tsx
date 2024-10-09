import { PropsWithChildren } from 'react'

const NoteList = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-[132px] flex grow flex-col gap-[8px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {children}
    </div>
  )
}

export default NoteList
