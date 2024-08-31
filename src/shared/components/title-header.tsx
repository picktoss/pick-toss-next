'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
}

export default function TitleHeader({ title }: Props) {
  const router = useRouter()
  return (
    <div className="flex h-[48px] items-center justify-between px-[8px]">
      <button onClick={() => router.back()}>
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <div className="text-body1-bold text-gray-09">{title}</div>
      <div className="w-[32px]" />
    </div>
  )
}
