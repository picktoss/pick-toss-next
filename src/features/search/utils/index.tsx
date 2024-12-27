'use client'

import Text from '@/shared/components/ui/text'
import React from 'react'
import { extractPlainText } from '@/features/document/utils'

/**
 * 텍스트에서 키워드를 강조하는 함수
 */
export function highlightAndTrimText(text: string, keyword: string): JSX.Element | string {
  if (!text) return text

  const totalLength = 80
  const regex = new RegExp(`(${keyword})`, 'gi')
  const match = text.match(regex)

  if (!keyword || !match) {
    // 키워드가 없으면 텍스트를 80자로 자르기
    const trimmedText = text.length > totalLength ? text.slice(0, totalLength) + '...' : text
    return trimmedText
  }

  // 첫 번째 매칭된 키워드의 위치
  const keywordIndex = text.toLowerCase().indexOf(keyword.toLowerCase())
  const keywordLength = keyword.length

  // 키워드 기준 앞뒤로 잘라낼 텍스트 길이 계산
  const surroundingLength = Math.floor((totalLength - keywordLength) / 2)

  const start = Math.max(0, keywordIndex - surroundingLength)
  const end = Math.min(text.length, keywordIndex + keywordLength + surroundingLength)

  const trimmedText = text.slice(start, end)

  // 앞뒤가 잘린 경우 생략 표시 추가
  const prefix = start > 0 ? '...' : ''
  const suffix = end < text.length ? '...' : ''

  // 텍스트 분리 및 강조 처리
  const parts = trimmedText.split(regex)

  return (
    <>
      {prefix}
      {parts.map((part, index) =>
        regex.test(part) ? (
          <Text as="span" key={index} color="accent">
            {part}
          </Text>
        ) : (
          part
        )
      )}
      {suffix}
    </>
  )
}

/** 마크다운 텍스트를 받아
 * 문법을 제거하고 키워드에 강조를 해서 반환하는 함수
 */
export const MarkdownProcessor = ({
  markdownText,
  keyword,
}: {
  markdownText: string
  keyword: string
}) => {
  const plainText = extractPlainText(markdownText)
  const highlightedText = highlightAndTrimText(plainText, keyword)

  return <div>{highlightedText}</div>
}
