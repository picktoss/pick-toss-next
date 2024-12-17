'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
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
    defaultValues: {
      type: 'ERROR',
      title: '',
      content: '',
      email: '',
      files: [],
      isAgreeChecked: false,
    },
  })

  const { setValue, watch, handleSubmit: rhfHandleSubmit } = form

  const type = watch('type')
  const title = watch('title')
  const content = watch('content')
  const email = watch('email')
  const files = watch('files')
  const isAgreeChecked = watch('isAgreeChecked')

  // const [type, setType] = useState<Type>('error')
  // const [title, setTitle] = useState('')
  // const [content, setContent] = useState('')
  // const [email, setEmail] = useState('')
  // const [files, setFiles] = useState<File[]>([])
  // const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const values = useMemo(
    () => ({
      form,
      type,
      title,
      content,
      email,
      files,
      isAgreeChecked,
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
    [form, type, content, title, email, files, isAgreeChecked, rhfHandleSubmit, setValue]
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
