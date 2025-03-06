/* eslint-disable @typescript-eslint/no-unused-vars */
import { marked } from 'marked'
import * as pdfjs from 'pdfjs-dist'
import '@/shared/utils/pdf'
import { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api'
import mammoth from 'mammoth'

/** markdown string을 받아 markdown 문법을 제거해 텍스트만 반환하는 함수 */
export function extractPlainText(markdownText: string): string {
  // 마크다운 -> HTML 변환
  const html = marked(markdownText, { headerIds: false, mangle: false })

  // HTML -> 텍스트 추출
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || ''
}

// 1000자 당, 2문제 생성을 가정
export const QUESTIONS_PER_THOUSAND = 2

export const calculateAvailableQuizCount = (charCount: number) => {
  // 문제 수 계산
  const quizCount = Math.floor((charCount / 1000) * QUESTIONS_PER_THOUSAND)
  return quizCount
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
const SYMBOL_REGEX = /^[-•＊※○●■□▪︎⚫️●•★☆※✔✖☑⬜⬛]+$/
// const Y_COORDINATE_THRESHOLD = 18

const isTextItem = (item: TextItem | TextMarkedContent): item is TextItem => {
  if ('str' in item && 'transform' in item) {
    return item && typeof item.str === 'string' && Array.isArray(item.transform)
  }

  return 'str' in item && 'transform' in item
}

const extractFontSize = (item: TextItem): number => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Math.abs(item.transform[0]) || Math.abs(item.transform[3]) || 10
}

// pdf 핸들러 (텍스트 분리 현상 개선 + 띄어쓰기 처리 + 제목 처리)
const handlePdfFile = async (file: File): Promise<string> => {
  const fileBuffer = await file.arrayBuffer()

  const loadingTask = pdfjs.getDocument({
    data: fileBuffer,
    cMapUrl: '/cmaps/',
    cMapPacked: true,
  })

  const pdf = await loadingTask.promise
  let markdown = ''
  const fontSizes: number[] = []

  // 폰트 크기 수집 (제목 임계값 계산)
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()

    textContent.items.filter(isTextItem).forEach((item) => {
      fontSizes.push(extractFontSize(item))
    })
  }

  const averageFontSize = fontSizes.reduce((sum, size) => sum + size, 0) / fontSizes.length
  const h1Threshold = averageFontSize * 1.6
  const h2Threshold = averageFontSize * 1.3
  const h3Threshold = averageFontSize * 1.0

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()

      const textItems = textContent.items.filter(isTextItem).map((item) => {
        const transform: number[] = item.transform as number[]
        return {
          x: transform[4] ?? 0,
          y: transform[5] ?? 0,
          text: item.str,
          fontSize: extractFontSize(item),
          width: item.width ?? 0,
          height: item.height ?? 0,
        }
      })

      // Y 좌표 그룹화 (동적으로 y좌표 기준 정의)
      const yGroups: { [key: number]: number } = {}
      textItems.forEach((item) => {
        let foundGroup = false
        const isHeading =
          item.fontSize >= h1Threshold ||
          item.fontSize >= h2Threshold ||
          item.fontSize >= h3Threshold
        const threshold = isHeading ? item.height * 1.2 : item.height * 0.8

        Object.keys(yGroups).forEach((groupYStr) => {
          const groupY = parseFloat(groupYStr)
          if (Math.abs(item.y - groupY) < threshold) {
            foundGroup = true
            yGroups[groupY] && yGroups[groupY]++
            item.y = groupY
          }
        })
        if (!foundGroup) {
          yGroups[item.y] = 1
        }
      })

      // 정렬
      textItems.sort((a, b) => {
        const yDiff = b.y - a.y
        const isHeading =
          a.fontSize >= h1Threshold || a.fontSize >= h2Threshold || a.fontSize >= h3Threshold
        const threshold = isHeading
          ? Math.min(a.height, b.height) * 1.2
          : Math.min(a.height, b.height) * 0.8

        if (Math.abs(yDiff) < threshold) {
          return a.x - b.x
        }
        return yDiff
      })

      // 텍스트 수집을 위한 라인 배열
      interface LineInfo {
        text: string
        fontSize: number
        y: number
      }
      const lines: LineInfo[] = []
      let currentLine = ''
      let currentFontSize = 0
      let currentY = 0
      let previousY: number | null = null
      let previousX: number | null = null

      // 텍스트 수집
      textItems.forEach(({ x, y, text, fontSize, width }) => {
        const isSymbol = SYMBOL_REGEX.test(text)

        // 새로운 줄 판단
        const isNewLine = previousY !== null && Math.abs(previousY - y) > fontSize * 1.2

        if (isNewLine && currentLine) {
          lines.push({
            text: currentLine.trim(),
            fontSize: currentFontSize,
            y: currentY,
          })
          currentLine = ''
        }

        if (!currentLine) {
          currentFontSize = fontSize
          currentY = y
        }

        // 텍스트 추가
        if (!isSymbol) {
          if (previousX !== null) {
            const gap = x - previousX
            if (gap > fontSize * 0.5) {
              currentLine += ' '
            }
          }
          currentLine += text
        } else {
          if (x < (previousX || Infinity)) {
            if (currentLine) {
              lines.push({
                text: currentLine.trim(),
                fontSize: currentFontSize,
                y: currentY,
              })
              currentLine = ''
            }
            currentLine = text + ' '
          } else {
            currentLine += ' ' + text
          }
        }

        previousY = y
        previousX = x + width
      })

      // 마지막 라인 처리
      if (currentLine) {
        lines.push({
          text: currentLine.trim(),
          fontSize: currentFontSize,
          y: currentY,
        })
      }

      // 제목 처리 및 마크다운 생성
      let resultMarkdown = ''
      let i = 0
      while (i < lines.length) {
        const line = lines[i] as LineInfo
        const nextLine = i + 1 < lines.length ? lines[i + 1] : null

        // 제목 여부 확인 및 다음 줄과의 병합 여부 결정
        if (line.fontSize >= h1Threshold) {
          const shouldMerge = nextLine && Math.abs(line.y - nextLine.y) < line.fontSize * 1.2
          if (shouldMerge) {
            resultMarkdown += `# ${line.text} ${nextLine.text}\n\n`
            i += 2
          } else {
            resultMarkdown += `# ${line.text}\n\n`
            i++
          }
        } else if (line.fontSize >= h2Threshold) {
          const shouldMerge = nextLine && Math.abs(line.y - nextLine.y) < line.fontSize * 1.2
          if (shouldMerge) {
            resultMarkdown += `## ${line.text} ${nextLine.text}\n\n`
            i += 2
          } else {
            resultMarkdown += `## ${line.text}\n\n`
            i++
          }
        } else if (line.fontSize >= h3Threshold) {
          const shouldMerge = nextLine && Math.abs(line.y - nextLine.y) < line.fontSize * 1.2
          if (shouldMerge) {
            resultMarkdown += `### ${line.text} ${nextLine.text}\n\n`
            i += 2
          } else {
            resultMarkdown += `### ${line.text}\n\n`
            i++
          }
        } else {
          resultMarkdown += `${line.text}\n\n`
          i++
        }
      }

      markdown += resultMarkdown
    } catch (error) {
      console.error(`PDF 페이지 ${pageNum} 처리 중 오류:`, error)
      throw new Error(`PDF 페이지 ${pageNum} 처리 중 오류가 발생했습니다.`)
    }
  }

  return markdown.trim()
}

