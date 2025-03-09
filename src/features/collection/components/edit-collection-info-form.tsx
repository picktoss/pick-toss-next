'use client'

import { CATEGORIES } from '@/features/category/config'
import { useCollectionInfo, useUpdateCollectionInfo } from '@/requests/collection/hooks'
import CategoryTag from '@/shared/components/custom/category-tag'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Loading from '@/shared/components/custom/loading'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import Text from '@/shared/components/ui/text'
import { Textarea } from '@/shared/components/ui/textarea'
import { toast } from '@/shared/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import EmojiPicker from 'emoji-picker-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CategoryId = z.enum([
  'IT',
  'LAW',
  'BUSINESS_ECONOMY',
  'SOCIETY_POLITICS',
  'LANGUAGE',
  'MEDICINE_PHARMACY',
  'ART',
  'SCIENCE_ENGINEERING',
  'HISTORY_PHILOSOPHY',
  'OTHER',
])

const formSchema = z.object({
  title: z.string().min(1, '컬렉션 이름을 입력해주세요'),
  description: z
    .string()
    .min(1, '컬렉션 설명을 입력해주세요')
    .max(200, '컬렉션 설명은 200자를 초과할 수 없습니다'),
  emoji: z.string().min(1, '이모지를 선택해주세요'),
  categoryCode: CategoryId,
})

type FormValues = z.infer<typeof formSchema>

const EditCollectionInfoForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const { data } = useCollectionInfo(Number(id))

  const [emojiOpen, setEmojiOpen] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      emoji: '🥹',
      categoryCode: CATEGORIES[0]?.id ?? 'IT',
    },
  })

  const { mutate: editCollectionInfoMutate, isPending: isEditCollectionInfoPending } =
    useUpdateCollectionInfo()

  const onSubmit = (values: FormValues) => {
    if (isEditCollectionInfoPending) return

    editCollectionInfoMutate(
      {
        collectionId: Number(id),
        payload: {
          name: values.title,
          emoji: values.emoji,
          description: values.description,
          collectionCategory: CATEGORIES.find((category) => category.id === values.categoryCode)!
            .id,
        },
      },
      {
        onSuccess: () => {
          router.replace(`/collections/${Number(id)}`)
        },
        onError: () => {
          toast({
            title: '컬렉션 수정에 실패했습니다.',
            description: '다시 시도해주세요.',
          })
        },
      }
    )
  }

  useEffect(() => {
    if (!data) return

    form.reset({
      title: data.name,
      description: data.description,
      emoji: data.emoji,
      categoryCode: CATEGORIES.find((category) => category.name === data.collectionCategory)!.id,
    })
  }, [data, form])

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

  if (!data) {
    return <Loading center />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
        <div>
          {/* 이모지 선택 및 컬렉션 이름 입력 */}
          <div className="flex items-center gap-[20px]">
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <button
                      onClick={() => setEmojiOpen(!emojiOpen)}
                      type="button"
                      className="outline-none"
                    >
                      <div className="flex-center size-[48px] rounded-[12px] bg-background-base-02 text-3xl">
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
                          height="60vh"
                          onEmojiClick={(emojiData, e) => {
                            e.preventDefault()
                            field.onChange(emojiData.emoji)
                            setEmojiOpen(false)
                          }}
                          className="max-w-mobile"
                        />
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="새로운 컬렉션"
                      className="flex-1 bg-transparent text-title2 placeholder:text-text-placeholder-02 focus:outline-none"
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* 분야 선택 */}
          <div className="mt-[25px] flex items-center gap-[5px]">
            <Text typography="text1-medium" color="secondary">
              분야<span className="text-text-accent">*</span>
            </Text>
            <FormField
              control={form.control}
              name="categoryCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Drawer>
                      <DrawerTrigger>
                        <div className="rounded-full bg-background-base-02 px-[14px] py-[5px]">
                          <CategoryTag
                            title={
                              CATEGORIES.find((category) => category.id === field.value)?.name ?? ''
                            }
                          />
                        </div>
                      </DrawerTrigger>
                      <DrawerContent className="mx-auto max-w-mobile">
                        <DrawerHeader>
                          <DrawerTitle>카테고리를 선택해주세요.</DrawerTitle>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 p-4">
                          {CATEGORIES.map((category) => (
                            <DrawerClose key={category.id}>
                              <CategoryTag
                                title={category.name}
                                onClick={() => field.onChange(category.id)}
                              />
                            </DrawerClose>
                          ))}
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* 컬렉션 설명 */}
          <div className="mt-[27px]">
            <Text typography="text1-medium" color="secondary">
              컬렉션 설명<span className="text-text-accent">*</span>
            </Text>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="mt-2 min-h-[130px] rounded-[8px] border-none bg-background-base-02"
                    />
                  </FormControl>
                  <Text typography="text2-medium" color="caption" className="mt-2">
                    200자 이내로 입력해주세요 ({field.value.length}/200)
                  </Text>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FixedBottom className="flex gap-[6px]">
          <Button
            variant={'largeRound'}
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid}
          >
            저장하기
          </Button>
        </FixedBottom>
      </form>
    </Form>
  )
}

export default EditCollectionInfoForm
