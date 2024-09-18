import Link from 'next/link'
import { profileConfig } from '../config'
import ComingSoon from '@/shared/components/coming-soon'
import Image from 'next/image'
import icons from '@/constants/icons'
import SuggestTip from './suggest-tip'

// UserSettingSectionContent 컴포넌트
const UserSettingSectionContent = () => {
  return (
    <div className="relative flex flex-col rounded-[12px] bg-white py-[12px] text-gray-08 *:px-[20px]">
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
          <Image src={icons.chevronRight} width={6} height={10} alt="" />
        </Link>
      ))}
      <SuggestTip />
    </div>
  )
}

export default UserSettingSectionContent
