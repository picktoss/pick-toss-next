'use client'

import { useBookmarkMutation } from '@/requests/collection/hooks'
import CategoryTag from '@/shared/components/custom/category-tag'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerTrigger } from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'

interface StartQuizDrawerProps {
  collectionId: number
  trigger: React.ReactNode
  emoji: string
  title: string
  category: string
  multipleChoiceCount: number
  oxCount: number
  description: string
  isBookMarked?: boolean
  isOwner?: boolean
  bookMarkCount: number
}

const StartQuizDrawer = ({
  collectionId,
  trigger,
  emoji,
  title,
  category,
  multipleChoiceCount,
  oxCount,
  description,
  isBookMarked = false,
  isOwner = false,
  bookMarkCount,
}: StartQuizDrawerProps) => {
  const { mutate: bookmarkMutate } = useBookmarkMutation()

  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="mx-auto h-[99dvh] max-w-mobile">
        <div>
          <div className="flex items-center gap-[16px] px-[20px] pb-[30px] pt-[43px]">
            <div className="flex-center size-[64px] rounded-full bg-background-base-02 text-hero">
              {emoji}
            </div>
            <div>
              <h2 className="text-title2">{title}</h2>
              <div className="mt-[10px]">
                <CategoryTag title={category} />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-border-divider" />

          <div className="relative p-[20px]">
            <div className="absolute right-[20px] flex flex-col items-center gap-[4px]">
              {isOwner && <Icon name="book-mark-fill" className="size-[24px] text-icon-disabled" />}
              {!isOwner &&
                (isBookMarked ? (
                  <Icon
                    name="book-mark-fill"
                    className="size-[24px] cursor-pointer"
                    onClick={() => bookmarkMutate({ collectionId, isBookMarked: true })}
                  />
                ) : (
                  <Icon
                    name="book-mark"
                    className="size-[24px] cursor-pointer"
                    onClick={() => bookmarkMutate({ collectionId, isBookMarked: false })}
                  />
                ))}
              <Text typography="text2-medium" className="text-text-caption">
                {bookMarkCount}
              </Text>
            </div>

            <div>
              <Text typography="subtitle1-bold" className="text-text-primary">
                {multipleChoiceCount + oxCount} 문제
              </Text>
              <div className="mt-[8px] flex items-center gap-[8px]">
                <Text typography="text1-medium" className="text-text-sub">
                  객관식 {multipleChoiceCount}
                </Text>
                <div className="size-[3px] rounded-full bg-background-container-01" />
                <Text typography="text1-medium" className="text-text-sub">
                  O/X {oxCount}
                </Text>
              </div>
              <Text typography="text1-medium" className="mt-[24px] text-text-secondary">
                {description}
              </Text>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <div className="flex gap-[8px]">
            <Link href={`/collections/${collectionId}`} className="w-[35%]">
              <Button colors="secondary" className="w-full">
                문제 보기
              </Button>
            </Link>
            <Button className="flex-1">퀴즈 시작하기</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default StartQuizDrawer
