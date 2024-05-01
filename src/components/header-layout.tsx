import Image from 'next/image'

const mockData = {
  name: '픽토스',
  stars: 20,
}

export default function HeaderLayout() {
  return (
    <div className="flex items-center gap-11 py-[10px]">
      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="flex max-w-[360px] flex-1 items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
          <Image src="/icons/search.svg" alt="search" width={16} height={16} />
          <input
            className="w-full bg-transparent focus:outline-none"
            placeholder="문서명, 퀴즈 및 문서 내용 검색"
          />
        </div>
        <button className="rounded-full p-2 hover:bg-[#ebebeb]  ">
          <Image src="/icons/bell.svg" alt="bell" width={24} height={24} />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-[#EFF1F3] px-3 py-0.5">
          <Image src={'/icons/star.svg'} alt="" width={16} height={16} />
          <span className="font-bold text-gray-07">{mockData.stars}</span>
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-[13px]">
        <div className="size-8 rounded-full bg-orange-04" />
        <span className="text-sm text-[#818181]">{mockData.name}님</span>
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={16} height={16} />
      </div>
    </div>
  )
}
