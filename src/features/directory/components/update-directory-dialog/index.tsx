'use client'

import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'

const formSchema = z.object({
  name: z.string().min(1, '폴더 이름을 입력해주세요').max(20, '폴더 이름은 20자까지 가능합니다'),
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

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    const validationError = (errors.name?.message as string) || '잘못된 입력입니다.'

    alert(validationError)
  }

  useEffect(() => {
    if (!open) {
      form.reset({
        name: prevName ?? '',
        emoji: prevEmoji ?? '📁',
      })
    }
  }, [open, form, prevName, prevEmoji])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setEmojiOpen(false)
      }
    }

    if (emojiOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01'
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
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="w-full">
            <div className="flex h-[40px] w-full">
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <button
                      onClick={() => setEmojiOpen(!emojiOpen)}
                      type="button"
                      className="focus:outline-none"
                    >
                      <div className="flex-center mr-[10px] size-[40px] rounded-[8px] bg-background-base-02 text-xl">
                        {field.value}
                      </div>
                    </button>

                    {emojiOpen && (
                      <div
                        ref={emojiPickerRef}
                        className="fixed right-1/2 top-[120px] translate-x-1/2"
                      >
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <input
                        {...field}
                        placeholder="폴더 이름"
                        disabled={isPending}
                        className="w-full border-b border-border-divider py-[10px] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[40px] flex w-full justify-end text-button2">
              <DialogClose asChild className="cursor-pointer">
                <span className="p-[4px] text-button-text-tertiary">취소</span>
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
