export const DOCUMENT_CONSTRAINTS = {
  TITLE: {
    MIN: 1,
    MAX: 50,
  },
  CONTENT: {
    MIN: 1000,
    MAX: 50000,
  },
} as const

export const addDocumentButtons = [
  {
    key: 'pencil',
    position: 76,
    text: { bottomCss: 'bottom-[89.5px]', content: '직접 작성하기' },
    href: '/document/write',
  },
  {
    key: 'clip',
    position: 144,
    text: { bottomCss: 'bottom-[157.5px]', content: '파일 업로드하기' },
    href: '/document/file',
  },
  {
    key: 'notion',
    position: 212,
    text: { bottomCss: 'bottom-[225.5px]', content: '페이지 연동하기' },
    href: '/document/notion',
  },
] as const

export const quizTypeFilters = [
  { key: 'ALL', label: '전체' },
  { key: 'MULTIPLE_CHOICE', label: '객관식' },
  { key: 'MIX_UP', label: 'O/X' },
] as const

import { z } from 'zod'

// 파일 관련 상수
export const FILE_CONSTRAINTS = {
  MIN_CHARS: DOCUMENT_CONSTRAINTS.CONTENT.MIN,
  MAX_CHARS: DOCUMENT_CONSTRAINTS.CONTENT.MAX,
  MIN_SIZE: 6 * 1024, // 6KB
  MAX_SIZE: 12 * 1024 * 1024, // 12MB
  SUPPORTED_TYPES: {
    PDF: {
      mime: 'application/pdf',
      extension: '.pdf',
    },
    DOCX: {
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: '.docx',
    },
    TXT: {
      mime: 'text/plain',
      extension: '.txt',
    },
  },
} as const

// 파일 정보 스키마
export const FileInfoSchema = z.object({
  name: z.string().min(1, '파일 이름은 필수입니다'),
  size: z
    .number()
    .min(
      FILE_CONSTRAINTS.MIN_SIZE,
      '파일 크기가 너무 작습니다. 6KB 이상의 파일만 업로드 가능합니다'
    )
    .max(FILE_CONSTRAINTS.MAX_SIZE, '12MB 미만의 파일만 업로드 가능합니다'),
  charCount: z
    .number()
    .min(FILE_CONSTRAINTS.MIN_CHARS, '최소 1,000자 이상의 텍스트가 필요합니다')
    .max(FILE_CONSTRAINTS.MAX_CHARS, '최대 50,000자까지 업로드 가능합니다'),
  content: z.string().min(1, '파일 내용은 필수입니다'),
})

export type FileInfo = z.infer<typeof FileInfoSchema>

// 문서 생성 요청 스키마
export const CreateDocumentSchema = z.object({
  directoryId: z.string().min(1, '폴더 선택은 필수입니다'),
  documentName: z
    .string()
    .min(DOCUMENT_CONSTRAINTS.TITLE.MIN, '노트 이름은 필수입니다')
    .max(DOCUMENT_CONSTRAINTS.TITLE.MAX, '노트 이름은 최대 50자까지 가능합니다'),
  file: z
    .string()
    .min(DOCUMENT_CONSTRAINTS.CONTENT.MIN, '노트 내용은 최소 1,000자 이상의 텍스트가 필요합니다')
    .max(DOCUMENT_CONSTRAINTS.CONTENT.MAX, '노트 내용은 최대 50,000자까지 작성 가능합니다.'),
  quizType: z.enum(['MULTIPLE_CHOICE', 'MIX_UP']),
  star: z.string().regex(/^[1-40]$/, '문제 수는 1-40 사이의 숫자여야 합니다'),
  documentType: z.enum(['FILE', 'TEXT', 'NOTION']),
})

export type CreateDocumentRequest = z.infer<typeof CreateDocumentSchema>
