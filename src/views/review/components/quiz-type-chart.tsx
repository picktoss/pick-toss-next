interface Props {
  multipleRate: number
  oxRate: number
}

export function QuizTypeChart({ multipleRate, oxRate }: Props) {
  return (
    <div className="flex flex-col gap-[26px] rounded-[12px] border p-[16px] lg:py-[20px]">
      <div className="text-body2-bold text-gray-07">퀴즈 유형</div>

      <div className="flex h-[28px] gap-[2.2px] overflow-hidden rounded-[12px]">
        <div
          className="bg-orange-05"
          style={{
            width: `${multipleRate}%`,
          }}
        />
        <div
          className="bg-blue-05"
          style={{
            width: `${oxRate}%`,
          }}
        />
      </div>

      <div className="flex justify-center gap-[24px] pb-[16px] lg:pb-0">
        <div className="flex items-center gap-[8px]">
          <div className="size-[16px] rounded-[4px] bg-orange-05" />
          <div className="text-small1-bold text-gray-08">객관식</div>
          <div className="text-small1-bold text-gray-06">{multipleRate}%</div>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="size-[16px] rounded-[4px] bg-blue-05" />
          <div className="text-small1-bold text-gray-08">O/X</div>
          <div className="text-small1-bold text-gray-06">{oxRate}%</div>
        </div>
      </div>
    </div>
  )
}
