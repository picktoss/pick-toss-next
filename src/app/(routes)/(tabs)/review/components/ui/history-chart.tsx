export function HistoryChart() {
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

      <div className="h-[260px] bg-blue-01"></div>
    </div>
  )
}
