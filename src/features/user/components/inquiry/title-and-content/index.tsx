'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useInquiry } from '../../../contexts/inquiry-context'
import { useState } from 'react'
import Image from 'next/image'
import { Controller } from 'react-hook-form'

const InquiryTitleAndContent = () => {
  const {
    form: { control },
    content,
    files,
    setTitle,
    setContent,
    setFiles,
  } = useInquiry()

  const [previews, setPreviews] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length === 3) {
      alert('이미지 파일은 3개까지 첨부 가능합니다')
      return
    }

    const selectedFiles = e.target.files
    if (!selectedFiles) return

    // 최대 3개 파일 제한
    const newFiles = Array.from(selectedFiles).slice(0, 3 - files.length)

    const newFilesArray = Array.from(newFiles)
    setFiles([...files, ...newFilesArray])

    // 미리보기 생성
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  const removeFile = (indexToRemove: number) => {
    // 파일 배열에서 제거
    const updatedFiles = files.filter((_, index) => index !== indexToRemove)
    setFiles(updatedFiles)

    // 미리보기 배열에서 제거
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove)
    setPreviews(updatedPreviews)
  }

  return (
    <div className="px-[16px] py-[20px]">
      <Text typography="title3" className="mb-[16px]">
        문의 제목와 내용을 적어주세요
      </Text>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            onChange={(e) => {
              field.onChange(e)
              setTitle(e.target.value)
            }}
            placeholder="문의 제목을 적어주세요"
            className="input-basic mb-[12px] flex h-[48px] w-full"
          />
        )}
      />

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            onChange={(e) => {
              field.onChange(e)
              setContent(e.target.value)
            }}
            placeholder="문의하실 내용을 자세히 알려주세요"
            className="input-basic mb-[8px] h-[222px] w-full resize-none"
            maxLength={300}
          />
        )}
      />
      <Text typography="text2-medium" className="mb-[14px] text-text-caption">
        {`300자 이내로 입력해주세요 (${content.length}/300)`}
      </Text>

      <div className="mb-[4px] flex w-full gap-[8px]">
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          multiple
          disabled={files.length >= 3}
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="flex-center size-[80px] cursor-pointer flex-col gap-[9px] rounded-[12px] border border-border-default"
        >
          <Icon name="camera" className="size-[20px]" />
          <Text typography="text2-medium" className="text-text-secondary">
            {`사진 (${files.length}/3)`}
          </Text>
        </label>

        <div className="flex h-fit max-w-[calc(100%-88px)] gap-[8px] overflow-x-auto">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative size-[80px] shrink-0 overflow-hidden rounded-[12px] border border-border-default"
            >
              <button
                onClick={() => removeFile(index)}
                className="absolute right-[6px] top-[7px] z-10"
              >
                <Icon name="cancel-circle" className="size-[20px]" />
              </button>
              <Image src={preview} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InquiryTitleAndContent
