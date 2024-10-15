'use client'

import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import * as star from '@/../../public/icons/star.svg'

// Header 컴포넌트
const Header = () => {
  return (
    <>
      <header>
        <div
          className={cn(
            'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-[430px] translate-x-1/2 bg-background-base-01 px-[16px] transition-all'
          )}
        >
          <div className="flex size-full items-center justify-between">
            <div className="flex items-center">
              <button>
                <Icon name="cancel" className="size-[24px]" />
              </button>
              {/* 스크롤을 내려 제목이 뷰포트에서 사라지면 생길 텍스트 */}
              {/* <h2 className="ml-[16px] text-text1-medium">최근 이슈</h2> */}
            </div>
            <div className="flex">
              <Image src={star} width={16} height={16} alt="" className="mr-[4px]" />
              <Text as="span" typography="subtitle2-medium">
                130
              </Text>
              <button className="ml-[14px]">
                <Icon name="write-line" className="size-[24px]" />
                {/* 노션일 경우 아래 아이콘 렌더링 */}
                {/* <Icon name="refresh" /> */}
              </button>
              <button className="ml-[16px]">
                <Icon name="menu-dots" className="size-[24px]" />
              </button>
            </div>
          </div>
        </div>

        {/* data: 노트 제목, 문제 수, 글자 수, 마지막 수정 날짜 */}
        <div className="mt-[54px] px-[16px] pb-[18px] pt-[12px]">
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
