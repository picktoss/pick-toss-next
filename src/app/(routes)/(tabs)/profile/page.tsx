import ComingSoon from '@/components/coming-soon'
import icons from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'
import { profileConfig } from './config'
import SignOut from './components/sign-out'
import Section from './components/section'
import ProTag from '@/components/pro-tag'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { cn } from '@/lib/utils'

export default async function Profile() {
  const session = await auth()

  if (!session) throw new Error('로그인이 필요합니다.')

  const { name, documentUsage } = session.user.dto
  const { possibleUploadedDocumentCount, possessDocumentCount, freePlanMaxPossessDocumentCount } =
    documentUsage

  const uploadableCount = freePlanMaxPossessDocumentCount - possessDocumentCount
  const uploadableRate = Math.floor((possessDocumentCount / freePlanMaxPossessDocumentCount) * 100)

  return (
    <main className="px-[20px] pb-[66px]">
      <Section
        className="mb-[52px] mt-[55px]"
        content={
          <div className="relative bg-white px-[20px]">
            <div>
              <div className="absolute left-[16px] top-[-40px] size-[80px] rounded-full bg-orange-03" />
              <button className="absolute right-[18px] top-[15px] flex h-[32px] w-[120px] items-center justify-center gap-[8px] rounded-[4px] bg-orange-01 text-small1-bold text-orange-06 hover:bg-orange-02/80">
                <EditPencilIcon />
                <div>정보 수정하기</div>
              </button>
            </div>
            <div className="flex flex-col gap-[24px] pb-[33px] pt-[55px]">
              <div className="px-[4px] text-h4-bold text-gray-09">{name}</div>
              <div className="h-px w-full rounded-full bg-gray-02" />
              <div className="flex flex-col gap-[8px]">
                <div className="flex gap-[7px]">
                  <span className="text-small1-regular text-gray-07">남은 AI pick 생성 횟수</span>
                  <Image src={icons.circleQuestion} width={16} height={16} alt="" />
                </div>
                <div className="text-h4-bold text-orange-05">{possibleUploadedDocumentCount}회</div>
              </div>
              <div className="relative flex flex-col gap-[8px]">
                <div className="text-small1-regular text-gray-07">나의 노트 창고</div>
                <div className="text-h4-bold text-orange-05">
                  {possessDocumentCount}/{freePlanMaxPossessDocumentCount}
                </div>
                <button className="absolute right-[4px] top-[6px] flex w-fit items-center gap-[8px] rounded-[16px] bg-gray-01 px-[12px] py-[6px]">
                  <ProTag />
                  <div className="text-small1-bold text-gray-08">시작하기</div>
                </button>
                <div className="relative h-[8px] overflow-hidden rounded-full *:h-full">
                  <div className="w-full bg-gray-02" />
                  <div
                    className={cn('absolute left-0 top-0 bg-orange-05', `w-[${uploadableRate}%]`)}
                  />
                </div>
                <div className="text-small1-regular text-gray-07">
                  {uploadableCount}
                  개의 노트를 더 저장할 수 있습니다
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Section
        className="mb-[40px]"
        title={profileConfig.userConfig.name}
        content={
          <div className="flex flex-col rounded-[12px] bg-white py-[12px] text-gray-08 *:px-[20px]">
            {profileConfig.userConfig.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between py-[12px]"
              >
                <div className="flex items-center gap-[8px]">
                  <span>{item.label}</span>
                  {item.disabled && <ComingSoon />}
                </div>
                <Image src={icons.chevronRight} width={16} height={16} alt="" />
              </Link>
            ))}
          </div>
        }
      />

      <Section
        className="mb-[24px]"
        title={profileConfig.appConfig.name}
        content={
          <div className="flex flex-col rounded-[12px] bg-white py-[12px] text-gray-08 *:px-[20px]">
            {profileConfig.appConfig.items.map((item) => (
              <Link
                key={item.id}
                href={item.label}
                className="flex items-center justify-between py-[12px]"
              >
                <div className="flex items-center gap-[8px]">
                  <span>{item.label}</span>
                  {item.disabled && <ComingSoon />}
                </div>
                <Image src={icons.chevronRight} width={16} height={16} alt="" />
              </Link>
            ))}
          </div>
        }
      />

      <Section
        className="mb-[18px]"
        content={
          <div className="flex flex-col rounded-[12px] bg-white py-[12px] text-gray-08 *:px-[20px]">
            {profileConfig.appConfig.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between py-[12px]"
              >
                <div className="flex items-start gap-[8px]">
                  <span>{item.label}</span>
                  <Image src={icons.link} width={16} height={16} alt="" />
                </div>
              </Link>
            ))}
          </div>
        }
      />

      <SignOut />
    </main>
  )
}

function EditPencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.33301 11.54L0.861603 11.0686C0.736579 11.1936 0.666341 11.3632 0.666341 11.54H1.33301ZM1.33301 13.77H0.666341C0.666341 14.1382 0.964818 14.4367 1.33301 14.4367L1.33301 13.77ZM3.39634 13.77V14.4367C3.57315 14.4367 3.74272 14.3664 3.86775 14.2414L3.39634 13.77ZM12.6997 4.46667L12.2283 3.99526L12.6997 4.46667ZM12.6997 3.54667L12.2283 4.01807V4.01807L12.6997 3.54667ZM11.313 2.16L11.7844 1.6886L11.7844 1.6886L11.313 2.16ZM10.5397 2.16L10.0683 1.6886L10.5397 2.16ZM9.45634 3.24333L8.98494 2.77193C8.85967 2.8972 8.78941 3.06718 8.78968 3.24434C8.78994 3.4215 8.86072 3.59127 8.98637 3.71616L9.45634 3.24333ZM6.54967 13.1633C6.18148 13.1633 5.88301 13.4618 5.88301 13.83C5.88301 14.1982 6.18148 14.4967 6.54967 14.4967V13.1633ZM14.553 14.4967C14.9212 14.4967 15.2197 14.1982 15.2197 13.83C15.2197 13.4618 14.9212 13.1633 14.553 13.1633V14.4967ZM7.6916 4.2386L0.861603 11.0686L1.80441 12.0114L8.63441 5.1814L7.6916 4.2386ZM0.666341 11.54V13.77H1.99967V11.54H0.666341ZM1.33301 14.4367H3.39634V13.1033H1.33301V14.4367ZM3.86775 14.2414L13.1711 4.93807L12.2283 3.99526L2.92494 13.2986L3.86775 14.2414ZM13.1711 4.93807C13.6848 4.42439 13.6848 3.58895 13.1711 3.07526L12.2283 4.01807C12.227 4.01678 12.2252 4.01433 12.2241 4.01153C12.2232 4.00919 12.223 4.00758 12.223 4.00667C12.223 4.00576 12.2232 4.00415 12.2241 4.00181C12.2252 3.999 12.227 3.99655 12.2283 3.99526L13.1711 4.93807ZM13.1711 3.07526L11.7844 1.6886L10.8416 2.6314L12.2283 4.01807L13.1711 3.07526ZM11.7844 1.6886C11.3107 1.21491 10.542 1.21491 10.0683 1.6886L11.0111 2.6314C10.9641 2.67842 10.8886 2.67842 10.8416 2.6314L11.7844 1.6886ZM10.0683 1.6886L8.98494 2.77193L9.92775 3.71474L11.0111 2.6314L10.0683 1.6886ZM8.98637 3.71616L11.1964 5.91283L12.1363 4.96717L9.92632 2.7705L8.98637 3.71616ZM6.54967 14.4967H14.553V13.1633H6.54967V14.4967Z"
        fill="#FF9100"
      />
    </svg>
  )
}
