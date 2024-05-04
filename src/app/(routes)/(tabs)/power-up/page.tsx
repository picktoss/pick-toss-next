import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import Image from 'next/image'

export default function PowerUp() {
  return (
    <main className="flex flex-col pb-[48px] lg:gap-[28px]">
      <div className="flex items-center gap-[8px]">
        <Image src={icons.powerUpQuiz} width={34.69} height={30} alt="" />
        <h1 className="text-[32px] font-[500] text-gray-08">파워업 퀴즈</h1>
      </div>

      <div className="flex gap-[16px]">
        {/** TODO: 배너 컴포넌트 구현 (대기, 완료, disabled) */}
        <div className="relative size-full h-[240px] flex-1 rounded-[16px] bg-orange-02 px-[40px] pb-[28px] pt-[30px]">
          <div className="flex flex-col">
            <div className="mb-[12px] text-[16px] font-[700] text-orange-06">TODAY&apos;s QUIZ</div>
            <div className="mb-[29px] gap-[8px] text-[32px] font-[700] text-gray-09">
              <span className="text-orange-06">픽토스님</span>을 위한 퀴즈가 준비되었어요
              <div className="text-[16px] font-[500] text-gray-08">4월 25일 목요일</div>
            </div>
            <Button className="h-[52px] w-[240px] rounded-[12px] bg-orange-06 font-[700] text-gray-01 hover:bg-orange-06/90">
              <div>오늘의 퀴즈 시작하기</div>
            </Button>
          </div>
          <div className="absolute right-[18px] top-[19px]">
            <QuizReadyIcon />
          </div>
        </div>

        <div className="flex flex-col gap-[7px]">
          <div className="flex h-full w-[176px] flex-col items-center justify-between rounded-[16px] bg-white p-[15px] pt-[20px]">
            <Image src={icons.calendar} width={53} height={53} alt="" />
            <div className="text-[16px] font-[700] text-gray-08">
              <span className="text-orange-06">25</span>일 연속으로 푸는 중!
            </div>
          </div>
          <div className="flex h-full w-[176px] flex-col items-center justify-between rounded-[16px] bg-white p-[15px] pt-[20px]">
            <Image src={icons.star} width={45} height={43} alt="" />
            <div className="text-[16px] font-[700] text-gray-08">
              현재 별 <span className="text-orange-06">16</span>개
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[456px] flex-col gap-[28px] bg-white p-[32px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <h2 className="text-[20px] font-[700]">퀴즈 만들기</h2>
            {/** TODO: Tool Tip */}
            <Image src={icons.circleQuestion} width={20} height={20} alt="" />
          </div>
          <p className="text-[14px] font-[400] text-gray-06">
            원하는 문서로부터 퀴즈를 만들어보세요
          </p>
        </div>

        <ul className="flex h-[290px] flex-wrap gap-[16px] border-gray-02">
          <li className="flex flex-1 flex-col justify-between rounded-[16px] border px-[24px] pb-[21px] pt-[23px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[20px] font-[700] text-gray-09">객관식</h3>
              <p className="text-[14px] font-[500] text-gray-07">
                4가지 선택지 중 정답을 고르는 퀴즈
              </p>
            </div>
            <div className="flex justify-center">
              <Icon1 />
            </div>
            <Button className="h-[41px] w-full bg-orange-01 text-[14px] font-[700] text-orange-06 hover:bg-orange-01/80">
              만들기
            </Button>
          </li>
          <li className="flex flex-1 flex-col justify-between rounded-[16px] border px-[24px] pb-[21px] pt-[23px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[20px] font-[700] text-gray-09">O/X</h3>
              <p className="text-[14px] font-[500] text-gray-07">
                4가지 선택지 중 정답을 고르는 퀴즈
              </p>
            </div>
            <div className="flex justify-center">
              <Icon2 />
            </div>
            <Button className="h-[41px] w-full bg-orange-01 text-[14px] font-[700] text-orange-06 hover:bg-orange-01/80">
              만들기
            </Button>
          </li>
          <li className="flex flex-1 flex-col justify-between rounded-[16px] border px-[24px] pb-[21px] pt-[23px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[20px] font-[700] text-gray-09">빈칸 채우기</h3>
              <p className="text-[14px] font-[500] text-gray-07">
                4가지 선택지 중 정답을 고르는 퀴즈
              </p>
            </div>
            <div className="flex justify-center">
              <Icon3 />
            </div>
            <Button className="h-[41px] w-full bg-orange-01 text-[14px] font-[700] text-orange-06 hover:bg-orange-01/80">
              만들기
            </Button>
          </li>
        </ul>
      </div>
    </main>
  )
}

/** TODO: Icon 분리 및 모션 적용 */
function Icon1() {
  return (
    <svg
      width="157"
      height="99"
      viewBox="0 0 157 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="25.939" width="97.2717" height="21.3315" rx="4.86359" fill="#D7E2FF" />
      <rect x="25.939" y="25.1289" width="97.2717" height="21.3315" rx="4.86359" fill="#D7E2FF" />
      <rect x="36.4771" y="50.2568" width="97.2717" height="21.3315" rx="4.86359" fill="#95B0F8" />
      <rect x="25.939" y="75.3857" width="97.2717" height="21.3315" rx="4.86359" fill="#D7E2FF" />
      <circle cx="48.5204" cy="60.9349" r="7.17957" fill="#F6FAFD" />
      <path
        d="M45.6484 60.8423L47.8023 62.9962L52.1101 58.6885"
        stroke="#577CFF"
        strokeWidth="1.43591"
        strokeLinecap="round"
      />
      <path
        d="M135.199 82.9414L126.718 69.798C125.551 67.989 127.002 65.6348 129.143 65.8651L144.569 67.5245C146.8 67.7645 147.665 70.5554 145.96 72.0145L142.114 75.3051C141.719 75.6434 141.436 76.0943 141.303 76.5975L139.825 82.206C139.258 84.3574 136.405 84.8109 135.199 82.9414Z"
        fill="#FF9100"
      />
    </svg>
  )
}

function Icon2() {
  return (
    <svg
      width="198"
      height="68"
      viewBox="0 0 198 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="101.583" width="95.6944" height="67.7222" rx="11.7778" fill="#95B0F8" />
      <rect x="14" y="5" width="81" height="57.3231" rx="9.96923" fill="#D7E2FF" />
      <circle cx="55.1239" cy="33.6615" r="14.9538" stroke="#95B0F8" strokeWidth="4.98462" />
      <path
        d="M135.444 19.1392L163.417 47.1114"
        stroke="#F0F4FF"
        strokeWidth="7.36111"
        strokeLinecap="round"
      />
      <path
        d="M163.417 19.1392L135.444 47.1114"
        stroke="#F0F4FF"
        strokeWidth="7.36111"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Icon3() {
  return (
    <svg
      width="210"
      height="81"
      viewBox="0 0 210 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="21" width="182.556" height="40" rx="5.88889" fill="#D7E2FF" />
      <path
        d="M31.1067 37.192H40.4187V38.76H38.9947V43.496H40.6267V45.08H30.9147V43.496H32.5627V38.76H31.1067V37.192ZM34.5147 43.496H37.0267V38.76H34.5147V43.496ZM44.691 37.176H53.747V38.76H46.675V40.232H53.619V41.8H46.675V43.384H53.875V44.968H44.691V37.176ZM61.7634 37H63.7474V39.144C63.7474 41.24 65.0594 43.016 67.9554 43.624L67.0114 45.192C64.9634 44.696 63.5394 43.624 62.7554 42.152C61.9714 43.624 60.5474 44.696 58.4994 45.192L57.5554 43.624C60.4354 43.016 61.7634 41.24 61.7634 39.144V37ZM71.9398 37.048H80.8998V45.08H78.8998V42.072L71.7958 42.552L71.5558 40.84L78.8998 40.52V38.632H71.9398V37.048ZM85.2682 37.064H94.3882V38.648H90.7722V39.08C90.7722 41.192 92.0362 42.984 94.7722 43.624L93.8602 45.128C91.8762 44.6 90.5162 43.48 89.7802 41.96C89.0602 43.48 87.6842 44.6 85.7002 45.128L84.7882 43.624C87.5402 42.984 88.7882 41.192 88.7882 39.08V38.648H85.2682V37.064Z"
        fill="#95B0F8"
      />
      <path d="M24.3057 28.5693V52.5693" stroke="#7095F8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function QuizReadyIcon() {
  return (
    <svg
      width="287"
      height="215"
      viewBox="0 0 287 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.0856 22.5205C84.7997 22.5205 81.3252 25.995 81.3252 30.281V55.5024C81.3252 59.7884 84.7997 63.2629 89.0857 63.2629H130.991L144.106 74.1921C145.37 75.2452 147.288 74.3466 147.288 72.7017L147.288 63.2629H149.229C153.515 63.2629 156.99 59.7884 156.99 55.5024V30.281C156.99 25.995 153.515 22.5205 149.229 22.5205H89.0856Z"
        fill="#95B0F8"
      />
      <path
        d="M92.9663 34.1616L145.349 34.1616"
        stroke="#F6FAFD"
        strokeWidth="3.88023"
        strokeLinecap="round"
      />
      <path
        d="M92.9663 41.9219L145.349 41.9219"
        stroke="#F6FAFD"
        strokeWidth="3.88023"
        strokeLinecap="round"
      />
      <path
        d="M92.9663 49.6821L116.248 49.6821"
        stroke="#F6FAFD"
        strokeWidth="3.88023"
        strokeLinecap="round"
      />
      <path
        d="M172.896 23.692C173.412 22.7693 174.588 22.7693 175.104 23.692L177.1 27.2615C177.184 27.4116 177.291 27.5434 177.415 27.6507L180.478 30.298C181.174 30.9 181.174 32.1 180.478 32.702L177.415 35.3493C177.291 35.4566 177.184 35.5884 177.1 35.7385L175.104 39.308C174.588 40.2307 173.412 40.2307 172.896 39.308L170.9 35.7385C170.816 35.5884 170.709 35.4566 170.585 35.3493L167.522 32.702C166.826 32.1 166.826 30.9 167.522 30.298L170.585 27.6507C170.709 27.5434 170.816 27.4116 170.9 27.2615L172.896 23.692Z"
        fill="#FFAB40"
      />
      <path
        d="M65.4752 49.692C65.9544 48.7693 67.0456 48.7693 67.5248 49.692L69.3786 53.2615C69.4566 53.4116 69.5555 53.5434 69.6708 53.6507L72.5149 56.298C73.1617 56.9 73.1617 58.1 72.5149 58.702L69.6708 61.3493C69.5555 61.4566 69.4566 61.5884 69.3786 61.7385L67.5248 65.308C67.0456 66.2307 65.9544 66.2307 65.4752 65.308L63.6214 61.7385C63.5434 61.5884 63.4445 61.4566 63.3292 61.3493L60.4851 58.702C59.8383 58.1 59.8383 56.9 60.4851 56.298L63.3292 53.6507C63.4445 53.5434 63.5434 53.4116 63.6214 53.2615L65.4752 49.692Z"
        fill="#FFAB40"
      />
      <path
        d="M161.423 0.936282C162.161 -0.312094 163.839 -0.312094 164.577 0.936283L167.429 5.76559C167.549 5.96868 167.701 6.14699 167.878 6.29218L172.254 9.87377C173.249 10.6883 173.249 12.3117 172.254 13.1262L167.878 16.7078C167.701 16.853 167.549 17.0313 167.429 17.2344L164.577 22.0637C163.839 23.3121 162.161 23.3121 161.423 22.0637L158.571 17.2344C158.451 17.0313 158.299 16.853 158.122 16.7078L153.746 13.1262C152.751 12.3117 152.751 10.6883 153.746 9.87377L158.122 6.29218C158.299 6.14699 158.451 5.96868 158.571 5.76559L161.423 0.936282Z"
        fill="#FFAB40"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5208 75C6.94881 75 -0.0001297 81.9489 -0.0001297 90.5209V110.584C-0.0001297 119.156 6.9488 126.105 15.5208 126.105H89.8695L112.38 136.24C113.919 136.933 115.548 135.465 115.019 133.862L109.885 118.315C111.195 116.039 111.945 113.399 111.945 110.584V90.5209C111.945 81.9489 104.996 75 96.4237 75H15.5208Z"
        fill="url(#paint0_linear_2039_309)"
      />
      <circle
        cx="3.65037"
        cy="3.65037"
        r="3.65037"
        transform="matrix(-1 0 0 1 77.873 96.9028)"
        fill="#F6FAFD"
      />
      <circle
        cx="3.65037"
        cy="3.65037"
        r="3.65037"
        transform="matrix(-1 0 0 1 58.4048 96.9028)"
        fill="#F6FAFD"
      />
      <circle
        cx="3.65037"
        cy="3.65037"
        r="3.65037"
        transform="matrix(-1 0 0 1 38.937 96.9028)"
        fill="#F6FAFD"
      />
      <path
        d="M264.491 48.1147C264.491 48.1147 264.299 48.1457 264.212 48.1829C224.422 58.2802 182.047 72.3423 150.709 100.15C137.395 111.986 126.805 127.406 125.706 145.71C123.986 174.341 145.704 198.943 174.212 200.656C185.948 201.361 197.718 197.969 207.307 191.112C216.522 184.509 222.8 174.692 227.915 164.529C235.818 148.778 257.789 105.818 257.789 105.818C258.554 104.356 257.11 102.698 255.572 103.306C248.29 104.844 231.961 109.852 225.714 113.512C224.859 114.013 223.831 113.186 224.12 112.248C226.893 103.049 233.225 94.0846 238.214 86.3565C246.54 73.4346 255.918 61.6377 266.502 50.5504C266.839 50.2096 267.181 49.8054 267.21 49.3187C267.28 48.1548 265.686 47.9317 264.49 48.1359L264.491 48.1147Z"
        fill="#FB7E20"
      />
      <circle
        cx="38"
        cy="38"
        r="38"
        transform="matrix(1 0 0.000990467 1 139.825 113.094)"
        fill="url(#paint1_linear_2039_309)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2039_309"
          x1="56.1303"
          y1="75"
          x2="56.1303"
          y2="140.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9100" />
          <stop offset="1" stopColor="#F2C180" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2039_309"
          x1="38"
          y1="0"
          x2="38"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAB40" />
          <stop offset="1" stopColor="#FFDDB2" />
        </linearGradient>
      </defs>
    </svg>
  )
}
