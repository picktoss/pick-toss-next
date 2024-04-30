import { cn } from '@/lib/utils'

interface StudyCategory {
  id: number
  tag: {
    id: 1 | 2 | 3
    name: 'IT, 개발' | '경영, 경제' | '역사, 철학'
  }
  emoji: string
  categoryName: string
  documentCount: number
}

const userData = {
  id: 1,
  nickname: '픽토스',
  stars: 20,
}

const studyCategoryData: StudyCategory[] = [
  {
    id: 1,
    tag: {
      id: 1,
      name: 'IT, 개발',
    },
    emoji: '✈️',
    categoryName: '코딩 아카데미',
    documentCount: 14,
  },
  {
    id: 2,
    tag: {
      id: 2,
      name: '경영, 경제',
    },
    emoji: '📌',
    categoryName: '전공 공부',
    documentCount: 14,
  },
  {
    id: 3,
    tag: {
      id: 1,
      name: 'IT, 개발',
    },
    emoji: '💻',
    categoryName: '알고리즘 공부',
    documentCount: 8,
  },
  {
    id: 4,
    tag: {
      id: 3,
      name: '역사, 철학',
    },
    emoji: '💩',
    categoryName: '철학입문',
    documentCount: 3,
  },
]

// TODO: 임시 태그 id
const tagBadgeStyle = {
  // IT 개발
  1: 'bg-[#E2F0F9] text-[#3C7BD9]',
  // 경영 경제
  2: 'bg-[#FFF7CA] text-[#D97E3C]',
  // 역사 철학
  3: 'bg-[#EAEAEA] text-[#525252]',
} as const

export default function Repository() {
  return (
    <div>
      <h2 className="mb-8 text-3xl text-gray-60">
        <span className="font-bold">{userData.nickname}</span> 님의 공부 창고
      </h2>
      <div className="mb-8 flex items-center gap-4 rounded-full bg-gray-10 px-8 py-4">
        <SearchIcon />
        <input
          className="w-full bg-transparent focus:outline-none"
          placeholder="파일명, 내용 검색"
        />
      </div>
      <h5 className="mb-4 text-gray-60">
        공부 폴더 <span className="font-bold">{studyCategoryData.length}개</span>
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
            <button className="absolute right-2 top-3 rounded-sm px-2 py-1 hover:bg-gray-10">
              <DotsIcon />
            </button>
            <div className="mb-1 flex items-center gap-2">
              <div className="text-xl font-bold">{studyCategory.categoryName}</div>
              <span
                className={cn(
                  tagBadgeStyle[studyCategory.tag.id],
                  'px-2 py-1 text-[10px] rounded-md',
                )}
              >
                {studyCategory.tag.name}
              </span>
            </div>
            <div className="text-sm font-normal text-gray-60">
              문서 {studyCategory.documentCount}개
            </div>
          </div>
        ))}
        <button className="flex min-h-[130px] items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm font-bold text-gray-60">
          <div className="rounded-full bg-gray-10 p-2">
            <PlusIcon />
          </div>
          폴더 추가하기
        </button>
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 6.97136C0 10.5395 2.88709 13.4427 6.43548 13.4427C7.83869 13.4427 9.12096 12.9886 10.1774 12.2263L14.1452 16.2243C14.3306 16.4108 14.5726 16.5 14.8307 16.5C15.3791 16.5 15.758 16.0864 15.758 15.5431C15.758 15.2836 15.6613 15.0484 15.4919 14.8781L11.5484 10.8882C12.379 9.80156 12.871 8.4473 12.871 6.97136C12.871 3.40319 9.98386 0.5 6.43548 0.5C2.88709 0.5 0 3.40319 0 6.97136ZM1.37903 6.97136C1.37903 4.16549 3.64516 1.88672 6.43548 1.88672C9.22577 1.88672 11.4919 4.16549 11.4919 6.97136C11.4919 9.77721 9.22577 12.056 6.43548 12.056C3.64516 12.056 1.37903 9.77721 1.37903 6.97136Z"
        fill="#A2A6AB"
      />
    </svg>
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
