'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import icons from '@/constants/icons'
import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

interface MyStarsDrawerDialog {
  stars: number
  continuousQuizDatesCount: number
  trigger: ReactNode
}

export default function MyStarsDrawerDialog({
  trigger,
  stars,
  continuousQuizDatesCount,
}: MyStarsDrawerDialog) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { clickedEvent } = useAmplitudeContext()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          onClick={() =>
            clickedEvent({
              buttonType: 'myStar',
              buttonName: 'my_star_drawer_dialog_trigger',
            })
          }
        >
          {trigger}
        </DialogTrigger>
        <DialogContent className="min-w-[560px] pb-[80px] pt-[26px]">
          <MyStarsContent
            stars={stars}
            continuousQuizDatesCount={((continuousQuizDatesCount - 1) % 5) + 1}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        className="cursor-pointer"
        onClick={() =>
          clickedEvent({
            buttonType: 'myStar',
            buttonName: 'my_star_drawer_dialog_trigger',
          })
        }
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="min-h-[500px]">
        <MyStarsContent
          stars={stars}
          continuousQuizDatesCount={((continuousQuizDatesCount - 1) % 5) + 1}
        />
      </DrawerContent>
    </Drawer>
  )
}

function MyStarsContent({
  stars,
  continuousQuizDatesCount,
}: {
  stars: number
  continuousQuizDatesCount: number
}) {
  return (
    <div className="flex flex-col items-center bg-white lg:min-h-0">
      <div className="mb-[16px] mt-[34px] text-h4-bold text-gray-09 lg:mb-[19px] lg:mt-0">
        나의 별
      </div>

      <div className="flex w-full flex-col items-center gap-[24px] px-[20px] lg:gap-[16px]">
        <div className="flex h-[40px] items-start gap-[16px]">
          <Image src={icons.star} width={32} height={32} alt="" />
          <span className="text-h2-bold text-gray-08">{stars}개</span>
        </div>

        <div className="px-[17px] text-center text-text-regular text-gray-07 lg:px-0">
          별 하나로 퀴즈 하나를 생성할 수 있습니다
          <br />
          오늘의 퀴즈를 풀 때마다 별 5개를 드리고, 5일 연속 퀴즈를 풀면 20개를 드려요
        </div>

        <div className="flex w-full max-w-[376px] justify-center rounded-[12px] bg-gray-01 pb-[28px] pt-[21px] text-small1-bold text-gray-07">
          <div className="relative mx-[20px] flex w-full max-w-[324px] justify-between">
            <div className="absolute bottom-[20px] w-full border border-dashed" />

            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="relative flex flex-col items-center gap-[8px]">
                <div>{idx + 1}일차</div>
                {idx + 1 <= continuousQuizDatesCount ? (
                  <CheckIcon />
                ) : (
                  <div
                    className={cn(
                      'z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02',
                      idx === 4 && 'text-orange-06'
                    )}
                  >
                    {idx === 4 ? '+20' : '+5'}
                  </div>
                )}
                {idx === 4 && <StarsIcon className="absolute bottom-[-13px] left-[-15px] z-50" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="mt-[48px] flex w-full flex-col items-center gap-[32px] px-[20px] lg:mt-[32px] lg:gap-[24px]">
        <div className="relative flex h-[17px] w-full justify-center">
          <div className="center absolute h-px w-full rounded-full bg-gray-02" />
          <div className="z-10 bg-white px-[12px] text-body2-medium text-orange-05">
            더 많은 별을 얻고 싶다면?
          </div>
        </div>
        <div className="flex w-full justify-center gap-[16px]">
          <Button className="relative h-[40px] w-[160px] bg-blue-01 !text-body2-bold text-blue-06 hover:bg-blue-01">
            <div>친구 초대하기</div>
            <Tag label="+20개" className="absolute right-[-14px] top-[-8px]" />
          </Button>
          <Button className="relative h-[40px] w-[160px] bg-blue-01 !text-body2-bold text-blue-06 hover:bg-blue-01">
            <div>광고 보고 받기</div>
            <Tag label="+5개" className="absolute right-[-14px] top-[-8px]" />
          </Button>
        </div>
      </div> */}
    </div>
  )
}

