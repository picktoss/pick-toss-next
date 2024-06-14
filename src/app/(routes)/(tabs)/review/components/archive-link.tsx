import ProTag from '@/components/pro-tag'
import icons from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  redirectUrl: string
  title: string
  icon: React.ReactNode
  count: number
  isPro?: boolean
}

export function ArchiveLink({ redirectUrl, title, icon, count, isPro }: Props) {
  return (
    <Link
      href={redirectUrl}
      className="flex justify-between rounded-[12px] bg-white p-[20px] lg:w-full"
    >
      <div className="flex items-center gap-[16px] lg:gap-[10px]">
        {icon}
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center gap-[8px]">
            <div className="text-h4-bold text-gray-09">{title}</div>
            {isPro && <ProTag />}
          </div>
          <div className="text-body1-medium text-gray-06">{count}개</div>
        </div>
      </div>
      <Image src={icons.chevronRight} width={6} height={10} alt="" className="lg:hidden" />
    </Link>
  )
}
