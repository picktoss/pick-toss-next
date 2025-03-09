'use client'

import { useUpdateUserName } from '@/requests/user/hooks'
import Icon from '@/shared/components/custom/icon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { useToast } from '@/shared/hooks/use-toast'
import { cn } from '@/shared/lib/utils'
import { useScreenSize } from '@/shared/hooks/use-screen-size'

const formSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
})

type FormValues = z.infer<typeof formSchema>

const SetNameDialog = ({ userName }: { userName: string }) => {
  const { isMobile } = useScreenSize()

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const nameInput = useRef<HTMLInputElement | null>(null)

  const toastId = useId()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName,
    },
  })

  const { mutate, isPending } = useUpdateUserName()

  const onSubmit = (values: { name: string }) => {
    mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          router.refresh()
          setOpen(false)
          toast({}).update({
            id: toastId,
            title: '이름이 변경되었어요',
          })
        },
      }
    )
  }

  // 모바일 키보드 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardOpen = window.visualViewport.height < window.innerHeight
        setIsKeyboardOpen(keyboardOpen)
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  useEffect(() => {
    if (!open) return

    const focusTimer = setTimeout(() => {
      if (nameInput.current) {
        nameInput.current.setAttribute('autofocus', 'true')
        // nameInput.current?.click()
        // nameInput.current?.focus()
        // if (nameInput.current.value.length > 0) {
        //   nameInput.current.setSelectionRange(0, nameInput.current.value.length)
        // }
      }
    }, 300)

    return () => {
      clearTimeout(focusTimer)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          form.reset()
          setIsKeyboardOpen(false)
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              이름
            </Text>
            <Text typography="subtitle2-medium">{userName}</Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </div>
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        className={cn(
          'h-fit w-[280px] rounded-[16px] bg-background-base-01 p-[24px] pb-[32px]',
          isKeyboardOpen && 'top-[50%] translate-y-[-50%]'
        )}
        onPointerDownOutside={(e) => {
          if (isPending) {
            e.preventDefault()
          }
        }}
      >
        <div>
          <DialogTitle className="mb-[38px]">
            <Text typography="subtitle2-bold">이름 변경</Text>
          </DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        ref={nameInput}
                        autoFocus={false}
                        tabIndex={-1}
                        disabled={isPending}
                        className="size-full border-b border-border-divider py-[5px] text-subtitle2-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-[53px] flex items-center justify-end gap-[35px] text-button2">
                <DialogClose>
                  <span className="text-button-text-tertiary">취소</span>
                </DialogClose>
                <button className="text-button-text-primary">저장하기</button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetNameDialog
