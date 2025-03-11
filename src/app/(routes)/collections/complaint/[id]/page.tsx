'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCollectionInfo, useComplaintCollection } from '@/requests/collection/hooks'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import Loading from '@/shared/components/custom/loading'
import { Textarea } from '@/shared/components/ui/textarea'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Image from 'next/image'

const complaintSchema = z.object({
  content: z
    .string()
    .min(1, '신고 내용을 입력해주세요.')
    .max(500, '최대 500자까지 입력 가능합니다.'),
  images: z.array(z.any()).max(3, '최대 3장까지 이미지를 업로드할 수 있습니다.').optional(),
})

type ComplaintFormData = z.infer<typeof complaintSchema>

export default function ComplaintCollectionPage() {
  const id = useParams().id
  const { mutate: complaintCollection } = useComplaintCollection()
  const { data: collection } = useCollectionInfo(Number(id))
  const router = useRouter()

  // 이미지 미리보기 URL을 관리하는 state
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      content: '',
      images: [],
    },
  })

  const contentValue = watch('content') || ''
  const imagesValue = (watch('images') || []) as File[]
  const imagesCount = imagesValue.length

  // 이미지 업로드 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    // 기존 파일 + 새로 선택된 파일 합치기
    const existingFiles = imagesValue
    const newFiles = Array.from(files)

    // 3장까지만
    const combinedFiles = [...existingFiles, ...newFiles].slice(0, 3)
    setValue('images', combinedFiles)

    // 미리보기 URL 갱신
    const previewUrls = combinedFiles.map((file) => URL.createObjectURL(file))
    setPreviewImages(previewUrls)

    // 동일 파일 연속 업로드를 위해 input 리셋
    event.target.value = ''
  }

  // 미리보기 이미지 제거
  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...imagesValue]
    updatedFiles.splice(index, 1)
    setValue('images', updatedFiles)

    const updatedPreview = [...previewImages]
    updatedPreview.splice(index, 1)
    setPreviewImages(updatedPreview)
  }

  // 신고하기 제출
  const onSubmit = (data: ComplaintFormData) => {
    if (!id) return
    complaintCollection(
      {
        collectionId: Number(id),
        content: data.content,
        images: data.images,
      },
      {
        onSuccess: () => {
          router.back()
        },
      }
    )
  }

  if (!collection) {
    return <Loading center />
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="fixed top-0 z-50 flex h-[54px] w-full max-w-mobile items-center border-b border-gray-100 bg-white px-4">
        <GoBackButton />
        <div className="absolute left-1/2 -translate-x-1/2">
          <Text as="h1" typography="subtitle2-medium">
            신고하기
          </Text>
        </div>
      </header>

      <main className="mt-[54px] px-4 pt-3">
        <Text typography="subtitle1-bold" color="primary">
          관련 자료와 함께 신고 내용을 알려주세요
        </Text>

        <div className="mt-[23px]">
          <Text typography="text1-medium" color="sub">
            신고할 컬렉션
          </Text>
          <Text typography="subtitle2-bold">{collection.name}</Text>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Textarea
                {...register('content')}
                rows={5}
                maxLength={500}
                placeholder="신고할 상세 내용을 자세히 작성해주세요"
                className="h-[256px] w-full resize-none rounded-[8px] border-none bg-background-base-02 px-[12px] py-[14px] focus-visible:ring-0"
              />
              <div className="mt-2">
                <Text typography="text2-medium" color="caption">
                  500자 이내로 입력해주세요 ({contentValue.length}/500)
                </Text>
              </div>
              {errors.content && (
                <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
              )}
            </div>

            <div>
              <div className="mt-[14px] grid grid-cols-4 gap-2">
                <label
                  htmlFor="fileInput"
                  className="flex-center flex aspect-square cursor-pointer flex-col gap-[9px] rounded-[12px] border border-background-base-02"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6C1 5.44772 1.44772 5 2 5H5C5.55228 5 6 4.55228 6 4V3.5C6 2.94772 6.44772 2.5 7 2.5H13C13.5523 2.5 14 2.94772 14 3.5V4C14 4.55228 14.4477 5 15 5H18C18.5523 5 19 5.44772 19 6V16C19 16.5523 18.5523 17 18 17H2C1.44772 17 1 16.5523 1 16V6Z"
                      stroke="#1D1E1F"
                      strokeWidth="1.5"
                    />
                    <circle cx="10" cy="10.5" r="3.5" stroke="#1D1E1F" strokeWidth="1.5" />
                  </svg>
                  <Text typography="text2-medium">사진 ({imagesCount}/3)</Text>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={imagesCount >= 3}
                    className="hidden"
                  />
                </label>
                {/* 미리보기 리스트 */}
                {previewImages.map((src, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={src}
                      alt={`미리보기 ${idx + 1}`}
                      className="absolute size-full overflow-hidden rounded-[12px] object-cover"
                      fill
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/70 text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {errors.images && (
                <p className="mt-1 text-xs text-red-500">{errors.images.message as string}</p>
              )}
            </div>

            {/* 제출하기 버튼 */}
            <FixedBottom>
              <Button disabled={!contentValue.trim().length} className="w-full">
                제출하기
              </Button>
            </FixedBottom>
          </form>
        </div>
      </main>
    </div>
  )
}
