'use client'

import { useCreateDirectory } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
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
}

const CreateDirectoryDialog = ({ open, onOpenChange }: Props) => {
  const [emojiOpen, setEmojiOpen] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const { mutate: createDirectoryMutate, isPending } = useCreateDirectory()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      emoji: '📁',
    },
  })

  const onSubmit = (values: FormValues) => {
    if (values.name.trim() === '') {
      return
    }

    createDirectoryMutate({
      name: values.name,
      emoji: values.emoji,
    })

    onOpenChange(false)
  }

  useEffect(() => {
    if (!open) {
      form.reset({
        name: '',
        emoji: '📁',
      })
    }
  }, [open, form])

  useEffect(() => {
    if (!open) {
      form.reset({
        name: '',
        emoji: '📁',
      })
    }
  }, [open, form])

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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <DialogTitle className="mb-[32px] w-full">
          <Text typography="subtitle2-bold">폴더 만들기</Text>
        </DialogTitle>

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
                        className="w-full border-b border-border-divider py-[10px] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
                        placeholder="폴더 이름"
                        disabled={isPending}
                        {...field}
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
                만들기
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDirectoryDialog
