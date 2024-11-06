'use client'

import MoveDocumentDrawer from '@/features/document/components/move-document-drawer'
import DirectoryDialog from '@/features/quiz/components/directory-dialog'
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
import usePreviousPath from '@/shared/hooks/use-previous-path'

// Header 컴포넌트
const Header = () => {
  const router = useRouter()
  const { id } = useParams()
  const { getPreviousPath } = usePreviousPath({ getCustomPath: true })

  const handleClickCancel = () => {
    const previousPath = getPreviousPath()
    previousPath ? router.replace(previousPath) : router.replace('/')
  }

  const handleClickDownload = (menuItemKey: string) => {
    if (menuItemKey === 'download') {
      alert('clicked ' + menuItemKey)
    }
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
              <button onClick={handleClickCancel}>
                <Icon name="cancel" className="size-[24px]" />
              </button>
              {/* 스크롤을 내려 제목이 뷰포트에서 사라지면 생길 텍스트 */}
              {/* <h2 className="ml-[16px] text-text1-medium">최근 이슈</h2> */}
            </div>

            <div className="flex">
              <Icon name="star" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="subtitle2-medium">
                130
              </Text>

              <Link href={`${id[0]}/modify`} className="ml-[14px]">
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
                  />

                  {/* 노트 삭제 */}
                  <DirectoryDialog
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
                        최근 이슈 노트와 <span className="text-text-wrong">14개의 문제</span>가{' '}
                        <br />
                        모두 삭제됩니다.
                      </Text>
                    }
                    onConfirm={() => {}}
                    confirmText="삭제하기"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* data: 노트 제목, 문제 수, 글자 수, 마지막 수정 날짜 */}
        <div className=" px-[16px] pb-[18px] pt-[66px]">
          <h2 className="mb-[8px] text-title2">최근 이슈</h2>
          <div className="flex items-center text-text1-medium text-text-sub">
            <Text as="span">28문제</Text>
            <Icon name="middle-dot" className="mx-[8px]" />
            <Text as="span">2382자</Text>
            <Text as="span" typography="text1-regular" className="ml-[12px] text-text-caption">
              마지막 수정: 3일 전
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