// interface TagProps extends HTMLAttributes<HTMLDivElement> {
//   label: string
// }

// function Tag({ className, label }: TagProps) {
//   return (
//     <div className={className}>
//       <div className="flex rounded-[10px] rounded-bl-none bg-orange-05 px-[8px] py-[4px] text-tag text-gray-01">
//         {label}
//       </div>
//     </div>
//   )
// }

// 초기 사용자 회원 가입 완료 시,
// 연속 풀이 횟수 등

function StarsIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="66"
      height="69"
      viewBox="0 0 66 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M59.5489 0.927052C59.8483 0.0057414 61.1517 0.00574047 61.4511 0.927051L61.9593 2.49139C62.0932 2.90341 62.4772 3.18237 62.9104 3.18237H64.5552C65.524 3.18237 65.9267 4.42199 65.143 4.99139L63.8123 5.9582C63.4618 6.21285 63.3152 6.66422 63.449 7.07624L63.9573 8.64058C64.2567 9.56189 63.2022 10.328 62.4185 9.75861L61.0878 8.7918C60.7373 8.53715 60.2627 8.53715 59.9122 8.7918L58.5815 9.75861C57.7978 10.328 56.7433 9.56189 57.0427 8.64058L57.551 7.07624C57.6848 6.66422 57.5382 6.21285 57.1877 5.9582L55.857 4.99139C55.0733 4.42199 55.476 3.18237 56.4448 3.18237H58.0896C58.5228 3.18237 58.9068 2.90341 59.0407 2.49139L59.5489 0.927052Z"
        fill="#FFD180"
      />
      <path
        d="M4.54894 49.9271C4.8483 49.0057 6.1517 49.0057 6.45106 49.9271L6.95934 51.4914C7.09321 51.9034 7.47717 52.1824 7.9104 52.1824H9.55524C10.524 52.1824 10.9267 53.422 10.143 53.9914L8.81232 54.9582C8.46183 55.2128 8.31518 55.6642 8.44905 56.0762L8.95733 57.6406C9.25669 58.5619 8.20221 59.328 7.41849 58.7586L6.08779 57.7918C5.7373 57.5372 5.2627 57.5372 4.91221 57.7918L3.58151 58.7586C2.7978 59.328 1.74331 58.5619 2.04267 57.6406L2.55095 56.0762C2.68483 55.6642 2.53817 55.2128 2.18768 54.9582L0.856976 53.9914C0.0732617 53.422 0.476037 52.1824 1.44476 52.1824H3.0896C3.52283 52.1824 3.90678 51.9034 4.04066 51.4914L4.54894 49.9271Z"
        fill="#FFD180"
      />
      <path
        d="M59.5489 59.9271C59.8483 59.0057 61.1517 59.0057 61.4511 59.9271L61.9593 61.4914C62.0932 61.9034 62.4772 62.1824 62.9104 62.1824H64.5552C65.524 62.1824 65.9267 63.422 65.143 63.9914L63.8123 64.9582C63.4618 65.2128 63.3152 65.6642 63.449 66.0762L63.9573 67.6406C64.2567 68.5619 63.2022 69.328 62.4185 68.7586L61.0878 67.7918C60.7373 67.5372 60.2627 67.5372 59.9122 67.7918L58.5815 68.7586C57.7978 69.328 56.7433 68.5619 57.0427 67.6406L57.551 66.0762C57.6848 65.6642 57.5382 65.2128 57.1877 64.9582L55.857 63.9914C55.0733 63.422 55.476 62.1824 56.4448 62.1824H58.0896C58.5228 62.1824 58.9068 61.9034 59.0407 61.4914L59.5489 59.9271Z"
        fill="#FFD180"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: HTMLElement['className'] }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#FFAB40" />
      <path
        d="M12.5 18.5714L18.8587 25L28.75 15"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
