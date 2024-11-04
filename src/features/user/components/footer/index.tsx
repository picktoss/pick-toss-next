'use client'

import Text from '@/shared/components/ui/text'

const Footer = () => {
  return (
    <div className="flex items-center gap-[32px] text-text2-medium text-text-caption">
      <Text>현재 버전: 13.3.0</Text>
      <button onClick={() => alert('clicked logout')}>로그아웃</button>
    </div>
  )
}

export default Footer
