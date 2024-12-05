'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'

interface Props {
  statusCode: number
}

function Error({ statusCode }: Props) {
  if (statusCode === 500)
    return (
      <div className="center flex-center h-dvh w-dvw max-w-mobile flex-col bg-background-base-02">
        <Image src={'/images/network-error.png'} alt="" width={135} height={140} />
        <div className="mt-[22.4px] flex flex-col items-center gap-[10px] lg:mt-[15.7px] lg:gap-[16px] lg:py-0">
          <Text typography="title3" className="text-center">
            네트워크 문제로 <br /> 연결이 지연되고 있습니다
          </Text>
          <Text typography="text1-medium" color="sub" className="px-[45px] text-center">
            네트워크 연결 상태를 확인하신 후, <br />
            새로고침 버튼을 눌러주세요
          </Text>
        </div>
        <div className="mt-[54px] flex w-full max-w-[480px] flex-col gap-[16px] px-[20px]">
          <div className="flex-center">
            <Button
              variant={'mediumRound'}
              className="pl-[16px] pr-[24px]"
              onClick={() => window.location.reload()}
            >
              <Icon name="refresh" className="mr-[8px] size-[20px]" />
              새로고침
            </Button>
          </div>
        </div>
      </div>
    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  if (
    err &&
    (err.message?.includes('NetworkError') ||
      err.message?.includes('Failed to fetch') ||
      err.message?.includes('ECONNREFUSED'))
  ) {
    return { statusCode: 500 }
  }
  const statusCode = res?.statusCode || err?.statusCode || 404
  return { statusCode }
}

export default Error
