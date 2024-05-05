import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import icons from '@/constants/icons'

const mockData = {
  name: '픽토스',
  email: 'wjk6044@gmail.com',
  stars: 20,
}

export default function HeaderLayout() {
  return (
    <div className="sticky right-0 top-0 flex h-[60px] w-full items-center gap-11 bg-gray-01">
      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="flex max-w-[360px] flex-1 items-center gap-4 rounded-full bg-gray-02 px-8 py-3">
          <Image src={icons.search} alt="search" width={16} height={16} />
          <input
            className="w-full bg-transparent focus:outline-none"
            placeholder="문서명, 퀴즈 및 문서 내용 검색"
          />
        </div>
        <button className="rounded-full p-2 hover:bg-gray-02  ">
          <Image src={icons.bell} alt="bell" width={24} height={24} />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-[#EFF1F3] px-3 py-0.5">
          <Image src={'/icons/star.svg'} alt="" width={16} height={16} />
          <span className="font-bold text-gray-07">{mockData.stars}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <span className="flex items-center gap-[13px] rounded-xl p-1 hover:bg-gray-02">
            <div className="size-8 rounded-full bg-orange-04" />
            <span className="text-sm text-[#818181]">{mockData.name}님</span>
            <Image src={icons.chevronDown} alt="arrow-down" width={16} height={16} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex gap-4 rounded-lg bg-blue-01 p-3">
              <div className="size-10 rounded-full bg-orange-04" />
              <div>
                <div className="mb-1 text-body2-regular text-gray-08">
                  <span className="font-bold">{mockData.name}</span>님
                </div>
                <div className="text-body2-regular-eng text-gray-07">{mockData.email}</div>
              </div>
            </div>
          </DropdownMenuLabel>
          <div className="px-2 py-1 text-body1-bold text-gray-07">
            <DropdownMenuItem>
              <span className="text-base">설정</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex w-full justify-between text-base">
                <div>문의하기</div>
                <Image src={icons.link} alt="move" width={16} height={16} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex w-full justify-between text-base">
                <div>정책 및 이용약관</div>
                <Image src={icons.link} alt="move" width={16} height={16} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="text-base text-notice-red">로그아웃</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