// pdf 핸들러 (제목 처리 버전)
// const handlePdfFile = async (file: File): Promise<string> => {
//   const fileBuffer = await file.arrayBuffer()

//   const loadingTask = pdfjs.getDocument({
//     data: fileBuffer,
//     cMapUrl: '/cmaps/',
//     cMapPacked: true,
//   })

//   const pdf = await loadingTask.promise
//   let markdown = ''
//   const fontSizes: number[] = []

//   // **폰트 크기 수집 (제목 임계값 계산)**
//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum)
//     const textContent = await page.getTextContent()

//     textContent.items.filter(isTextItem).forEach((item) => {
//       fontSizes.push(extractFontSize(item))
//     })
//   }

//   // ✅ 기준 폰트 크기를 평균값으로 변경
//   const averageFontSize = fontSizes.reduce((sum, size) => sum + size, 0) / fontSizes.length
//   const h1Threshold = averageFontSize * 1.6 // H1: 기존보다 높게 설정
//   const h2Threshold = averageFontSize * 1.3 // H2: H1보다 작지만 더 큰 폰트
//   const h3Threshold = averageFontSize * 1.0 // H3: 일반 텍스트보다 크게 설정

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     try {
//       const page = await pdf.getPage(pageNum)
//       const textContent = await page.getTextContent()

//       const textItems: { y: number; text: string; fontSize: number }[] = textContent.items
//         .filter(isTextItem)
//         .map((item) => {
//           const transform: number[] = item.transform as number[]
//           const y = transform[5] ?? 0
//           const fontSize = extractFontSize(item)
//           return { y, text: item.str, fontSize }
//         })

//       // Y 좌표 기준으로 정렬 (위에서 아래로)
//       textItems.sort((a, b) => b.y - a.y)

//       let previousY: number | null = null
//       let currentLine = ''

//       textItems.forEach(({ y, text, fontSize }) => {
//         const isSymbol = SYMBOL_REGEX.test(text)

//         // 1. 제목 처리
//         if (fontSize >= h1Threshold) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n'
//             currentLine = ''
//           }
//           markdown += `\n# ${text}\n\n`
//           previousY = y
//           return
//         } else if (fontSize >= h2Threshold) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n'
//             currentLine = ''
//           }
//           markdown += `\n## ${text}\n\n`
//           previousY = y
//           return
//         } else if (fontSize >= h3Threshold) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n'
//             currentLine = ''
//           }
//           markdown += `\n### ${text}\n\n`
//           previousY = y
//           return
//         }

//         // 2. 기호 기준 줄바꿈
//         if (isSymbol) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n<br/>\n'
//             currentLine = ''
//           }
//           markdown += text
//           previousY = y
//           return
//         }

//         // 3. Y 좌표 기반 줄바꿈
//         if (previousY !== null && Math.abs(previousY - y) > Y_COORDINATE_THRESHOLD) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n\n'
//             currentLine = ''
//           }
//         }

//         // 4. 띄어쓰기 처리
//         if (!isSymbol) {
//           if (currentLine && !currentLine.endsWith(' ')) {
//             currentLine += ' '
//           }
//           currentLine += text
//         } else {
//           currentLine += text
//         }

//         previousY = y
//       })

//       // 마지막 라인 처리
//       if (currentLine) {
//         markdown += currentLine.replace(/\s+/g, ' ')
//       }

//       // 페이지 구분
//       markdown += '\n<br/><br/>\n'
//     } catch (error) {
//       console.error(`PDF 페이지 ${pageNum} 처리 중 오류:`, error)
//       throw new Error(`PDF 페이지 ${pageNum} 처리 중 오류가 발생했습니다.`)
//     }
//   }

//   return markdown.trim()
// }

// pdf 핸들러 (처음 버전)
// const handlePdfFile = async (file: File): Promise<string> => {
//   const fileBuffer = await file.arrayBuffer()

//   // CMap 설정 추가
//   const loadingTask = pdfjs.getDocument({
//     data: fileBuffer,
//     cMapUrl: '/cmaps/', // public 폴더 내의 cmaps 경로
//     cMapPacked: true,
//   })

//   const pdf = await loadingTask.promise
//   let markdown = ''

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     try {
//       const page = await pdf.getPage(pageNum)
//       const textContent = await page.getTextContent()

//       // Y 좌표와 텍스트 데이터를 저장
//       const textItems: { y: number; text: string }[] = textContent.items
//         .filter(isTextItem)
//         .map((item) => {
//           const transform: number[] = item.transform as number[]
//           const y = transform[5] ?? 0
//           return { y, text: item.str }
//         })

//       // Y 좌표 기준으로 정렬 (위에서 아래로)
//       textItems.sort((a, b) => b.y - a.y)

//       // 줄바꿈 감지 및 텍스트 조합
//       let previousY: number | null = null
//       let currentLine = ''

//       textItems.forEach(({ y, text }) => {
//         // 현재 텍스트가 기호인지 확인
//         const isSymbol = SYMBOL_REGEX.test(text)

//         // 1. 기호 기준 줄바꿈
//         if (isSymbol) {
//           if (currentLine) {
//             // 현재 라인의 시작/끝 공백은 보존하되, 중복 공백만 제거
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n<br/>\n'
//             currentLine = ''
//           }
//           markdown += text
//           previousY = y
//           return
//         }

//         // 2. Y 좌표 기반 줄바꿈
//         if (previousY !== null && Math.abs(previousY - y) > Y_COORDINATE_THRESHOLD) {
//           if (currentLine) {
//             markdown += currentLine.replace(/\s+/g, ' ') + '\n\n'
//             currentLine = ''
//           }
//         }

//         // 띄어쓰기 처리
//         // 기호가 아닌 경우에만 띄어쓰기 추가
//         if (!isSymbol) {
//           // 현재 라인이 비어있지 않고, 마지막 문자가 띄어쓰기가 아닌 경우에만 띄어쓰기 추가
//           if (currentLine && !currentLine.endsWith(' ')) {
//             currentLine += ' '
//           }
//           currentLine += text
//         } else {
//           currentLine += text
//         }

//         previousY = y
//       })

//       // 마지막 라인 처리
//       if (currentLine) {
//         markdown += currentLine.replace(/\s+/g, ' ')
//       }

//       // 페이지 구분
//       markdown += '\n<br/><br/>\n'
//     } catch (error) {
//       console.error(`PDF 페이지 ${pageNum} 처리 중 오류:`, error)
//       throw new Error(`PDF 페이지 ${pageNum} 처리 중 오류가 발생했습니다.`)
//     }
//   }

//   return markdown.trim()
// }

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
