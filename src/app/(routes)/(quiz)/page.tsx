import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const userData = {
  id: 1,
  nickname: '픽토스',
  stars: 20,
}

const todayQuizData = {
  continuousSolvedDates: 5,
  totalSolvedQuizCount: 100,
  stat: 'ready',
  quiz: [
    {
      id: 1,
      category: '전공 공부',
      count: 4,
    },
    {
      id: 2,
      category: '코딩 아카데미',
      count: 3,
    },
    {
      id: 3,
      category: '컴활 필기 준비',
      count: 3,
    },
  ],
}

const boxStyle = 'rounded-2xl bg-white p-5'

export default function Quiz() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl text-gray-07">파워업 퀴즈</h2>
      <div className="flex gap-4">
        <div className={cn(boxStyle, 'flex place-content-center flex-[12]')}>
          <div className="size-20 rounded-full bg-[#FFF0C8]" />
          <div className="flex flex-col justify-center px-8">
            <p className="text-2xl font-bold text-gray-07">
              <span className="text-orange-50">{todayQuizData.continuousSolvedDates}</span>일째
              파워업 중!
            </p>
            <p className="text-gray-50">2024년 4월 25일 목요일</p>
          </div>
        </div>
        <div className={cn(boxStyle, 'flex flex-col flex-[8] gap-3 justify-center')}>
          <h6 className="text-gray-07">오늘의 퀴즈 점수</h6>
          <p className="font-normal text-gray-50">아직 오늘 퀴즈를 풀지 않았어요.</p>
        </div>
        <div className={cn(boxStyle, 'flex items-center gap-4 flex-[6]')}>
          <div className="size-14 rounded-full bg-[#FFF0C8]" />
          <div>
            <p className="text-gray-07">별</p>
            <p className="text-orange-50">{userData.stars}개</p>
          </div>
        </div>
      </div>
      <p className="text-gray-50">오늘의 퀴즈</p>
      <div className={cn(boxStyle, 'w-full h-[520px] flex flex-col justify-center items-center')}>
        <h5 className="mb-4 text-xl font-bold text-orange-50">INFORMATION</h5>
        <h3 className="mb-8 text-2xl">{userData.nickname}님을 위한 퀴즈가 준비되었어요</h3>
        <div className="mb-14 flex items-center gap-10">
          <DocumentIcon />
          <div className="flex flex-col gap-1.5">
            {todayQuizData.quiz.map((quiz) => (
              <div
                key={quiz.id}
                className="flex w-[178px] items-center justify-between rounded-full bg-[#E4E4E4] px-8 py-2"
              >
                <span className="text-sm font-normal text-[#3F3F3F]">{quiz.category}</span>
                <span className="text-sm font-bold">{quiz.count}</span>
              </div>
            ))}
          </div>
        </div>
        <Button className="h-[64px] w-[352px] rounded-full bg-orange-50 text-xl font-bold hover:bg-orange-50/80">
          시작하기
        </Button>
      </div>
    </div>
  )
}

function DocumentIcon() {
  return (
    <svg
      width="110"
      height="130"
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="82" height="97" rx="13" fill="#FF9040" />
      <rect x="28" y="33" width="82" height="97" rx="13" fill="#FFF0C8" />
    </svg>
  )
}
