'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface Props {
  trigger: ReactNode
}

export function NotificationDialogPage({ trigger }: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (open === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-0">{trigger}</DialogTrigger>
        <DialogContent className="h-[540px] w-[560px] px-[24px] py-[20px]">
          <NotificationContent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <div role="button" onClick={() => setOpen(true)}>
        {trigger}
      </div>
      {open && (
        <div className="fixed left-0 top-0 z-50 size-full h-screen bg-white px-[20px]">
          <div className="relative flex h-[48px] items-center">
            <Button
              variant="ghost"
              className="ml-[-10px] rounded-[8px] p-[10px]"
              onClick={() => setOpen(false)}
            >
              <ChevronLeftIcon />
            </Button>
            <div className="center text-body1-bold text-gray-09">알림</div>
          </div>
          <NotificationContent />
        </div>
      )}
    </>
  )
}

function NotificationContent() {
  const [tap, setTap] = useState<'all' | 'quiz' | 'normal' | 'news'>('all')

  return (
    <div className="relative size-full">
      <div className="hidden text-h4-bold text-gray-09 lg:block">알림</div>
      <div className="mt-[24px] flex items-center gap-[8px] lg:mt-[8px]">
        <button
          onClick={() => setTap('all')}
          className={cn(
            'py-[8px] px-[16px] rounded-full !text-small1-bold bg-gray-02 text-gray-07',
            tap === 'all' && 'text-white bg-blue-04'
          )}
        >
          전체
        </button>
        <button
          onClick={() => setTap('quiz')}
          className={cn(
            'py-[8px] px-[16px] rounded-full !text-small1-bold bg-gray-02 text-gray-07',
            tap === 'quiz' && 'text-white bg-blue-04'
          )}
        >
          퀴즈
        </button>
        <button
          onClick={() => setTap('normal')}
          className={cn(
            'py-[8px] px-[16px] rounded-full !text-small1-bold bg-gray-02 text-gray-07',
            tap === 'normal' && 'text-white bg-blue-04'
          )}
        >
          일반
        </button>
        <button
          onClick={() => setTap('news')}
          className={cn(
            'py-[8px] px-[16px] rounded-full !text-small1-bold bg-gray-02 text-gray-07',
            tap === 'news' && 'text-white bg-blue-04'
          )}
        >
          업데이트·소식
        </button>
      </div>
      <div className="lg:center absolute bottom-1/2 right-1/2 flex translate-x-1/2 flex-col items-center gap-[16px]">
        <MegaphoneIcon />
        <p className="text-text-medium text-gray-06">아직 받은 알림이 없습니다</p>
      </div>
    </div>
  )
}

function MegaphoneIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="49.5" width="11" height="30.25" rx="3.39506" fill="#EAECEF" />
      <circle cx="70.125" cy="39.875" r="9.625" fill="#A2A6AB" />
      <path
        d="M19.25 25.8824L64.7791 10.5181C68.0801 9.40408 71.5 11.8594 71.5 15.3433V64.4067C71.5 67.8906 68.0801 70.3459 64.7791 69.2319L19.25 53.8676V25.8824Z"
        fill="#EAECEF"
      />
      <path
        d="M0 34.9352C0 29.3101 4.56006 24.75 10.1852 24.75H22V55H10.1852C4.56006 55 0 50.4399 0 44.8148V34.9352Z"
        fill="#D2D6DB"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1L1 9L9 17"
        stroke="#4B4F54"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
