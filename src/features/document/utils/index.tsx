import * as pdfjs from 'pdfjs-dist'
import '@/shared/utils/pdf'
import { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api'
import mammoth from 'mammoth'

// 1000자 당, 2문제 생성을 가정
export const QUESTIONS_PER_THOUSAND = 2

export const calculateAvailableQuizCount = (charCount: number) => {
  // 문제 수 계산
  const quizCount = Math.floor((charCount / 1000) * QUESTIONS_PER_THOUSAND)
  return quizCount
}

function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
  return 'str' in item && 'transform' in item
}

export const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export const SUPPORTED_FILE_TYPES = {
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
} as const

// 파일 타입 체크 함수
export const isValidFileType = (file: File): boolean => {
  if (!file) return false

  const fileName = file.name.toLowerCase()
  const fileExtension = `.${fileName.split('.').pop()}`

  // MIME 타입 또는 확장자가 허용된 것인지 확인
  return Object.values(SUPPORTED_FILE_TYPES).some(
    (type) => type.mime === file.type || type.extension === fileExtension
  )
}

/** 입력받은 file(pdf, docx, txt)을 markdown으로 변환해 반환하는 함수 */
export const generateMarkdownFromFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('파일이 제공되지 않았습니다.')
  }

  if (!isValidFileType(file)) {
    throw new Error(`지원하지 않는 파일 형식입니다: ${file.type}`)
  }

  try {
    const fileExtension = `.${file.name.toLowerCase().split('.').pop()}`

    // MIME 타입이나 확장자를 기준으로 적절한 핸들러 선택
    if (
      file.type === SUPPORTED_FILE_TYPES.PDF.mime ||
      fileExtension === SUPPORTED_FILE_TYPES.PDF.extension
    ) {
      return await handlePdfFile(file)
    }

    if (
      file.type === SUPPORTED_FILE_TYPES.DOCX.mime ||
      fileExtension === SUPPORTED_FILE_TYPES.DOCX.extension
    ) {
      return await handleDocxFile(file)
    }

    if (
      file.type === SUPPORTED_FILE_TYPES.TXT.mime ||
      fileExtension === SUPPORTED_FILE_TYPES.TXT.extension
    ) {
      return await handleTxtFile(file)
    }

    throw new Error('지원하지 않는 파일 형식입니다.')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`파일 변환 오류: ${error.message}`)
    }
    throw new Error('파일 변환 중 알 수 없는 오류가 발생했습니다.')
  }
}

// 기호 정규식 패턴 정의 + y좌표 임계점 정의
const SYMBOL_REGEX = /^[#*●•★☆※✔✖☑⬜⬛]+$/
const Y_COORDINATE_THRESHOLD = 20

// pdf 핸들러
const handlePdfFile = async (file: File): Promise<string> => {
  const fileBuffer = await file.arrayBuffer()

  // CMap 설정 추가
  const loadingTask = pdfjs.getDocument({
    data: fileBuffer,
    cMapUrl: '/cmaps/', // public 폴더 내의 cmaps 경로
    cMapPacked: true,
  })

  const pdf = await loadingTask.promise
  let markdown = ''

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()

      // Y 좌표와 텍스트 데이터를 저장
      const textItems: { y: number; text: string }[] = textContent.items
        .filter(isTextItem)
        .map((item) => {
          const transform: number[] = item.transform as number[]
          const y = transform[5] ?? 0
          return { y, text: item.str }
        })

      // Y 좌표 기준으로 정렬 (위에서 아래로)
      textItems.sort((a, b) => b.y - a.y)

      // 줄바꿈 감지 및 텍스트 조합
      let previousY: number | null = null
      let currentLine = ''

      textItems.forEach(({ y, text }) => {
        // 현재 텍스트가 기호인지 확인
        const isSymbol = SYMBOL_REGEX.test(text)

        // 1. 기호 기준 줄바꿈
        if (isSymbol) {
          if (currentLine) {
            // 현재 라인의 시작/끝 공백은 보존하되, 중복 공백만 제거
            markdown += currentLine.replace(/\s+/g, ' ') + '\n<br/>\n'
            currentLine = ''
          }
          markdown += text
          previousY = y
          return
        }

        // 2. Y 좌표 기반 줄바꿈
        if (previousY !== null && Math.abs(previousY - y) > Y_COORDINATE_THRESHOLD) {
          if (currentLine) {
            markdown += currentLine.replace(/\s+/g, ' ') + '\n\n'
            currentLine = ''
          }
        }

        // 띄어쓰기 처리
        // 기호가 아닌 경우에만 띄어쓰기 추가
        if (!isSymbol) {
          // 현재 라인이 비어있지 않고, 마지막 문자가 띄어쓰기가 아닌 경우에만 띄어쓰기 추가
          if (currentLine && !currentLine.endsWith(' ')) {
            currentLine += ' '
          }
          currentLine += text
        } else {
          currentLine += text
        }

        previousY = y
      })

      // 마지막 라인 처리
      if (currentLine) {
        markdown += currentLine.replace(/\s+/g, ' ')
      }

      // 페이지 구분
      markdown += '\n<br/><br/>\n'
    } catch (error) {
      console.error(`PDF 페이지 ${pageNum} 처리 중 오류:`, error)
      throw new Error(`PDF 페이지 ${pageNum} 처리 중 오류가 발생했습니다.`)
    }
  }

  return markdown.trim()
}

// docx 핸들러
const handleDocxFile = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value.trim()
  } catch (error) {
    throw new Error('DOCX 파일 처리 중 오류가 발생했습니다.')
  }
}

// txt 핸들러
const handleTxtFile = async (file: File): Promise<string> => {
  try {
    const text = await file.text()
    return text.trim()
  } catch (error) {
    throw new Error('TXT 파일 처리 중 오류가 발생했습니다.')
  }
}
