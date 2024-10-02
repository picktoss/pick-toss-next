'use client'

import { Button } from './ui/button'
import Link from 'next/link'
import { useMemo } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'
import { SidebarCategoryAccordion } from './sidebar-category-accordion'
import Image from 'next/image'
import icons from '@/constants/icons'
import { useDocumentUsage } from '@/shared/hooks/use-document-usage'
import { CategoryProtector } from './category-protector'
import { useSession } from 'next-auth/react'
import { AIPickDialog } from './ai-pick-dialog'
import { CreateDocumentProtector } from './create-document-protector'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { findActiveNavItem } from './bottom-navigation'

/** @deprecated v2임 */
export default function LeftSidebar() {
  const segments = useSelectedLayoutSegments()
  const { data: session } = useSession()

  const {
    availableAiPickCount,
    possessDocumentCount,
    freePlanMaxPossessDocumentCount,
    uploadableCount,
    uploadableRate,
  } = useDocumentUsage()

  const activeItem = useMemo(() => findActiveNavItem(segments), [segments])

  return (
    <div className="border-gray-04 fixed left-0 z-50 flex h-screen w-[240px] flex-col items-center border-r bg-white py-[24px]">
      <div className="mb-[24px] flex h-[48px] items-center justify-center">
        <Link href="/main">
          <LogoIcon />
        </Link>
      </div>
      <div className="mb-[35px]">
        <CreateDocumentProtector
          skeleton={
            <Button className="bg-orange-05 hover:bg-orange-05/90 h-[47px] w-[151px] gap-[13px] rounded-[16px]">
              <span className="text-body2-bold">노트 추가하기</span>
              <PlusIcon />
            </Button>
          }
        >
          <CategoryProtector>
            <Link href="/create">
              <AddNoteButton />
            </Link>
          </CategoryProtector>
        </CreateDocumentProtector>
      </div>
      <div className="mb-[20px] w-full flex-1">
        <div className="bg-white">
          {navigationItems.slice(0, 3).map((item) => {
            const { title, href, icon: Icon } = item
            const isActive = activeItem === item

            if (href === '/repository') {
              return (
                <div key={title}>
                  <Link href={href} className="flex h-[56px] items-center gap-4 pl-[13px]">
                    <ChevronRight
                      className={cn(
                        'size-4 text-gray-06 transition-transform duration-200',
                        isActive && 'rotate-90'
                      )}
                      strokeWidth={3}
                    />
                    <Icon isActive={isActive} />
                    <span className={cn('text-gray-06', isActive && 'text-orange-06')}>
                      {title}
                    </span>
                  </Link>
                  <Accordion type="single" value={isActive ? 'active' : ''} collapsible>
                    <AccordionItem value="active">
                      {/* TODO: height calc 계산보다 더 나은 방식(상대적인 height 계산) 필요 */}
                      <AccordionContent className="max-h-[calc(100vh-580px)] overflow-auto px-[7px] py-[5px]">
                        <SidebarCategoryAccordion />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )
            }

            return (
              <Link key={title} href={href} className="flex h-[56px] items-center gap-4 pl-[45px]">
                <Icon isActive={isActive} />
                <span className={cn('text-gray-06', isActive && 'text-orange-06')}>{title}</span>
              </Link>
            )
          })}
        </div>
      </div>
      {session?.user && (
        <div className="mb-[40px] w-full px-[29px]">
          <div className="mb-[24px] flex flex-col gap-[8px]">
            <div className="flex gap-[7px]">
              <span className="text-small1-regular text-gray-07">
                남은 AI <i>p</i>ick 생성 횟수
              </span>
              <AIPickDialog
                trigger={
                  <Image role="button" src={icons.circleQuestion} width={16} height={16} alt="" />
                }
              />
            </div>
            <div className="text-h4-bold text-orange-05">{availableAiPickCount}회</div>
          </div>
          <div className="relative flex flex-col gap-[8px]">
            <div className="text-small1-regular text-gray-07">노트 창고 용량</div>
            <div className="text-h4-bold text-orange-05">
              {possessDocumentCount}/{freePlanMaxPossessDocumentCount}
            </div>
            <div className="relative h-[4px] overflow-hidden rounded-full *:h-full">
              <div className="bg-gray-02 w-full" />
              <div
                className="bg-orange-05 absolute left-0 top-0"
                style={{ width: `${uploadableRate}%` }}
              />
            </div>
            <div className="text-small1-regular text-gray-07">
              {uploadableCount}
              개의 노트를 더 저장할 수 있습니다
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const AddNoteButton = () => {
  const { clickedEvent } = useAmplitudeContext()

  return (
    <Button
      className="bg-orange-05 hover:bg-orange-05/90 h-[47px] w-[151px] gap-[13px] rounded-[16px]"
      onClick={() =>
        clickedEvent({
          buttonType: 'addNote',
          buttonName: 'sidebar_add_document_button',
        })
      }
    >
      <span className="text-body2-bold">노트 추가하기</span>
      <PlusIcon />
    </Button>
  )
}

// TODO: Icon 컴포넌트 구현
function LogoIcon() {
  return (
    <svg
      width="156"
      height="36"
      viewBox="0 0 156 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.4362 1.57121C30.4362 1.57121 30.4014 1.57681 30.3857 1.58356C23.177 3.41289 15.4999 5.96051 9.82236 10.9984C7.41027 13.1428 5.49169 15.9363 5.29247 19.2525C4.98085 24.4396 8.91567 28.8968 14.0803 29.2071C16.2065 29.3348 18.339 28.7203 20.0763 27.478C21.7457 26.2817 22.883 24.5032 23.8096 22.662C25.2415 19.8084 29.2221 12.0253 29.2221 12.0253C29.3606 11.7604 29.0989 11.46 28.8203 11.5702C27.5011 11.8488 24.5427 12.7561 23.411 13.4192C23.2561 13.5099 23.0698 13.3602 23.1221 13.1902C23.6245 11.5236 24.7717 9.89956 25.6757 8.49947C27.184 6.1584 28.8831 4.02117 30.8005 2.01248C30.8617 1.95075 30.9235 1.87751 30.9288 1.78933C30.9415 1.57848 30.6528 1.53805 30.436 1.57504L30.4362 1.57121Z"
        fill="url(#paint0_radial_3978_53)"
      />
      <g clipPath="url(#clip0_3978_53)">
        <path
          d="M50.5441 10.8444C49.6078 10.2343 48.47 9.92383 47.1471 9.92383C46.2489 9.92383 45.4541 10.0491 44.7573 10.3052C44.0605 10.5612 43.4453 10.8935 42.9064 11.302C42.3674 11.7106 41.8829 12.1682 41.4529 12.6802L41.6053 10.2888H38.7908L34.8984 32.4763H37.9579L39.5802 23.3464C39.8251 23.8584 40.179 24.316 40.6363 24.7246C41.0936 25.1332 41.6488 25.4654 42.3021 25.7215C42.9554 25.9775 43.6685 26.1028 44.447 26.1028C45.6718 26.1028 46.8042 25.874 47.844 25.411C48.8837 24.9534 49.7983 24.3106 50.5822 23.4826C51.3661 22.6546 51.9976 21.6849 52.4658 20.5736C52.934 19.4623 53.1898 18.2476 53.2334 16.9402C53.315 15.611 53.1191 14.418 52.6509 13.3557C52.1827 12.2935 51.475 11.4546 50.5387 10.8444H50.5441ZM49.2594 20.481C48.7476 21.4125 48.078 22.137 47.256 22.6546C46.434 23.1721 45.4976 23.4335 44.4524 23.4335C43.6141 23.4335 42.8846 23.2374 42.264 22.8507C41.6434 22.4639 41.1698 21.9246 40.854 21.2437C40.5383 20.5573 40.4076 19.7456 40.473 18.8086C40.5111 17.6048 40.7887 16.5425 41.3004 15.6219C41.8121 14.7013 42.4872 13.9658 43.3364 13.4157C44.1802 12.8655 45.1275 12.5876 46.1672 12.5876C47.0219 12.5876 47.7514 12.7946 48.3393 13.1978C48.9327 13.6063 49.3846 14.162 49.7003 14.8701C50.0161 15.5729 50.1521 16.3845 50.114 17.3051C50.0542 18.4872 49.7656 19.5495 49.2594 20.4756V20.481Z"
          fill="#292B2C"
        />
        <path
          d="M57.2785 3.52344C56.6851 3.52344 56.2006 3.7032 55.8249 4.05729C55.4493 4.41682 55.2588 4.86896 55.2588 5.41916C55.2588 5.96935 55.4493 6.45962 55.8249 6.83005C56.2006 7.19503 56.6851 7.38024 57.2785 7.38024C57.8718 7.38024 58.3291 7.19503 58.7156 6.83005C59.1022 6.46507 59.2981 5.99114 59.2981 5.41916C59.2981 4.84717 59.1022 4.41137 58.7156 4.05729C58.3291 3.69776 57.8501 3.52344 57.2785 3.52344Z"
          fill="#292B2C"
        />
        <path d="M58.808 10.2939H55.7485V25.7375H58.808V10.2939Z" fill="#292B2C" />
        <path
          d="M66.7996 13.1754C67.491 12.7668 68.2477 12.5653 69.0642 12.5653C70.0659 12.5653 70.926 12.8104 71.6501 13.3007C72.3741 13.791 72.8368 14.4773 73.0437 15.3544H76.2284C75.8799 13.6984 75.0797 12.3801 73.8222 11.3995C72.5646 10.419 70.9914 9.92871 69.0915 9.92871C67.6216 9.92871 66.2987 10.2719 65.1283 10.9528C63.9524 11.6392 63.0433 12.5871 62.3901 13.8019C61.7368 15.0166 61.4102 16.4439 61.4102 18.0781C61.4102 19.7124 61.7368 21.0198 62.3901 22.2454C63.0433 23.4711 63.9579 24.419 65.1283 25.0945C66.3042 25.7699 67.6216 26.1077 69.0915 26.1077C70.9696 26.1077 72.5429 25.6065 73.8058 24.6042C75.0688 23.6019 75.88 22.2945 76.2229 20.682H73.0383C72.8967 21.2758 72.6409 21.7824 72.2707 22.1964C71.9059 22.6159 71.4378 22.9373 70.877 23.1606C70.3163 23.384 69.7066 23.4983 69.0533 23.4983C68.4436 23.4983 67.8557 23.3731 67.295 23.1279C66.7343 22.8828 66.2498 22.5341 65.8415 22.0875C65.4332 21.6408 65.112 21.0688 64.8779 20.3715C64.6438 19.6797 64.524 18.8898 64.524 18.0128C64.524 16.8089 64.7255 15.8011 65.1338 14.9949C65.5421 14.1886 66.0919 13.5785 66.7887 13.17L66.7996 13.1754Z"
          fill="#292B2C"
        />
        <path
          d="M91.324 10.2945H87.6494L81.6503 16.7824V3.67578H78.5908V25.738H81.6503V17.8283L88.2972 25.738H92.1515L84.7206 17.3544L91.324 10.2945Z"
          fill="#292B2C"
        />
        <path
          d="M98.1507 6.40486H95.4887L95.0912 10.2944H92.4292V12.8656H95.0912V20.8298C95.0912 22.0554 95.2872 23.0251 95.6737 23.7387C96.0603 24.4523 96.6101 24.9644 97.3287 25.2694C98.0473 25.5745 98.8911 25.727 99.871 25.727H102.381V23.1231H100.606C99.7076 23.1231 99.0762 22.9652 98.706 22.6492C98.3412 22.3333 98.1561 21.734 98.1561 20.857V12.8601H102.506V10.2889H98.1561V6.39941L98.1507 6.40486Z"
          fill="#292B2C"
        />
        <path
          d="M115.266 10.9371C114.123 10.2616 112.816 9.92383 111.346 9.92383C109.877 9.92383 108.592 10.2616 107.427 10.9371C106.262 11.6125 105.347 12.555 104.689 13.7697C104.024 14.9845 103.692 16.4118 103.692 18.046C103.692 19.6802 104.019 21.0421 104.672 22.2569C105.326 23.4717 106.235 24.4141 107.394 25.0896C108.559 25.7651 109.877 26.1028 111.341 26.1028C112.805 26.1028 114.09 25.7651 115.244 25.0896C116.398 24.4141 117.313 23.4717 117.983 22.2569C118.658 21.0421 118.995 19.6258 118.995 18.0133C118.995 16.4009 118.658 14.9627 117.983 13.7534C117.307 12.5495 116.398 11.6071 115.255 10.9371H115.266ZM115.239 21.0149C114.809 21.832 114.253 22.4421 113.568 22.8507C112.882 23.2592 112.136 23.4608 111.319 23.4608C110.503 23.4608 109.757 23.2592 109.082 22.8507C108.407 22.4421 107.862 21.832 107.443 21.0149C107.024 20.1977 106.817 19.1954 106.817 18.0133C106.817 16.8312 107.024 15.8016 107.443 14.9954C107.862 14.1892 108.418 13.5791 109.109 13.1705C109.8 12.762 110.557 12.5604 111.374 12.5604C112.19 12.5604 112.936 12.7674 113.611 13.1705C114.286 13.5791 114.831 14.1892 115.25 14.9954C115.669 15.8016 115.876 16.8094 115.876 18.0133C115.876 19.2172 115.663 20.1977 115.233 21.0149H115.239Z"
          fill="#292B2C"
        />
        <path
          d="M130.575 17.3268C129.72 17.0108 128.746 16.7493 127.668 16.5478C126.911 16.4062 126.28 16.2318 125.768 16.0248C125.256 15.8233 124.864 15.5781 124.587 15.2894C124.309 15.0062 124.173 14.6793 124.173 14.3089C124.173 13.7587 124.407 13.3011 124.875 12.947C125.343 12.5875 126.018 12.4132 126.895 12.4132C127.771 12.4132 128.501 12.6093 129.023 12.996C129.546 13.3828 129.856 13.9276 129.954 14.6194H132.927C132.72 13.1104 132.099 11.9501 131.059 11.1439C130.02 10.3377 128.642 9.93457 126.927 9.93457C125.746 9.93457 124.712 10.1361 123.835 10.5338C122.959 10.9315 122.289 11.4817 121.832 12.1898C121.375 12.8925 121.141 13.6879 121.141 14.5649C121.141 15.3003 121.293 15.9104 121.598 16.4007C121.903 16.891 122.316 17.305 122.839 17.6427C123.362 17.9805 123.955 18.2529 124.63 18.4544C125.305 18.6614 125.975 18.8303 126.65 18.9774C127.423 19.1027 128.087 19.2552 128.642 19.4349C129.198 19.6147 129.606 19.8599 129.883 20.154C130.161 20.4482 130.297 20.884 130.297 21.456C130.297 21.8427 130.188 22.2077 129.976 22.5455C129.764 22.8832 129.437 23.1501 128.996 23.3408C128.555 23.5369 128.011 23.6295 127.357 23.6295C126.623 23.6295 125.997 23.5097 125.474 23.2645C124.951 23.0194 124.543 22.6925 124.249 22.284C123.955 21.8754 123.754 21.4287 123.65 20.9385H120.558C120.678 21.9789 121.021 22.8832 121.582 23.6513C122.142 24.4194 122.91 25.0186 123.879 25.4598C124.848 25.9011 126.007 26.119 127.352 26.119C128.577 26.119 129.644 25.912 130.553 25.5089C131.462 25.1003 132.164 24.5338 132.665 23.8093C133.166 23.0848 133.417 22.2295 133.417 21.249C133.417 20.1486 133.155 19.2988 132.638 18.705C132.115 18.1112 131.43 17.6591 130.569 17.3431L130.575 17.3268Z"
          fill="#292B2C"
        />
        <path
          d="M147.064 18.6886C146.541 18.0949 145.855 17.6427 144.995 17.3268C144.141 17.0108 143.166 16.7493 142.088 16.5478C141.332 16.4062 140.7 16.2318 140.188 16.0248C139.677 15.8233 139.285 15.5781 139.007 15.2894C138.729 15.0062 138.593 14.6793 138.593 14.3089C138.593 13.7587 138.827 13.3011 139.296 12.947C139.764 12.5875 140.439 12.4132 141.315 12.4132C142.192 12.4132 142.921 12.6093 143.444 12.996C143.966 13.3828 144.277 13.9276 144.375 14.6194H147.347C147.14 13.1104 146.52 11.9501 145.48 11.1439C144.44 10.3377 143.063 9.93457 141.348 9.93457C140.167 9.93457 139.132 10.1361 138.256 10.5338C137.379 10.9315 136.71 11.4817 136.252 12.1898C135.795 12.8925 135.561 13.6879 135.561 14.5649C135.561 15.3003 135.713 15.9104 136.018 16.4007C136.323 16.891 136.737 17.305 137.259 17.6427C137.782 17.9805 138.375 18.2529 139.051 18.4544C139.726 18.6614 140.395 18.8303 141.07 18.9774C141.843 19.1027 142.507 19.2552 143.063 19.4349C143.618 19.6147 144.026 19.8599 144.304 20.154C144.581 20.4482 144.718 20.884 144.718 21.456C144.718 21.8427 144.609 22.2077 144.396 22.5455C144.184 22.8832 143.857 23.1501 143.417 23.3408C142.976 23.5369 142.431 23.6295 141.778 23.6295C141.043 23.6295 140.417 23.5097 139.894 23.2645C139.372 23.0194 138.963 22.6925 138.669 22.284C138.375 21.8754 138.174 21.4287 138.071 20.9385H134.979C135.098 21.9789 135.441 22.8832 136.002 23.6513C136.563 24.4194 137.33 25.0186 138.299 25.4598C139.268 25.9011 140.428 26.119 141.772 26.119C142.997 26.119 144.064 25.912 144.973 25.5089C145.883 25.1003 146.585 24.5338 147.086 23.8093C147.587 23.0848 147.837 22.2295 147.837 21.249C147.837 20.1486 147.576 19.2988 147.058 18.705L147.064 18.6886Z"
          fill="#292B2C"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_3978_53"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.21943 26.6324) rotate(-68.4287) scale(16.6317 14.2798)"
        >
          <stop stopColor="#C7D6FF" />
          <stop offset="1" stopColor="#FB7E20" />
        </radialGradient>
        <clipPath id="clip0_3978_53">
          <rect
            width="120.857"
            height="28.7755"
            fill="white"
            transform="translate(34.7622 3.6123)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2563 0V20" stroke="#F6FAFD" strokeWidth="2" />
      <path d="M20.5132 10L0.000361264 10" stroke="#F6FAFD" strokeWidth="2" />
    </svg>
  )
}
