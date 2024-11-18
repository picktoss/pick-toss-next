import { marked } from 'marked'

// 마크다운 형식에서 글자 수를 계산해서 반환하는 함수
export const countPlainTextCharacters = (markdown: string): number => {
  const html = marked(markdown)
  const plainText = html.replace(/<\/?[^>]+(>|$)/g, '')

  // 문자열 길이 계산 (공백 제외 - trim() 적용)
  return plainText.trim().length
}
