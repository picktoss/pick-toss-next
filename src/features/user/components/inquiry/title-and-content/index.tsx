'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useInquiry } from '../../../contexts/inquiry-context'
// import Image from 'next/image'
// import sample from '@/../../public/images/og-800x400.png'

const InquiryTitleAndContent = () => {
  const { title, setTitle, content, setContent } = useInquiry()

  return (
    <div className="px-[16px] py-[20px]">
      <Text typography="title3" className="mb-[16px]">
        문의 제목와 내용을 적어주세요
      </Text>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="문의 제목을 적어주세요"
        className="input-basic mb-[12px] flex h-[48px] w-full"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="문의하실 내용을 자세히 알려주세요"
        className="input-basic mb-[8px] h-[222px] w-full resize-none"
      />
      <Text typography="text2-medium" className="mb-[14px] text-text-caption">
        {'300자 이내로 입력해주세요 (0/300)'}
      </Text>

      <div className="mb-[4px] flex w-full gap-[8px]">
        <input type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="flex-center size-[80px] cursor-pointer flex-col gap-[9px] rounded-[12px] border border-border-default"
        >
          <Icon name="camera" className="size-[20px]" />
          <Text typography="text2-medium" className="text-text-secondary">
            {'사진 (1/3)'}
          </Text>
        </label>

        <div className="flex h-fit max-w-[calc(100%-88px)] gap-[8px] overflow-x-auto">
          {/* 첨부된 이미지가 있을 경우 이미지 개수만큼 썸네일 표시 */}
          {/* 
            <div className="relative size-[80px] shrink-0 overflow-hidden rounded-[12px] border border-border-default">
              <button className="absolute right-[6px] top-[7px]">
                <Icon name="cancel-circle" className="size-[20px]" />
              </button>
              <Image src={sample} alt="" className="size-full object-cover" />
            </div>
           */}
        </div>
      </div>
    </div>
  )
}

export default InquiryTitleAndContent
