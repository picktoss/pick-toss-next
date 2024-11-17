'use client'

import { EditDocumentProvider } from '@/features/editor/context/edit-document-context'
import {
  useNotionAuthMutation,
  useGetNotionMdFile,
  useGetNotionPages,
} from '@/requests/notion/hooks'
import Icon from '@/shared/components/custom/icon'
import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { countPlainTextCharacters } from '@/shared/utils/text'
import { useEffect, useState } from 'react'

const NotionDocument = () => {
  const [title, setTitle] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [isReconnect, setIsReconnect] = useState(false)

  const { notionAccessToken, mutate: notionAuth } = useNotionAuthMutation()
  const { data: notionPages } = useGetNotionPages(notionAccessToken)
  const pageIds = notionPages?.map((pageData) => pageData.id)
  const pageTitle = notionPages && notionPages[0].properties['Title']
  const { data: notionMdData } = useGetNotionMdFile(notionAccessToken ?? '', pageIds ?? [])

  useEffect(() => {
    if (!notionAccessToken) {
      notionAuth()
    }
  }, [notionAccessToken, notionAuth])

  useEffect(() => {
    if (notionMdData) {
      if (pageIds?.length) {
        setPageCount(pageIds?.length)
      }

      if (notionMdData.content) {
        const characters = countPlainTextCharacters(notionMdData.content)
        setCharacterCount(characters)
      }

      setIsReconnect(false)
    }
  }, [pageIds, notionMdData])

  useEffect(() => {
    if (pageTitle?.type === 'title') {
      const titleText = pageTitle.title.map((text) => text.plain_text).join(' ')
      setTitle(titleText)
    } else {
      console.error("Title property is not of type 'title' or is undefined")
      setTitle('')
    }
  }, [pageTitle])

  return (
    <>
      {!notionMdData || isReconnect ? (
        <Loading center />
      ) : (
        <EditDocumentProvider>
          <div className="fixed top-[54px] flex w-full max-w-mobile items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
            <div className="flex items-center">
              <Icon name="info" className="mr-[8px] size-[16px]" />
              <Text as="span" typography="text2-medium" className="mr-[4px] text-text-secondary">
                연결한 페이지: {title}
                {pageCount > 1 && (
                  <>
                    {' 외 '} {pageCount - 1} {' 개'}
                  </>
                )}
              </Text>
              <Text as="span" typography="text2-medium" className="text-text-caption">
                {characterCount}
              </Text>
            </div>
            <button
              onClick={() => {
                setIsReconnect(true)
                notionAuth()
              }} // 변경 버튼 클릭 시 노션 연동 로직 다시 수행
              className="text-text1-medium text-button-text-tertiary"
            >
              <Text typography="text1-medium" className="text-text-secondary">
                변경
              </Text>
            </button>
          </div>

          <div className="mb-[100px] mt-[97px] size-full">
            <h2 className="w-full px-[16px] py-[24px] align-middle text-title2 text-text-placeholder-02">
              {title}
            </h2>
            <div className="px-[20px] pb-[10px] pt-[4px] text-text-disabled">
              {notionMdData?.content}
            </div>
          </div>
        </EditDocumentProvider>
      )}
    </>
  )
}

export default NotionDocument
