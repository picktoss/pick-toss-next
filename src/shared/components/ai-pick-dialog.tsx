'use client'

import { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { cn } from '@/shared/lib/utils'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface Props {
  trigger: ReactNode
  confirm?: () => void
}

export function AIPickDialog({ trigger, confirm }: Props) {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const { clickedEvent } = useAmplitudeContext()

  const availableAiPickCount = session?.user.dto.documentUsage.availableAiPickCount || 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={() =>
          clickedEvent({
            buttonType: 'aiPickDialog',
            buttonName: 'ai_pick_dialog_trigger',
          })
        }
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        displayCloseButton={confirm == null}
        className={cn(
          'h-[439px] w-[320px] pt-[32px] flex flex-col items-center',
          confirm != null ? 'pb-[22px]' : 'pb-[63px]'
        )}
      >
        <DialogHeader>
          <div className="text-h2-bold-eng text-gray-09">
            AI <i>p</i>ick
          </div>
        </DialogHeader>
        <PinIcon className="ml-[5px] mt-[31px] shrink-0" />
        <p className={cn('mt-[44px] text-center text-text-medium', confirm != null && 'mt-[24px]')}>
          AI가 노트를 되돌아볼 수 있는 질문 리스트를
          <br />
          생성하고, 퀴즈로 만들 내용을 선정해요
        </p>
        <div
          className={cn(
            'flex flex-col items-center gap-[8px] rounded-[12px] bg-gray-01 px-[36px] pb-[17px] pt-[16px] mt-[26px]',
            confirm != null && 'mt-[17px]'
          )}
        >
          <div className="text-body1-bold text-gray-08">
            이번 달 남은 횟수: {session?.user.dto.documentUsage.availableAiPickCount}회
          </div>
          <div className="text-small1-regular text-gray-06">횟수는 매달 5회로 초기화됩니다</div>
        </div>
        {confirm != null && (
          <Button
            variant={availableAiPickCount > 0 ? 'gradation' : 'default'}
            className="mt-[18px] w-full text-white"
            onClick={() => {
              if (availableAiPickCount > 0) {
                confirm()
              }
              setOpen(false)
            }}
          >
            {availableAiPickCount > 0 ? '시작하기' : '닫기'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

function PinIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="81"
      height="82"
      viewBox="0 0 81 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.0745 53.763L15.7369 50.1039L0.490832 76.5108C-0.519588 78.2609 0.0800377 80.4987 1.83013 81.5092C3.58023 82.5196 5.81807 81.92 6.82849 80.1699L22.0745 53.763Z"
        fill="url(#paint0_linear_4223_2638)"
      />
      <path
        d="M28.1701 43.1946L21.8324 39.5355L10.8553 58.5485L17.1929 62.2076L28.1701 43.1946Z"
        fill="url(#paint1_linear_4223_2638)"
      />
      <path
        d="M50.6217 25.9682C51.2771 26.3466 51.5017 27.1847 51.1233 27.8401L49.1945 31.1809C47.7019 33.7661 44.4214 34.6756 41.8167 33.2491L31.1035 51.8048C33.6379 53.3485 34.4888 56.6419 32.9971 59.2256L31.0682 62.5665C30.6898 63.2219 29.8517 63.4465 29.1963 63.0681L3.74595 48.3743C3.09052 47.9959 2.86596 47.1578 3.24437 46.5024L5.1732 43.1615C6.66641 40.5752 9.94905 39.6661 12.5544 41.0952L23.2674 22.5397C20.7304 20.9968 19.8782 17.7017 21.3706 15.1168L23.2994 11.776C23.6778 11.1206 24.5159 10.896 25.1714 11.2744L50.6217 25.9682Z"
        fill="url(#paint2_linear_4223_2638)"
      />
      <path
        d="M60.3841 0.923076C61.1154 -0.307692 62.7809 -0.307692 63.5123 0.923076L66.3416 5.68426C66.4606 5.88449 66.6116 6.06029 66.7876 6.20343L71.1284 9.73449C72.1155 10.5375 72.1155 12.1381 71.1284 12.9411L66.7876 16.4721C66.6116 16.6153 66.4606 16.7911 66.3416 16.9913L63.5123 21.7525C62.7809 22.9833 61.1154 22.9833 60.3841 21.7525L57.5547 16.9913C57.4358 16.7911 57.2848 16.6153 57.1088 16.4721L52.768 12.9411C51.7808 12.1381 51.7808 10.5375 52.768 9.73449L57.1088 6.20343C57.2848 6.06029 57.4358 5.88449 57.5547 5.68426L60.3841 0.923076Z"
        fill="url(#paint3_linear_4223_2638)"
      />
      <path
        d="M72.1679 23.3671C72.6904 22.444 73.88 22.444 74.4024 23.3671L76.4233 26.938C76.5083 27.0881 76.6162 27.22 76.7419 27.3273L79.8425 29.9756C80.5476 30.5779 80.5476 31.7783 79.8425 32.3806L76.7419 35.0289C76.6162 35.1362 76.5083 35.2681 76.4233 35.4182L74.4024 38.9891C73.88 39.9122 72.6904 39.9122 72.1679 38.9891L70.147 35.4182C70.062 35.2681 69.9541 35.1362 69.8285 35.0289L66.7279 32.3806C66.0228 31.7783 66.0228 30.5779 66.7279 29.9756L69.8285 27.3273C69.9541 27.22 70.062 27.0881 70.147 26.938L72.1679 23.3671Z"
        fill="url(#paint4_linear_4223_2638)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4223_2638"
          x1="29"
          y1="41"
          x2="-5.20282"
          y2="42.6067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4223_2638"
          x1="29"
          y1="41"
          x2="-5.20282"
          y2="42.6067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4223_2638"
          x1="29"
          y1="41"
          x2="-5.20282"
          y2="42.6067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4223_2638"
          x1="29"
          y1="41"
          x2="-5.20282"
          y2="42.6067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_4223_2638"
          x1="29"
          y1="41"
          x2="-5.20282"
          y2="42.6067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8428" />
          <stop offset="1" stopColor="#93B0FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
