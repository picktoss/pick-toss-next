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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { Textarea } from '@/shared/components/ui/textarea'
import EmojiPicker from 'emoji-picker-react'
import { useParams, useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/ui/input'
import { toast } from '@/shared/hooks/use-toast'
import { useEffect } from 'react'

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

// 가짜
const EditCollectionInfoForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const { data } = useCollectionInfo(Number(id))

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
            variant: 'destructive',
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

  if (!data) {
    return <Loading center />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
        <div>
          <div className="flex items-center gap-[20px]">
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <div className="flex-center size-[48px] rounded-[12px] bg-background-base-02 text-3xl">
                          {field.value}
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <EmojiPicker
                          skinTonesDisabled
                          height={'60vh'}
                          onEmojiClick={(emojiData) => {
                            field.onChange(emojiData.emoji)
                          }}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                      className="flex-1 w-full bg-transparent text-title2 placeholder:text-text-placeholder-02 focus:outline-none"
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-[27px]">
                <Text typography="text1-medium" color="secondary">
                  컬렉션 설명<span className="text-text-accent">*</span>
                </Text>
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

          <div className="mt-[25px]">
            <Text typography="text1-medium" color="sub">
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
                      <DrawerContent>
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
        </div>

        <FixedBottom className="flex gap-[6px]">
          <Button
            variant={'largeRound'}
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty || isEditCollectionInfoPending}
          >
            저장하기
          </Button>
        </FixedBottom>
      </form>
    </Form>
  )
}

export default EditCollectionInfoForm
