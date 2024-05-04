import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CategoryTag from './components/category-tag'
import { studyCategoryData, userData } from './mock-data'
import Image from 'next/image'
import Link from 'next/link'

export default function Repository() {
  return (
    <div>
      <h2 className="mb-[49px] flex items-center gap-1 text-3xl text-gray-07">
        <Image src="/icons/book.svg" alt="" width={32} height={32} />
        <span className="font-bold">{userData.nickname}</span> 님의 공부 창고
      </h2>
      <h5 className="mb-4 text-gray-07">
        공부 폴더 <span className="font-bold text-orange-06">{studyCategoryData.length}</span>개
      </h5>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {studyCategoryData.map((studyCategory) => (
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
                      <Image src="/icons/kebab.svg" alt="" width={3} height={15} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <div className="flex gap-4">
                        <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                        <span>이름 바꾸기</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex gap-4">
                        <Image src="/icons/no-chat.svg" alt="" width={16} height={16} />
                        <span>퀴즈 생성 끄기</span>
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
                <div className="text-xl font-bold">{studyCategory.name}</div>
                <CategoryTag tag={studyCategory.tag} />
              </div>
              <div className="text-sm font-normal text-gray-07">
                문서 {studyCategory.documents.length}개
              </div>
            </Link>
          </div>
        ))}
        <button className="flex min-h-[130px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm font-bold text-gray-07">
          <div className="rounded-full bg-gray-02 p-2">
            <Image src="/icons/plus.svg" alt="" width={18} height={18} />
          </div>
          폴더 추가하기
        </button>
      </div>
    </div>
  )
}
