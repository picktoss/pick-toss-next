const mockData = {
  name: '픽토스',
  stars: 20,
}

export default function HeaderLayout() {
  return (
    <div className="flex items-center justify-end gap-6 py-7">
      <span className="flex items-center gap-2 rounded-full bg-[#EFF1F3] px-3 py-1">
        <span className="size-4 rounded-full bg-[#FF9040]" />
        {mockData.stars}
      </span>
      <button className="rounded-full p-2 hover:bg-[#ebebeb] ">
        <BellIcon />
      </button>
      <div className="flex cursor-pointer items-center gap-3">
        <div className="size-12 rounded-full bg-[#B0B0B0]" />
        <span className="text-[#818181]">{mockData.name}님</span>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

// TODO: Icon 컴포넌트 구현시 분리
function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_44_99)">
        <path
          d="M19.695 14.8L18.76 6.835C18.435 4.08 16.1 2 13.325 2H11.025C8.25001 2 5.91001 4.08 5.59001 6.835L4.65501 14.8L3.66001 16.205C3.24501 16.79 3.66001 17.6 4.38501 17.6H20.015C20.74 17.6 21.16 16.77 20.725 16.185L19.695 14.8Z"
          stroke="#4B4F54"
          stroke-width="2"
          stroke-miterlimit="10"
        />
        <path
          d="M14.9002 20.1601C14.3152 21.0301 13.3252 21.6001 12.2002 21.6001C10.4052 21.6001 8.9502 20.1451 8.9502 18.3501"
          stroke="#4B4F54"
          stroke-width="2"
          stroke-miterlimit="10"
        />
        <circle cx="18" cy="6" r="4.5" fill="#FB7E20" stroke="white" />
      </g>
      <defs>
        <clipPath id="clip0_44_99">
          <rect width="19.405" height="21.6" fill="white" transform="translate(2.5 1)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L6.5 6.5L12.5 1"
        stroke="#BFBFBF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
