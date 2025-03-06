'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import CategoryTag from '@/shared/components/custom/category-tag'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { CATEGORY_OPTION } from '@/constants'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Button } from '@/shared/components/ui/button'
import SetCategoryCompleteDialog from '@/features/category/components/set-category-complete-dialog'
import { useMemo, useState } from 'react'
import * as z from 'zod'
import { useUpdateCollectionCategories } from '@/requests/user/hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { CATEGORIES } from '@/features/category/config'

const formSchema = z.object({
  categories: z
    .array(z.string())
    .min(1, '최소 1개의 관심분야를 선택해주세요')
    .max(2, '최대 2개까지 선택 가능합니다'),
})

type FormValues = z.infer<typeof formSchema>

const CategoryDrawer = ({
  interestedCategories,
}: {
  interestedCategories?: (User.InterestedCategory | '관심 분야 없음')[]
}) => {
  const [open, setOpen] = useState(false)
  const [newCategories, setNewCategories] = useState<User.InterestedCategory[]>([])
  const [completeOpen, setCompleteOpen] = useState(false)
  const { mutate, isPending } = useUpdateCollectionCategories()

  const isExistInterestedCategory = useMemo(
    () =>
      interestedCategories &&
      interestedCategories.length !== 0 &&
      interestedCategories[0] !== '관심 분야 없음',
    [interestedCategories]
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: interestedCategories?.filter((category) => category !== '관심 분야 없음') || [],
    },
  })

  const onSubmit = (values: FormValues) => {
    setNewCategories(values.categories as User.InterestedCategory[])

    mutate(
      { interestCollectionCategories: values.categories as NonNullable<User.InterestedCategory>[] },
      {
        onSuccess: () => {
          setCompleteOpen(true)
        },
      }
    )
  }

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            form.reset()
          }
        }}
      >
        <DrawerTrigger asChild>
          <button className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-[4px]">
              <Text typography="text2-medium" className="text-text-sub">
                관심분야
              </Text>

              {isExistInterestedCategory ? (
                <div className="flex items-center gap-[3px]">
                  {interestedCategories?.map((category) => (
                    <CategoryTag
                      key={category}
                      title={CATEGORIES.find((value) => value.id === category)?.name ?? ''}
                      className="text-text-secondary"
                    />
                  ))}
                </div>
              ) : (
                <Text typography="subtitle2-medium" className="text-text-caption">
                  관심분야를 등록해주세요
                </Text>
              )}
            </div>
            <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
          </button>
        </DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto flex h-[80dvh] w-dvw max-w-mobile flex-col rounded-t-[16px]"
          onPointerDownOutside={(e) => {
            if (isPending) {
              e.preventDefault()
            }
          }}
        >
          <Form {...form}>
            <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-[20px] flex h-[calc(100%-100px-32px)] flex-col px-[17px]">
                <header className="mb-[14px]">
                  <DrawerTitle className="mb-[8px] text-title3">관심분야 선택</DrawerTitle>
                  <Text typography="text1-medium" className="text-text-sub">
                    최대 2개까지 선택 가능해요
                  </Text>
                </header>

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <div className="flex grow flex-col overflow-y-auto">
                      <FormItem>
                        {CATEGORY_OPTION.map((category) => (
                          <label
                            key={category.key}
                            className="flex cursor-pointer items-center py-[10px]"
                          >
                            <FormControl>
                              <Checkbox
                                id={category.key}
                                checked={field.value.includes(category.key)}
                                onCheckedChange={(checked) => {
                                  if (checked && field.value.length >= 2) return
                                  const newValue = checked
                                    ? [...field.value, category.key]
                                    : field.value.filter((val) => val !== category.key)
                                  field.onChange(newValue)
                                }}
                                className="mr-[12px] size-[20px]"
                              />
                            </FormControl>
                            <Text>{category.label}</Text>
                          </label>
                        ))}
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <DrawerFooter className="flex-center w-full flex-row gap-[6px] px-[16px] pb-[36px] pt-[12px]">
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  variant="largeRound"
                  colors="tertiary"
                  className="w-[35%]"
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="largeRound"
                  colors="primary"
                  className="w-[65%]"
                >
                  저장하기
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>

      <SetCategoryCompleteDialog
        isOpen={completeOpen}
        setIsOpen={(value) => {
          setCompleteOpen(value)
          if (value === false) {
            setOpen(false)
          }
        }}
        newCategories={newCategories}
      />
    </>
  )
}

export default CategoryDrawer
