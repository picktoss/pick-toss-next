'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { CreateDocumentProtector } from './create-document-protector'
import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'

interface Props {
  categoryId?: number
}

export default function AddNoteFloatingButton({ categoryId }: Props) {
  const { clickedEvent } = useAmplitudeContext()

  return (
    <CreateDocumentProtector
      skeleton={
        <div className="fixed bottom-[120px] right-[20px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:hidden">
          <Button className="flex h-[48px] w-[136px] items-center gap-[8px] text-body2-bold text-white ">
            노트 추가하기 <PlusIcon />
          </Button>
        </div>
      }
    >
      <div className="fixed bottom-[120px] right-[20px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:hidden">
        <Link href={`/create${categoryId ? `?default=${categoryId}` : ''}`}>
          <Button
            className="flex h-[48px] w-[136px] items-center gap-[8px] text-body2-bold text-white"
            onClick={() =>
              clickedEvent({
                buttonType: 'addNote',
                buttonName: 'add_document_floating_button',
              })
            }
          >
            노트 추가하기 <PlusIcon />
          </Button>
        </Link>
      </div>
    </CreateDocumentProtector>
  )
}

function PlusIcon() {
  return (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.49902 0V12" stroke="white" strokeWidth="1.54011" />
      <path d="M12.5 6L0.5 6" stroke="white" strokeWidth="1.54011" />
    </svg>
  )
}
