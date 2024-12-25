'use client'

import { CATEGORIES } from '@/features/category/config'
import { useCollectionInfo, useUpdateCollectionInfo } from '@/requests/collection/hooks'
import CategoryTag from '@/shared/components/custom/category-tag'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Loading from '@/shared/components/custom/loading'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { Textarea } from '@/shared/components/ui/textarea'
import EmojiPicker from 'emoji-picker-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditCollectionInfoForm = () => {
  const router = useRouter()

  const { id } = useParams()
  const { data } = useCollectionInfo(Number(id))

  const [emoji, setEmoji] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<Collection.Field>(CATEGORIES[0]!.id)

  const { mutate: editCollectionInfoMutate, isPending: isEditCollectionInfoPending } =
    useUpdateCollectionInfo()

  const handleEditCollectionInfo = () => {
    if (isEditCollectionInfoPending) {
      return
    }

    editCollectionInfoMutate(
      {
        collectionId: Number(id),
        payload: {
          name: title,
          emoji,
          description,
          collectionCategory: CATEGORIES.find((category) => category.id === categoryId)!.id,
        },
      },
      {
        onSuccess: () => {
          router.replace(`/collections/${Number(id)}`)
        },
      }
    )
  }

  useEffect(() => {
    if (!data) return

    setEmoji(data.emoji)
    setTitle(data.name)
    setDescription(data.description)
    setCategoryId(CATEGORIES.find((category) => category.name === data.collectionCategory)!.id)
  }, [data])

  if (!data) {
    return <Loading center />
  }

  return (
    <div className="mt-3">
      <div>
        {/* 이모지 선택 및 컬렉션 이름 입력 */}
        <div className="flex items-center gap-[20px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex-center size-[48px] rounded-[12px] bg-background-base-02 text-3xl">
                {emoji}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <EmojiPicker
                skinTonesDisabled
                height={'60vh'}
                onEmojiClick={(emojiData) => {
                  setEmoji(emojiData.emoji)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새로운 컬렉션"
            className="flex-1 bg-transparent text-title2 placeholder:text-text-placeholder-02 focus:outline-none"
            autoFocus
          />
        </div>

        {/* 분야 선택 */}
        <div className="mt-[25px] flex items-center gap-[5px]">
          <Text typography="text1-medium" color="secondary">
            분야<span className="text-text-accent">*</span>
          </Text>
          <Drawer>
            <DrawerTrigger>
              <div className="rounded-full bg-background-base-02 px-[14px] py-[5px]">
                <CategoryTag
                  title={CATEGORIES.find((category) => category.id === categoryId)?.name ?? ''}
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>카테고리를 선택해주세요.</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-2 p-4">
                {CATEGORIES.map((category) => (
                  <DrawerClose key={category.id}>
                    <CategoryTag title={category.name} onClick={() => setCategoryId(category.id)} />
                  </DrawerClose>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* 컬렉션 설명 */}
        <div className="mt-[27px]">
          <Text typography="text1-medium" color="secondary">
            컬렉션 설명<span className="text-text-accent">*</span>
          </Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 min-h-[130px] rounded-[8px] border-none bg-background-base-02"
          />
          <Text typography="text2-medium" color="caption" className="mt-2">
            200자 이내로 입력해주세요 ({description.length}/200)
          </Text>
        </div>
      </div>
      <FixedBottom className="flex gap-[6px]">
        <Button
          variant={'largeRound'}
          className="w-full"
          onClick={() => handleEditCollectionInfo()}
          disabled={isEditCollectionInfoPending}
        >
          만들기
        </Button>
      </FixedBottom>
    </div>
  )
}

export default EditCollectionInfoForm
