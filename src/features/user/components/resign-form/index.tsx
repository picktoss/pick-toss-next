'use client'

import { RESIGN_OPTIONS } from '../../config'
import { cn } from '@/shared/lib/utils'
import Text from '@/shared/components/ui/text'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDeleteAccount } from '@/requests/user/hooks'

const resignFormSchema = z.object({
  reason: z.string().min(1, '탈퇴 사유를 선택해주세요'),
  content: z.string().max(500, '500자 이내로 입력해주세요').optional().or(z.literal('')),
  conformNotification: z
    .boolean()
    .refine((checked) => checked, '탈퇴 안내 확인 여부에 동의해주세요'),
})

type ResignFormData = z.infer<typeof resignFormSchema>

const ResignForm = () => {
  const { mutate: deleteAccountMutate } = useDeleteAccount()
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ResignFormData>({
    resolver: zodResolver(resignFormSchema),
    defaultValues: {
      reason: '',
      content: '',
      conformNotification: false,
    },
  })

  const handleClickDeleteAccount = (data: ResignFormData) => {
    const reason = RESIGN_OPTIONS.find((option) => option.key === data.reason)

    if (!reason) {
      console.error('invalid reason')
      return
    }

    const requestBody = {
      reason: reason.label,
      content: data.content ?? '',
    }

    deleteAccountMutate(requestBody)
  }

  return (
    <form onSubmit={handleSubmit(handleClickDeleteAccount)}>
      <div className="flex flex-col gap-[8px] pb-[40px] pt-[44px]">
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <>
              {RESIGN_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.key}
                  onClick={() => field.onChange(option.key)}
                  className={cn(
                    'w-full rounded-[10px] border border-border-divider py-[9.5px] transition-colors',
                    field.value === option.key
                      ? 'border-border-selected bg-button-fill-secondary text-button-label-secondary'
                      : 'text-button-label-tertiary'
                  )}
                >
                  <Text typography={field.value === option.key ? 'button3' : 'button4'}>
                    {option.label}
                  </Text>
                </button>
              ))}
            </>
          )}
        />
      </div>

      <Text typography="text1-medium" color="secondary">
        상세내용
      </Text>

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="픽토스에 전하고 싶은 말을 남겨주세요"
            className="input-basic my-[8px] h-[256px] w-full resize-none"
            maxLength={500}
          />
        )}
      />

      <Text typography="text2-medium" className="mb-[66px] text-text-caption">
        {`500자 이내로 입력해주세요 (${watch('content')?.length || 0}/500)`}
      </Text>

      <div className="fixed bottom-0 right-1/2 flex w-full max-w-mobile translate-x-1/2 flex-col bg-background-base-01 px-[16px] pb-[36px] pt-[7px]">
        <div className="mb-[9px] flex gap-[8px]">
          <Controller
            name="conformNotification"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="checkNotification"
                />
                <Label htmlFor="checkNotification">
                  <Text typography="text2-medium" className="text-text-primary">
                    저장한 데이터는 모두 삭제되며 복구할 수 없음을 확인했습니다
                  </Text>
                </Label>
              </>
            )}
          />
        </div>

        <ConfirmDialogWidget
          triggerComponent={
            <Button className="w-full" disabled={!isValid}>
              탈퇴하기
            </Button>
          }
          title="계정을 삭제하시겠어요?"
          content={
            <Text typography="text1-medium" color="secondary">
              픽토스에서 만든 노트와 문제가 모두 삭제됩니다
            </Text>
          }
          confirmButton={
            <button
              type="submit"
              className="ml-[32px]"
              onClick={handleSubmit(handleClickDeleteAccount)}
            >
              <Text typography="button2" color="critical">
                계정 삭제
              </Text>
            </button>
          }
        />
      </div>
    </form>
  )
}

export default ResignForm
