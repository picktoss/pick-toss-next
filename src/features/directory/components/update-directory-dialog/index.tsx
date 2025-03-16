'use client'

import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { isMobile } from 'react-device-detect'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'

const formSchema = z.object({
  name: z.string().min(1, '폴더 이름을 입력해주세요'),
  emoji: z.string().default('📁'),
})

type FormValues = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  directoryId: number | null
  prevName: string
  prevEmoji: string
}

const UpdateDirectoryDialog = ({ open, onOpenChange, directoryId, prevName, prevEmoji }: Props) => {
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [isFirstContentRender, setIsFirstContentRender] = useState(true)
  const [isInitialFocus, setIsInitialFocus] = useState(true)

  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const { mutate: updateDirectoryMutate, isPending } = useUpdateDirectoryInfo()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prevName ?? '',
      emoji: prevEmoji ?? '📁',
    },
  })

  const onSubmit = (values: FormValues) => {
    if (!directoryId) {
      return
    }

    updateDirectoryMutate({
      directoryId,
      name: values.name,
      emoji: values.emoji,
    })

    onOpenChange(false)
  }

  // 모바일 키보드 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setIsKeyboardOpen(window.visualViewport.height < window.innerHeight)
      }
    }
    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setIsKeyboardOpen(false)
      setIsInitialFocus(true)
      form.reset({
        name: prevName ?? '',
        emoji: prevEmoji ?? '📁',
      })
    }

    setIsFirstContentRender(open)
  }, [open, form, prevName, prevEmoji])

  useEffect(() => {
    if (!isKeyboardOpen) {
      setIsFirstContentRender(false)
    }
  }, [isKeyboardOpen])

  useEffect(() => {
    let previousFocus: HTMLElement

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setEmojiOpen(false)
      }
    }

    if (emojiOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // EmojiPicker가 열릴 때 이전 포커스 위치 저장
      previousFocus = document.activeElement as HTMLElement
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (previousFocus) {
        previousFocus.focus()
      }
    }
  }, [emojiOpen])

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // EmojiPicker가 열려있으면 Dialog를 닫지 않음
        if (emojiOpen && !newOpen) return
        onOpenChange(newOpen)
      }}
    >
      <DialogContent
        className={cn(
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01',
          isMobile && isFirstContentRender && '!top-[10%] !translate-y-0'
        )}
        displayCloseButton={false}
        onPointerDownOutside={(e) => {
          if (isPending) {
            e.preventDefault()
          }
        }}
      >
        <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">폴더 이름 바꾸기</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex h-[40px] w-full">
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <button
                        onClick={() => setEmojiOpen(!emojiOpen)}
                        type="button"
                        className="focus:outline-none"
                      >
                        <div className="flex-center mr-[10px] size-[40px] rounded-[8px] bg-background-base-02 text-xl">
                          {field.value}
                        </div>
                      </button>
                    </FormControl>
                  </FormItem>
                )}
              />

              {emojiOpen && (
                <div ref={emojiPickerRef} className="fixed right-1/2 top-[120px] translate-x-1/2">
                  <EmojiPicker
                    skinTonesDisabled
                    width="95vw"
                    height="40vh"
                    onEmojiClick={(emojiData, e) => {
                      e.preventDefault()
                      form.setValue('emoji', emojiData.emoji)
                      setEmojiOpen(false)
                    }}
                    className="max-w-mobile"
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <input
                        {...field}
                        autoFocus
                        disabled={isPending}
                        className="w-full border-b border-border-divider py-[10px] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
                        placeholder="폴더 이름"
                        ref={(e) => {
                          field.ref(e)
                          // 다이얼로그가 열릴 때 focus 및 텍스트 전체 선택
                          if (e && open && isInitialFocus) {
                            setTimeout(() => {
                              e.focus()
                              e.select()
                            }, 0)

                            setIsInitialFocus(false)
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[40px] flex w-full justify-end text-button2">
              <DialogClose asChild>
                <button type="button" className="p-[4px] text-button-text-tertiary">
                  취소
                </button>
              </DialogClose>
              <button type="submit" className={cn('ml-[21px] p-[4px] text-button-text-primary')}>
                저장
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDirectoryDialog
