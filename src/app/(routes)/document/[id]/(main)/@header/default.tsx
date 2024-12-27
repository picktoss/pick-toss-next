'use client'

import MoveDocumentDrawer from '@/features/document/components/move-document-drawer'
import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import GoBackButton from '@/shared/components/custom/go-back-button'
import { getRelativeTime } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import ConfirmDialogWidget from '@/widget/confirm-dialog'
import { useDeleteDocument } from '@/requests/document/hooks'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store/user'

// Header 컴포넌트
const Header = () => {
  const router = useRouter()
  const { id } = useParams()
  const { userInfo: user } = useUserStore()

  const [isTitleHidden, setIsTitleHidden] = useState(false)
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  const { data } = useQuery(queries.document.item(Number(id)))
  const { mutate: deleteDocumentMutation } = useDeleteDocument()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleHidden(!entry?.isIntersecting)
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [])

  const handleClickDownload = (menuItemKey: string) => {
    if (menuItemKey === 'download') {
      alert('clicked ' + menuItemKey)
    }
  }

  const handleClickDelete = () => {
    deleteDocumentMutation([Number(id)], {
      onSuccess: () => router.replace('/document'),
    })
  }
  return (
    <>
      <header>
        <div
          className={cn(
            'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-[430px] translate-x-1/2 bg-background-base-01 px-[16px]'
          )}
        >
          <div className="flex size-full items-center justify-between">
            <div className="flex items-center">
              <GoBackButton icon="cancel" />
              {isTitleHidden && (
                <Text as="h2" typography="text1-medium" className="ml-[16px]">
                  {data?.documentName}
                </Text>
              )}
            </div>

            <div className="flex">
              <Icon name="star" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="subtitle2-medium">
                {user?.star}
              </Text>

              <Link href={String(id) + '/modify'} className="ml-[14px]">
                <Icon name="write-line" className="size-[24px]" />
              </Link>
              {/* 노션일 경우 아래 아이콘 렌더링 */}
              {/* <button>
                <Icon name="refresh" />
              </button> */}

              {/* menu */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn('ml-[16px] data-[state=open]:text-icon-disabled')}
                >
                  <Icon name="menu-dots" className="size-[24px]" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-background-base-01 p-0">
                  {/* 다운로드 */}
                  <DropdownMenuItem
                    className={cn(
                      'border-b border-border-divider w-[240px] px-[20px] py-[16px] cursor-pointer'
                    )}
                    onClick={() => handleClickDownload('download')}
                  >
                    <Text
                      typography="subtitle2-medium"
                      className="flex w-full items-center justify-between"
                    >
                      docx로 퀴즈 다운로드
                      <Icon name="download" className="size-[20px]" />
                    </Text>
                  </DropdownMenuItem>

                  {/* 노트 이동 */}
                  <MoveDocumentDrawer
                    triggerComponent={
                      <DropdownMenuItem
                        className={cn(
                          'border-b border-border-divider w-[240px] px-[20px] py-[16px] cursor-pointer'
                        )}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Text
                          typography="subtitle2-medium"
                          className="flex w-full items-center justify-between"
                        >
                          노트 이동
                          <Icon name="move" className="size-[20px]" />
                        </Text>
                      </DropdownMenuItem>
                    }
                    documentId={Number(id)}
                  />

                  {/* 노트 삭제 */}
                  <ConfirmDialogWidget
                    triggerComponent={
                      <DropdownMenuItem
                        className={cn(
                          'w-[240px] px-[20px] py-[16px] text-text-critical cursor-pointer'
                        )}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Text
                          typography="subtitle2-medium"
                          className="flex w-full items-center justify-between"
                        >
                          노트 삭제
                          <Icon name="bin" className="size-[20px]" />
                        </Text>
                      </DropdownMenuItem>
                    }
                    title="노트를 삭제할까요?"
                    content={
                      <Text typography="text1-medium">
                        선택한 노트와{' '}
                        <span className="text-text-wrong">{data?.totalQuizCount}개의 문제</span>가{' '}
                        <br />
                        모두 삭제됩니다.
                      </Text>
                    }
                    confirmButton={
                      <button onClick={handleClickDelete} className="ml-[21px] p-[4px]">
                        <Text color="critical">삭제하기</Text>
                      </button>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* data: 노트 제목, 문제 수, 글자 수, 마지막 수정 날짜 */}
        <div ref={titleRef} className=" px-[16px] pb-[18px] pt-[66px]">
          <Text as="h2" typography="title2" className="mb-[8px]">
            {data?.documentName}
          </Text>
          <div className="flex items-center text-text1-medium text-text-sub">
            <Text as="span">{data?.totalQuizCount}문제</Text>
            <Icon name="middle-dot" className="mx-[8px]" />
            <Text as="span">{data?.characterCount}자</Text>
            <Text as="span" typography="text1-regular" className="ml-[12px] text-text-caption">
              마지막 수정: {getRelativeTime(data?.updatedAt ?? '')}
            </Text>
            {/* 노션일 경우 아래 렌더링 */}
            {/* <Text
              typography="text1-regular"
              className="ml-[12px] flex items-center text-text-caption"
            >
              <Icon name="notion" className="mr-[4px] size-[19px]" />
              마지막 동기화: 3일 전
            </Text> */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
