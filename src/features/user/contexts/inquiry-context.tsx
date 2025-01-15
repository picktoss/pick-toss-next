'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useForm, UseFormReturn, useWatch } from 'react-hook-form'
import { InquiryFormData, inquirySchema } from '../components/inquiry/config'
import { zodResolver } from '@hookform/resolvers/zod'

export type Type =
  | 'ERROR'
  | 'PAYMENT'
  | 'PARTNERSHIP'
  | 'EVENT'
  | 'ACCOUNT_INFO'
  | 'CANCELLATION'
  | 'OTHER'

interface InquiryContextType extends InquiryFormData {
  form: UseFormReturn<InquiryFormData>
  isValid: boolean | undefined
  setType: (type: Type) => void
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setEmail: (email: string) => void
  setFiles: (files: File[]) => void
  setIsAgreeChecked: (checked: boolean) => void
  handleSubmit: (onSubmit: (data: InquiryFormData) => void) => () => void
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined)

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      type: 'ERROR',
      title: '',
      content: '',
      email: '',
      files: [],
      isAgreeChecked: false,
    },
  })

  const { control, setValue, handleSubmit: rhfHandleSubmit } = form

  const formValues = useWatch({
    control,
  })

  const isValid = useMemo(() => {
    if (formValues.title && formValues.content && formValues.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formValues.title.length > 0 &&
        formValues.content.length > 0 &&
        emailRegex.test(formValues.email || '') &&
        formValues.isAgreeChecked === true
      )
    }
  }, [formValues])

  const values = useMemo(
    () => ({
      form,
      type: formValues.type ?? 'ERROR',
      title: formValues.title ?? '',
      content: formValues.content ?? '',
      email: formValues.email ?? '',
      files: formValues.files ?? [],
      isAgreeChecked: formValues.isAgreeChecked ?? false,
      isValid,
      setType: (type: Type) => {
        setValue('type', type)
      },
      setTitle: (title: string) => {
        setValue('title', title)
      },
      setContent: (content: string) => {
        setValue('content', content)
      },
      setEmail: (email: string) => {
        setValue('email', email)
      },
      setFiles: (files: File[]) => {
        setValue('files', files)
      },
      setIsAgreeChecked: (checked: boolean) => {
        setValue('isAgreeChecked', checked)
      },
      handleSubmit: (onSubmit: (data: InquiryFormData) => void) => rhfHandleSubmit(onSubmit),
    }),
    [form, rhfHandleSubmit, setValue, isValid, formValues]
  )

  return <InquiryContext.Provider value={values}>{children}</InquiryContext.Provider>
}

export const useInquiry = () => {
  const context = useContext(InquiryContext)
  if (!context) {
    throw new Error('InquiryProvider 내에서 사용해주세요')
  }
  return context
}
