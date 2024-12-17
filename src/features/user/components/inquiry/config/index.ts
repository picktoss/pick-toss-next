import { z } from 'zod'

// 파일 크기 제한 (임시로 5MB로 해둠)
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const inquirySchema = z.object({
  type: z.string().min(1, '문의 유형을 선택해주세요'),
  title: z.string().min(1, '제목을 입력해주세요').max(50, '제목은 50자 이내로 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요').max(300, '내용은 300자 이내로 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  files: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, '파일 크기는 5MB를 초과할 수 없습니다')
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          '지원되는 이미지 형식은 JPEG, PNG, WebP입니다'
        )
    )
    .max(3, '최대 3개의 파일만 업로드 가능합니다'),
  isAgreeChecked: z.boolean().refine((checked) => checked, '개인정보 수집 및 이용에 동의해주세요'),
})

export type InquiryFormData = z.infer<typeof inquirySchema>
