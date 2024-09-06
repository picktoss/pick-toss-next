import {
  CartesianGrid,
  Line,
  ComposedChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  periodType: 'week' | 'month'
  quizzes: { date: string; totalQuizCount: number; incorrectAnswerCount: number }[]
}

export function HistoryChart({ periodType, quizzes }: Props) {
  const processedData = quizzes.map((item) => ({
    date: item.date
      .split('-')
      .slice(1)
      .map((value) => Number(value))
      .join('/'),
    totalQuizCount: item.totalQuizCount,
    correctAnswerCount: item.totalQuizCount - item.incorrectAnswerCount,
    correctRate: ((item.totalQuizCount - item.incorrectAnswerCount) / item.totalQuizCount) * 100,
  }))

  const xTicks =
    periodType === 'month'
      ? processedData.map((item) => item.date).filter((date, index) => index % 5 === 0)
      : undefined

  return (
    <div className="flex flex-col gap-[16px] rounded-[12px] border p-[16px] pb-[11px]">
      <div className="flex justify-between">
        <div className="text-body2-bold text-gray-07">정답률 추이</div>

        <div className="flex gap-[14px]">
          <div className="flex items-center gap-[8px]">
            <div className="size-[16px] rounded-[4px] bg-blue-02" />
            <div className="text-small1-bold text-gray-07">퀴즈 수</div>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="size-[9px] rounded-full bg-orange-02 ring ring-orange-05" />
            <div className="text-small1-bold text-gray-07">정답 수</div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={processedData} margin={{ top: 20, right: 0, left: -30, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            ticks={xTicks}
            tick={{
              fontFamily: 'DM Sans',
              fontSize: 12,
              fontWeight: '600',
              fill: '#4B4F54',
              transform: 'translate(0, 5)',
            }}
          />
          <YAxis
            tickCount={5}
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{
              fontFamily: 'SUIT',
              fontSize: 12,
              fontWeight: '600',
              fill: '#A2A6AB',
              transform: 'translate(-10, 0)',
            }}
          />
          <Bar
            dataKey="totalQuizCount"
            fill="#D7E2FF"
            name="퀴즈 수"
            radius={[20, 20, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="correctAnswerCount"
            stroke="#FFE1AC"
            strokeWidth={2}
            name="정답 수"
            dot={CustomDot}
            isAnimationActive={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function CustomDot({ cx, cy }: { cx: number; cy: number }) {
  return (
    <svg
      x={cx - 6}
      y={cy - 6}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="6" fill="#FF9100" />
      <circle cx="6.00039" cy="6.00039" r="3.6" fill="#FFE1AC" />
    </svg>
  )
}
