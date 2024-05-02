import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CategoryTag from './components/category-tag'
import { studyCategoryData, userData } from './mock-data'

export default function Repository() {
  return (
    <div>
      <h2 className="mb-8 text-3xl text-gray-07">
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
            <button className="mb-3 rounded-lg px-1 text-2xl hover:bg-gray-10">
              {studyCategory.emoji}
            </button>
            <div className="absolute right-2 top-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="rounded-sm px-2 py-1 hover:bg-gray-10">
                    <DotsIcon />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>이름 바꾸기</DropdownMenuItem>
                  <DropdownMenuItem>퀴즈 생성 끄기</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-50">폴더 삭제하기</DropdownMenuItem>
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
          </div>
        ))}
        <button className="flex min-h-[130px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm font-bold text-gray-07">
          <div className="rounded-full bg-gray-10 p-2">
            <PlusIcon />
          </div>
          폴더 추가하기
        </button>
      </div>
    </div>
  )
}

function DotsIcon() {
  return (
    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#4B4F54" />
      <circle cx="1.5" cy="7.5" r="1.5" fill="#4B4F54" />
      <circle cx="1.5" cy="13.5" r="1.5" fill="#4B4F54" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1V17"
        stroke="#4B4F54"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M17 9L1 9"
        stroke="#4B4F54"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}
