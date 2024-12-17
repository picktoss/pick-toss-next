'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import { useInquiry } from '../../../contexts/inquiry-context'
import TermsAndConditionsDrawer from '../../terms-and-conditions-drawer'
import { Controller } from 'react-hook-form'
import { InquiryFormData } from '../config'
import { useState } from 'react'
import { http } from '@/shared/lib/axios/http'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

const InquiryConfirm = () => {
  const router = useRouter()
  const {
    form: { control },
    handleSubmit,
    isAgreeChecked,
    setIsAgreeChecked,
  } = useInquiry()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { accessToken } = useAuthStore()

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append('type', data.type)
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('email', data.email)

      data.files.forEach((file) => {
        formData.append(`files`, file)
      })

      await http.post(API_ENDPOINTS.FEEDBACK.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      router.replace('/profile')
      alert('문의가 성공적으로 전송되었습니다')
    } catch (error) {
      console.error(error)
      alert('문의 전송 중 오류가 발생했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-[16px] pb-[36px] pt-[7px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <Controller
            name="isAgreeChecked"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onCheckedChange={(checked) => {
                  typeof checked === 'boolean' && onChange(checked)
                  setIsAgreeChecked(!!checked)
                }}
                id="checkAgreement"
              />
            )}
          />
          <Label htmlFor="checkAgreement">
            <Text typography="text2-medium" className="text-text-primary">
              개인정보 수집 및 이용동의
            </Text>
          </Label>
        </div>
        <TermsAndConditionsDrawer setIsAgreeChecked={setIsAgreeChecked} />
      </div>

      <Button
        type="submit"
        variant={'largeRound'}
        onClick={handleSubmit(onSubmit)}
        colors={'primary'}
        className="mt-[9px] w-full"
        disabled={!isAgreeChecked || isSubmitting}
      >
        문의 보내기
      </Button>
    </div>
  )
}

export default InquiryConfirm
