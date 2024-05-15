import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CategoryTag from './components/category-tag'
import { categories, userData } from './mock-data'
import Image from 'next/image'
import Link from 'next/link'
import icons from '@/constants/icons'
import { CategoryAccordion } from '@/components/category-accordion'

export default function Repository() {
  return (
    <div className="flex min-h-[calc(100vh-84px)] flex-col justify-between gap-[48px]">
      <div>
        <h2 className="mb-[49px] flex items-center gap-2 text-h2-medium text-gray-08">
          <Image src="/icons/book.svg" alt="" width={32} height={32} />
          <div>
            <span className="font-bold">{userData.nickname}</span> 님의 공부 창고
          </div>
        </h2>
        <p className="mb-2 text-body1-medium text-gray-08">
          공부 폴더 <span className="font-bold text-orange-06">{categories.length}</span>개
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {categories.map((studyCategory) => (
            <div
              key={studyCategory.id}
              className="relative cursor-pointer rounded-xl border bg-white p-4"
            >
              <Link href={`/repository/${studyCategory.id}`}>
                <div className="mb-3 text-2xl">{studyCategory.emoji}</div>
                <div className="absolute right-[6px] top-[10px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                        <Image src={icons.kebab} alt="" width={15} height={3} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <div className="flex gap-4">
                          <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                          <span className="text-gray-09">이름 바꾸기</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex gap-4">
                          <Image src="/icons/no-chat.svg" alt="" width={16} height={16} />
                          <span className="text-gray-09">퀴즈 생성 끄기</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <div className="flex gap-4">
                          <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
                          <span className="text-notice-red">폴더 삭제하기</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <div className="text-h4-bold text-gray-09">{studyCategory.name}</div>
                  <CategoryTag tag={studyCategory.tag} />
                </div>
                <div className="text-small1-regular text-gray-08">
                  문서 {studyCategory.documents.length}개
                </div>
              </Link>
            </div>
          ))}
          <button className="flex min-h-[120px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-body2-bold text-gray-08">
            폴더 추가하기
            <div className="rounded-full bg-gray-02 p-2">
              <Image src="/icons/plus.svg" alt="" width={18} height={18} />
            </div>
          </button>
        </div>
      </div>

      <div className="min-h-40 w-full rounded-t-[20px] bg-white p-[20px] pb-[70px] lg:hidden">
        <h3 className="mb-[32px] text-h4-bold text-gray-09">노트</h3>
        <CategoryAccordion categories={categories} />
      </div>
    </div>
  )
}
