'use client'

import { useUpdateCollectionCategories } from '@/requests/user/hooks'
import Loading from '@/shared/components/custom/loading'
import { Button } from '@/shared/components/ui/button'
import { Form, FormField, FormItem } from '@/shared/components/ui/form'
import Text from '@/shared/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  categories: z
    .array(z.string())
    .min(1, '최소 1개의 관심분야를 선택해주세요')
    .max(2, '최대 2개까지 선택 가능합니다'),
})
type FormValues = z.infer<typeof formSchema>
const MAX_CATEGORY = 2

const CategorySelectArea = () => {
  const router = useRouter()
  const { mutate, isPending } = useUpdateCollectionCategories()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [] as User.InterestedCategory[],
    },
  })
  const { watch } = form
  const currentCategories = watch('categories')

  const handleCheck = (
    e: React.MouseEvent<HTMLDivElement>,
    field: ControllerRenderProps<
      {
        categories: string[]
      },
      'categories'
    >
  ) => {
    const target = e.target as HTMLElement
    const category = target.id as User.InterestedCategory

    if (!category) return // 버튼이 아닌 다른 영역 클릭 시 무시

    const currentCategories = (field.value || []) as User.InterestedCategory[]
    if (currentCategories.includes(category)) {
      // 이미 선택된 경우 제거
      const updatedCategories = currentCategories.filter((item) => item !== category)
      field.onChange(updatedCategories)
    } else if (currentCategories.length < MAX_CATEGORY) {
      // 선택 추가
      const updatedCategories = [...currentCategories, category]
      field.onChange(updatedCategories)
    }
  }

  const onSubmit = (values: FormValues) => {
    mutate(
      { interestCollectionCategories: values.categories as NonNullable<User.InterestedCategory>[] },
      {
        onSuccess: () => {
          // 쿠키 설정
          const expirationDate = new Date()
          expirationDate.setDate(expirationDate.getDate() + 7)
          document.cookie = `interested-category-complete=true; expires=${expirationDate.toUTCString()}; path=/`

          router.replace('/main')
        },
      }
    )
  }

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariant = {
    hidden: { x: -50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  if (isPending) return <Loading center />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
          className="mb-[70px] mt-[40px] flex flex-col"
        >
          <Text typography="text2-medium" color="accent" className="mb-[20px]">
            *최대 2개 선택 가능
          </Text>

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <div className="flex flex-col gap-[20px]" onClick={(e) => handleCheck(e, field)}>
                <FormItem>
                  <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
                    <Button
                      type="button"
                      id={'IT'}
                      variant={'smallSquare'}
                      colors={field.value.includes('IT') ? 'selected' : 'outlined'}
                    >
                      🤖 IT·프로그래밍
                    </Button>
                    <Button
                      type="button"
                      id={'BUSINESS_ECONOMY'}
                      variant={'smallSquare'}
                      colors={field.value.includes('BUSINESS_ECONOMY') ? 'selected' : 'outlined'}
                    >
                      💰 경영·경제
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
                    <Button
                      type="button"
                      id={'SCIENCE_ENGINEERING'}
                      variant={'smallSquare'}
                      colors={field.value.includes('SCIENCE_ENGINEERING') ? 'selected' : 'outlined'}
                    >
                      🔬 과학·공학
                    </Button>
                    <Button
                      type="button"
                      id={'LAW'}
                      variant={'smallSquare'}
                      colors={field.value.includes('LAW') ? 'selected' : 'outlined'}
                    >
                      📖 법학
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
                    <Button
                      type="button"
                      id={'SOCIETY_POLITICS'}
                      variant={'smallSquare'}
                      colors={field.value.includes('SOCIETY_POLITICS') ? 'selected' : 'outlined'}
                    >
                      ⚖️ 사회·정치
                    </Button>
                    <Button
                      type="button"
                      id={'HISTORY_PHILOSOPHY'}
                      variant={'smallSquare'}
                      colors={field.value.includes('HISTORY_PHILOSOPHY') ? 'selected' : 'outlined'}
                    >
                      📜 역사·철학
                    </Button>
                    <Button
                      type="button"
                      id={'ART'}
                      variant={'smallSquare'}
                      colors={field.value.includes('ART') ? 'selected' : 'outlined'}
                    >
                      🎨 예술
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariant} className="flex items-center gap-[8px]">
                    <Button
                      type="button"
                      id={'LANGUAGE'}
                      variant={'smallSquare'}
                      colors={field.value.includes('LANGUAGE') ? 'selected' : 'outlined'}
                    >
                      💬 언어
                    </Button>
                    <Button
                      type="button"
                      id={'MEDICINE_PHARMACY'}
                      variant={'smallSquare'}
                      colors={field.value.includes('MEDICINE_PHARMACY') ? 'selected' : 'outlined'}
                    >
                      🩺 의학·약학
                    </Button>
                  </motion.div>
                </FormItem>
              </div>
            )}
          ></FormField>
        </motion.div>

        <Button type='submit' className="w-full" disabled={currentCategories.length === 0}>
          완료
        </Button>
      </form>
    </Form>
  )
}

export default CategorySelectArea
