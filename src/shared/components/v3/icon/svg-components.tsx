'use client'

import { useEffect, useState } from 'react'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const Plus = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10 1.66675V18.3334" stroke="currentColor" strokeWidth="1.66667" />
      <path d="M18.332 10L1.66537 10" stroke="currentColor" strokeWidth="1.66667" />
    </svg>
  )
}

export const PlusCircle = ({ ...props }) => {
  const { fill, stroke, ...rest } = props

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="10" cy="10" r="10" fill={(fill as string) ?? '#EBEFF3'} />
      <path
        d="M9.99786 5.55566V14.4446"
        stroke={(stroke as string) ?? '#4C5052'}
        strokeWidth="1.11111"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M14.4426 10.0009L5.55374 10.0009"
        stroke={(stroke as string) ?? '#4C5052'}
        strokeWidth="1.11111"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// search bar에서 사용되는 검색 아이콘 (색상 icon/secondary)
export const SearchBar = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.6667 16.6667L11.9792 11.9792M13.6111 8.05556C13.6111 11.1238 11.1238 13.6111 8.05556 13.6111C4.98731 13.6111 2.5 11.1238 2.5 8.05556C2.5 4.98731 4.98731 2.5 8.05556 2.5C11.1238 2.5 13.6111 4.98731 13.6111 8.05556Z"
        stroke="#4C5052"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Search = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 17.5L12.5368 12.5368M14.2647 8.38235C14.2647 11.6311 11.6311 14.2647 8.38235 14.2647C5.13362 14.2647 2.5 11.6311 2.5 8.38235C2.5 5.13362 5.13362 2.5 8.38235 2.5C11.6311 2.5 14.2647 5.13362 14.2647 8.38235Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowLeft = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5013 10H4.16797"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M9.16537 4.16602L3.33203 9.99935L9.16537 15.8327"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const ArrowRight = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.4987 10L15.832 10"
        stroke="#1D1E1F"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M10.8346 15.8335L16.668 10.0002L10.8346 4.16683"
        stroke="#1D1E1F"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const Cancel = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.58594 15.8325L15.8359 4.58252"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M15.8352 15.8325L4.58521 4.58252"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CancelCircle = ({ ...props }) => {
  const { fill, stroke, ...rest } = props

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="10" cy="10" r="10" fill={(fill as string) ?? '#EBEFF3'} />
      <path
        d="M6.66479 13.3343L13.3315 6.6676"
        stroke={(stroke as string) ?? '#4C5052'}
        strokeWidth="1.33333"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 13.3341L6.66634 6.66748"
        stroke={(stroke as string) ?? '#4C5052'}
        strokeWidth="1.33333"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Notification = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.50957 1.66675C6.58708 1.66675 4.21794 4.22845 4.21794 7.38846V9.72916C4.21794 11.0296 3.46205 11.5497 2.70605 12.8501C1.95005 14.1505 3.46196 14.1505 4.21791 14.1505H14.8012C15.5571 14.1505 17.4469 14.4106 16.3131 12.8501C15.1792 11.2896 14.8012 11.0296 14.8012 9.72916V7.38846C14.8012 5.82941 14.2245 4.41599 13.2892 3.384C12.3288 2.32427 10.9902 1.66675 9.50957 1.66675Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 15.8333C11.6667 16.7537 10.7339 17.4999 9.58333 17.4999C8.43274 17.4999 7.5 16.7537 7.5 15.8333"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const NewNotification = ({ ...props }) => {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.50957 3.66675C6.58708 3.66675 4.21794 6.22845 4.21794 9.38846V11.7292C4.21794 13.0296 3.46205 13.5497 2.70605 14.8501C1.95005 16.1505 3.46196 16.1505 4.21791 16.1505H14.8012C15.5571 16.1505 17.4469 16.4106 16.3131 14.8501C15.1792 13.2896 14.8012 13.0296 14.8012 11.7292V9.38846C14.8012 7.82941 14.2245 6.41599 13.2892 5.384C12.3288 4.32427 10.9902 3.66675 9.50957 3.66675Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 17.8333C11.6667 18.7537 10.7339 19.4999 9.58333 19.4999C8.43274 19.4999 7.5 18.7537 7.5 17.8333"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="18.332" cy="2.83398" r="2.5" fill="#FB8320" />
    </svg>
  )
}

export const AdjustControls = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0399 2.42065V10.6853"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M10.0399 15.2385L10.0399 18.2544"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M16.0713 2.42041L16.0713 4.62431"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M4.00854 2.42041L4.00855 4.62431"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M16.0713 9.20654L16.0713 18.2542"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M4.00854 9.20654L4.00855 18.2542"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <circle cx="4.00995" cy="6.88593" r="2.2619" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10.0412" cy="12.9767" r="2.2619" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.0725" cy="6.94452" r="2.2619" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export const MenuDots = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="4.16667"
        cy="10.0001"
        r="1.66667"
        transform="rotate(-90 4.16667 10.0001)"
        fill="currentColor"
      />
      <circle
        cx="9.9987"
        cy="9.99984"
        r="1.66667"
        transform="rotate(-90 9.9987 9.99984)"
        fill="currentColor"
      />
      <circle
        cx="15.8346"
        cy="9.99984"
        r="1.66667"
        transform="rotate(-90 15.8346 9.99984)"
        fill="currentColor"
      />
    </svg>
  )
}

// synchronize
export const Refresh = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.26885 8.07425C4.78072 5.37586 7.15288 3.33561 9.99979 3.33561C12.0283 3.33561 13.8161 4.37092 14.8619 5.9445L12.3827 8.42364L18.6403 8.66759L18.3963 2.41004L16.0586 4.74778C14.695 2.88231 12.4897 1.66895 9.99979 1.66895C6.33738 1.66895 3.2897 4.29321 2.63138 7.76364L2.47607 8.58237L4.11354 8.89299L4.26885 8.07425Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0423 11.5119C15.5304 14.2103 13.1583 16.2506 10.3114 16.2506C8.28252 16.2506 6.49434 15.2149 5.44871 13.6408L7.92745 11.1621L1.66991 10.9181L1.91386 17.1757L4.25196 14.8376C5.61546 16.7035 7.82112 17.9172 10.3114 17.9172C13.9738 17.9172 17.0215 15.293 17.6798 11.8225L17.8351 11.0038L16.1976 10.6932L16.0423 11.5119Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const List = ({ ...props }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.875 5L6.875 5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="square"
      />
      <path d="M3.54297 5H3.54287" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M16.875 10L6.875 10"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="square"
      />
      <path d="M3.54297 10H3.54287" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M16.875 15H6.875"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="square"
      />
      <path d="M3.54297 15H3.54287" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export const StopWatch = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="11.6666" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.5L10 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path
        d="M17.2979 4.32227L15.6402 5.97991"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.5 1.66663L7.5 1.66663"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M18.332 5.09814L16.5674 3.33342"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const Heart = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.0495 3.82611C16.6422 3.40569 16.1587 3.07219 15.6265 2.84465C15.0943 2.61711 14.5239 2.5 13.9479 2.5C13.3718 2.5 12.8014 2.61711 12.2692 2.84465C11.737 3.07219 11.2535 3.40569 10.8463 3.82611L10.0011 4.69821L9.15592 3.82611C8.33332 2.9773 7.21764 2.50044 6.05431 2.50044C4.89098 2.50044 3.7753 2.9773 2.9527 3.82611C2.1301 4.67492 1.66797 5.82616 1.66797 7.02656C1.66797 8.22696 2.1301 9.37819 2.9527 10.227L10.0011 17.5L17.0495 10.227C17.4569 9.80679 17.7801 9.30785 18.0006 8.75871C18.2211 8.20957 18.3346 7.62097 18.3346 7.02656C18.3346 6.43214 18.2211 5.84355 18.0006 5.2944C17.7801 4.74526 17.4569 4.24633 17.0495 3.82611Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const HeartFill = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.0495 3.82611C16.6422 3.40569 16.1587 3.07219 15.6265 2.84465C15.0943 2.61711 14.5239 2.5 13.9479 2.5C13.3718 2.5 12.8014 2.61711 12.2692 2.84465C11.737 3.07219 11.2535 3.40569 10.8463 3.82611L10.0011 4.69821L9.15592 3.82611C8.33332 2.9773 7.21764 2.50044 6.05431 2.50044C4.89098 2.50044 3.7753 2.9773 2.9527 3.82611C2.1301 4.67492 1.66797 5.82616 1.66797 7.02656C1.66797 8.22696 2.1301 9.37819 2.9527 10.227L10.0011 17.5L17.0495 10.227C17.4569 9.80679 17.7801 9.30785 18.0006 8.75871C18.2211 8.20957 18.3346 7.62097 18.3346 7.02656C18.3346 6.43214 18.2211 5.84355 18.0006 5.2944C17.7801 4.74526 17.4569 4.24633 17.0495 3.82611Z"
        fill="#4D7BF9"
        stroke="#4D7BF9"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const BookMark = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33203 3.33268C3.33203 2.41221 4.07822 1.66602 4.9987 1.66602H14.9987C15.9192 1.66602 16.6654 2.41221 16.6654 3.33268V18.3327L9.9987 14.2676L3.33203 18.3327L3.33203 3.33268Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const BookMarkFill = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33203 3.33268C3.33203 2.41221 4.07822 1.66602 4.9987 1.66602H14.9987C15.9192 1.66602 16.6654 2.41221 16.6654 3.33268V18.3327L9.9987 14.2676L3.33203 18.3327L3.33203 3.33268Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// export
export const Share = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 11.6667L2.5 15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5L15.8333 17.5C16.7538 17.5 17.5 16.7538 17.5 15.8333L17.5 11.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333L10 4.16663"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M13.332 6.66732L9.9987 3.33398L6.66536 6.66732"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const Folder = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.66797 4.16667C1.66797 3.24619 2.41416 2.5 3.33464 2.5H6.31808C6.80462 2.5 7.26687 2.7126 7.5835 3.08201L9.08576 4.83465C9.4024 5.20406 9.86465 5.41667 10.3512 5.41667H14.168H16.668C17.5884 5.41667 18.3346 6.16286 18.3346 7.08333V15.8333C18.3346 16.7538 17.5884 17.5 16.668 17.5H3.33463C2.41416 17.5 1.66797 16.7538 1.66797 15.8333V4.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const Setting = ({ ...props }) => {
  const [clipId, setClipId] = useState<string>('')

  useEffect(() => {
    setClipId(generateUUID())
  }, [])

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M10.0013 0.833984H8.99942C8.57324 0.833984 8.21062 1.16054 8.16202 1.59851L7.95641 3.33119C7.92276 3.63086 7.73958 3.89594 7.47042 4.01504C7.02555 4.21482 6.61059 4.4607 6.22554 4.75268C5.99002 4.93324 5.676 4.96398 5.40684 4.84488L3.84419 4.16103C3.45166 3.98815 2.99558 4.14566 2.7825 4.52601L1.78061 6.30863C1.56752 6.68897 1.66472 7.17305 2.00491 7.43813L3.36194 8.48312C3.59746 8.66369 3.7283 8.95951 3.69466 9.26302C3.66849 9.50505 3.65354 9.75093 3.65354 10.0007C3.65354 10.2504 3.66849 10.4963 3.69466 10.7383C3.7283 11.038 3.59746 11.3338 3.36194 11.5182L2.00491 12.5632C1.66472 12.8283 1.56752 13.3123 1.78061 13.6927L2.7825 15.4753C2.99558 15.8556 3.45166 16.0132 3.84419 15.8403L5.40684 15.1564C5.676 15.0373 5.99002 15.0681 6.22554 15.2486C6.61059 15.5406 7.02555 15.7903 7.47042 15.9863C7.73958 16.1054 7.92276 16.3704 7.95641 16.6701L8.16202 18.4028C8.21436 18.8369 8.57324 19.1673 8.99942 19.1673H10.0013"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.9987 0.833984H11.0006C11.4268 0.833984 11.7894 1.16054 11.838 1.59851L12.0436 3.33119C12.0772 3.63086 12.2604 3.89594 12.5296 4.01504C12.9744 4.21482 13.3894 4.4607 13.7745 4.75268C14.01 4.93324 14.324 4.96398 14.5932 4.84488L16.1558 4.16103C16.5483 3.98815 17.0044 4.14566 17.2175 4.52601L18.2194 6.30863C18.4325 6.68897 18.3353 7.17305 17.9951 7.43813L16.6381 8.48312C16.4025 8.66369 16.2717 8.95951 16.3053 9.26302C16.3315 9.50505 16.3465 9.75093 16.3465 10.0007C16.3465 10.2504 16.3315 10.4963 16.3053 10.7383C16.2717 11.038 16.4025 11.3338 16.6381 11.5182L17.9951 12.5632C18.3353 12.8283 18.4325 13.3123 18.2194 13.6927L17.2175 15.4753C17.0044 15.8556 16.5483 16.0132 16.1558 15.8403L14.5932 15.1564C14.324 15.0373 14.01 15.0681 13.7745 15.2486C13.3894 15.5406 12.9744 15.7903 12.5296 15.9863C12.2604 16.1054 12.0772 16.3704 12.0436 16.6701L11.838 18.4028C11.7856 18.8369 11.4268 19.1673 11.0006 19.1673H9.9987"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="10.0013" cy="9.99935" r="2.58333" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Sort = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.25 16.25L6.25 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 3.75L13.75 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 6.25L6.25 3.75L3.75 6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M11.25 13.75L13.75 16.25L16.25 13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

// note
export const Document = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.7981 12.2725H14.5429V10.7829H13.7981V12.2725ZM6.10577 10.7829H5.36098V12.2725H6.10577V10.7829ZM13.7981 15.3281H14.5429V13.8385H13.7981V15.3281ZM6.10577 13.8385H5.36098V15.3281H6.10577V13.8385ZM4.56731 1.97913V2.72392V1.97913ZM16.875 8.15135H17.6198C17.6198 7.9603 17.5464 7.77656 17.4147 7.63811L16.875 8.15135ZM11.0058 1.97913L11.5455 1.46589C11.3356 1.24512 11.0123 1.17446 10.7294 1.2875C10.4465 1.40053 10.261 1.67447 10.261 1.97913L11.0058 1.97913ZM11.0058 8.15135H10.261C10.261 8.56268 10.5944 8.89614 11.0058 8.89614V8.15135ZM13.7981 10.7829H6.10577V12.2725H13.7981V10.7829ZM13.7981 13.8385H6.10577V15.3281H13.7981V13.8385ZM9.18269 1.23433H4.56731V2.72392H9.18269V1.23433ZM4.56731 1.23433C3.36472 1.23433 2.38021 2.20457 2.38021 3.41142H3.86979C3.86979 3.03701 4.17759 2.72392 4.56731 2.72392V1.23433ZM2.38021 3.41142V16.5885H3.86979V3.41142H2.38021ZM2.38021 16.5885C2.38021 17.7953 3.36472 18.7656 4.56731 18.7656V17.276C4.17759 17.276 3.86979 16.9629 3.86979 16.5885H2.38021ZM4.56731 18.7656H15.4327V17.276H4.56731V18.7656ZM15.4327 18.7656C16.6353 18.7656 17.6198 17.7953 17.6198 16.5885H16.1302C16.1302 16.9629 15.8224 17.276 15.4327 17.276V18.7656ZM17.6198 16.5885V8.15135H16.1302V16.5885H17.6198ZM17.4147 7.63811L11.5455 1.46589L10.466 2.49236L16.3353 8.66458L17.4147 7.63811ZM10.261 1.97913V8.15135H11.7506V1.97913H10.261ZM11.0058 8.89614H16.875V7.40656H11.0058V8.89614Z"
        fill="currentColor"
      />
    </svg>
  )
}

// record
export const PastRecord = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.50494 6.24971C5.57601 2.66251 10.1629 1.43345 13.7501 3.50452C17.3373 5.57558 18.5664 10.1625 16.4953 13.7497C14.4243 17.3369 9.83733 18.566 6.25013 16.4949C4.88245 15.7053 3.85756 14.5499 3.22766 13.2237"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 5.8335L10 10.0002L13.3333 12.5002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M2.08033 8.93043L1.21909 3.83986L7.27766 7.62778L2.08033 8.93043Z"
        fill="currentColor"
      />
    </svg>
  )
}

// write
export const WriteNote = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.4688 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V15.8334C2.5 16.7538 3.24619 17.5 4.16667 17.5H15C15.9205 17.5 16.6667 16.7539 16.6667 15.8334V9.974"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.112 2.24844C15.4375 1.923 15.9651 1.923 16.2905 2.24844L17.7437 3.70155C18.0691 4.02699 18.0691 4.55463 17.7437 4.88006L9.50924 13.1145C9.36675 13.257 9.17746 13.343 8.97642 13.3567L6.94123 13.4948C6.68931 13.5119 6.4802 13.3028 6.4973 13.0509L6.63544 11.0157C6.64909 10.8146 6.73512 10.6254 6.87761 10.4829L15.112 2.24844Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// edit
export const WriteLine = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.36047 14.0563L1.83891 13.5246C1.69613 13.6646 1.61568 13.8562 1.61568 14.0563H2.36047ZM2.36047 16.6115H1.61568C1.61568 17.0228 1.94914 17.3563 2.36047 17.3563V16.6115ZM4.72471 16.6115V17.3563C4.92224 17.3563 5.11168 17.2778 5.25136 17.1381L4.72471 16.6115ZM15.3848 5.95139L14.8581 5.42474L15.3848 5.95139ZM15.3848 4.89722L14.8581 5.42387L15.3848 4.89722ZM13.7959 3.30833L14.3225 2.78169V2.78169L13.7959 3.30833ZM12.9098 3.30833L12.3831 2.78169C12.3795 2.78528 12.376 2.7889 12.3725 2.79257L12.9098 3.30833ZM11.2636 5.02326L10.7263 4.5075C10.4449 4.80059 10.4504 5.26509 10.7385 5.5515L11.2636 5.02326ZM8.8539 15.9354H8.10911V17.425H8.8539V15.9354ZM17.5084 17.425H18.2532V15.9354H17.5084V17.425ZM9.47818 6.03081L1.83891 13.5246L2.88203 14.5879L10.5213 7.09419L9.47818 6.03081ZM1.61568 14.0563V16.6115H3.10527V14.0563H1.61568ZM2.36047 17.3563H4.72471V15.8667H2.36047V17.3563ZM5.25136 17.1381L15.9114 6.47804L14.8581 5.42474L4.19806 16.0848L5.25136 17.1381ZM15.9114 6.47804C16.4926 5.8969 16.4926 4.95171 15.9114 4.37058L14.8581 5.42387V5.42474L15.9114 6.47804ZM15.9114 4.37058L14.3225 2.78169L13.2692 3.83498L14.8581 5.42387L15.9114 4.37058ZM14.3225 2.78169C13.7872 2.24638 12.9184 2.24638 12.3831 2.78169L13.4364 3.83498C13.39 3.8814 13.3157 3.8814 13.2692 3.83498L14.3225 2.78169ZM12.3725 2.79257L10.7263 4.5075L11.8009 5.53903L13.4471 3.8241L12.3725 2.79257ZM10.7385 5.5515L13.2708 8.06852L14.3209 7.01204L11.7887 4.49503L10.7385 5.5515ZM8.8539 17.425H17.5084V15.9354H8.8539V17.425Z"
        fill="currentColor"
      />
    </svg>
  )
}

// write
export const Pencil = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3841 7.58794L3 17.5896V21H6.21373L20.7041 6.7723C21.0986 6.38488 21.0986 5.75276 20.7041 5.36534L18.5443 3.24469C18.212 2.91844 17.6721 2.91844 17.3398 3.24469L15.1021 5.53356L18.5443 8.89295"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// import file (attach)
export const Clip = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.3103 3.68973L3.69015 11.3099C1.35209 13.648 1.35209 17.4387 3.69015 19.7768V19.7768C6.02821 22.1148 9.81896 22.1148 12.157 19.7768L21.1883 10.7454C22.747 9.18674 22.747 6.65958 21.1883 5.10087V5.10087C19.6296 3.54217 17.1025 3.54217 15.5438 5.10087L6.23021 14.4144C5.45086 15.1938 5.45086 16.4574 6.23021 17.2367V17.2367C7.00957 18.0161 8.27315 18.0161 9.0525 17.2367L16.9549 9.33431"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Notion = ({ ...props }) => {
  // 클라이언트에서만 UUID를 생성하기 위해 useState와 useEffect 사용
  const [patternId, setPatternId] = useState<string>('')
  const [imageId, setImageId] = useState<string>('')

  useEffect(() => {
    setPatternId(generateUUID())
    setImageId(generateUUID())
  }, [])

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g style={{ mixBlendMode: 'multiply' }}>
        <rect x="2" y="2" width="20" height="20" fill={`url(#${patternId})`} />
      </g>
      <defs>
        <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref={'#' + imageId} transform="scale(0.00444444)" />
        </pattern>
        <image
          id={imageId}
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

export const ChevronDown = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 7L8 12L3 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronUp = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 10L8 5L13 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronLeft = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 13L5 8L10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronRight = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 3L12 8L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const TriangleLeft = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 7.5L11 12.6962L11 2.30385L2 7.5Z" fill="currentColor" />
    </svg>
  )
}

export const TriangleRight = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 7.5L5 2.30385L5 12.6962L14 7.5Z" fill="currentColor" />
    </svg>
  )
}

// delete
export const Bin = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.9 13.2497L3.25292 13.3126L3.25449 13.326L3.9 13.2497ZM12.18 13.2463L12.8255 13.3226L12.8266 13.3132L12.8275 13.3038L12.18 13.2463ZM7.15 7C7.15 6.64102 6.85898 6.35 6.5 6.35C6.14102 6.35 5.85 6.64102 5.85 7H7.15ZM5.85 11.5C5.85 11.859 6.14102 12.15 6.5 12.15C6.85898 12.15 7.15 11.859 7.15 11.5H5.85ZM10.15 7C10.15 6.64102 9.85898 6.35 9.5 6.35C9.14102 6.35 8.85 6.64102 8.85 7H10.15ZM8.85 11.5C8.85 11.859 9.14102 12.15 9.5 12.15C9.85898 12.15 10.15 11.859 10.15 11.5H8.85ZM1 4.52301H15.16V3.22301H1V4.52301ZM5.89 3.36634V2.66634H4.59V3.36634H5.89ZM5.89 2.66634C5.89 2.28866 6.19565 1.98301 6.57333 1.98301V0.683008C5.47768 0.683008 4.59 1.57069 4.59 2.66634H5.89ZM6.57333 1.98301H9.77667V0.683008H6.57333V1.98301ZM9.77667 1.98301C10.1543 1.98301 10.46 2.28866 10.46 2.66634H11.76C11.76 1.57069 10.8723 0.683008 9.77667 0.683008V1.98301ZM10.46 2.66634V3.36634H11.76V2.66634H10.46ZM2.35306 4.06295L3.25306 13.3126L4.54694 13.1867L3.64694 3.93705L2.35306 4.06295ZM3.25449 13.326C3.38617 14.4402 4.40426 15.1897 5.5 15.1897V13.8897C4.94907 13.8897 4.58716 13.5258 4.54551 13.1734L3.25449 13.326ZM5.5 15.1897H10.58V13.8897H5.5V15.1897ZM10.58 15.1897C11.6779 15.1897 12.6941 14.4349 12.8255 13.3226L11.5345 13.1701C11.4926 13.5244 11.1288 13.8897 10.58 13.8897V15.1897ZM12.8275 13.3038L13.6475 4.05742L12.3525 3.94258L11.5325 13.1889L12.8275 13.3038ZM5.85 7V11.5H7.15V7H5.85ZM8.85 7V11.5H10.15V7H8.85Z"
        fill="#F4502C"
      />
    </svg>
  )
}

export const Move = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.35 9.30005L13.5 6.15005L10.35 3.00005"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path
        d="M13 6.15015H5.5C3.84315 6.15015 2.5 7.49329 2.5 9.15015V10.3252V14.5002"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export const Info = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="7" stroke="#B6C1C9" strokeWidth="1.3" />
      <path
        d="M8 11.5L8 7.5M8 5L8 4.5"
        stroke="#B6C1C9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Question = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="7" stroke="#B6C1C9" strokeWidth="1.3" />
      <path
        d="M6.96743 9.56422V9.43482C6.9699 8.9908 7.00826 8.63685 7.0825 8.37298C7.15921 8.1091 7.27057 7.89597 7.41657 7.73359C7.56258 7.5712 7.73828 7.42404 7.94367 7.2921C8.0971 7.19061 8.23444 7.08532 8.3557 6.97621C8.47695 6.86711 8.57347 6.74659 8.64523 6.61465C8.71699 6.48018 8.75288 6.33048 8.75288 6.16556C8.75288 5.99049 8.71205 5.83698 8.63038 5.70504C8.54872 5.57311 8.4386 5.47161 8.30002 5.40057C8.16391 5.32953 8.01296 5.29401 7.84716 5.29401C7.68631 5.29401 7.53412 5.3308 7.39059 5.40438C7.24706 5.47542 7.12952 5.58199 7.03795 5.72407C6.94639 5.86362 6.8969 6.03743 6.88948 6.24548H5.375C5.38737 5.73803 5.50616 5.31938 5.73135 4.98953C5.95654 4.65715 6.25473 4.40977 6.62593 4.24738C6.99712 4.08246 7.40668 4 7.85458 4C8.34704 4 8.78257 4.08373 9.16119 4.25119C9.53981 4.41611 9.83677 4.65588 10.0521 4.9705C10.2674 5.28513 10.375 5.66445 10.375 6.10847C10.375 6.40533 10.3267 6.6692 10.2302 6.90009C10.1362 7.12845 10.0038 7.33143 9.83305 7.50904C9.6623 7.68411 9.46062 7.84269 9.22801 7.98478C9.03251 8.10403 8.87166 8.22835 8.74545 8.35775C8.62172 8.48716 8.52892 8.63685 8.46706 8.80685C8.40767 8.97685 8.37673 9.18617 8.37426 9.43482V9.56422H6.96743ZM7.70239 12C7.45493 12 7.24335 11.9112 7.06765 11.7336C6.89443 11.5534 6.80905 11.3378 6.81153 11.0866C6.80905 10.8379 6.89443 10.6248 7.06765 10.4472C7.24335 10.2696 7.45493 10.1808 7.70239 10.1808C7.93748 10.1808 8.14412 10.2696 8.32229 10.4472C8.50046 10.6248 8.59079 10.8379 8.59326 11.0866C8.59079 11.254 8.54748 11.4075 8.46334 11.5471C8.38168 11.6841 8.27403 11.7945 8.1404 11.8782C8.00677 11.9594 7.86077 12 7.70239 12Z"
        fill="#B6C1C9"
      />
    </svg>
  )
}

export const Medal = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="7.99999" cy="6.00005" r="4.7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 9.5L5 14.6512C5 14.8057 5.16771 14.9018 5.30104 14.8238L7.89896 13.303C7.96137 13.2665 8.03863 13.2665 8.10104 13.303L10.699 14.8238C10.8323 14.9018 11 14.8057 11 14.6512V9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Link = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.4348 10.0001V12.6665C12.4348 13.4029 11.8378 13.9998 11.1014 13.9998H3.33333C2.59695 13.9998 2 13.4029 2 12.6665V4.8984C2 4.16202 2.59695 3.56506 3.33333 3.56506H6"
        stroke="#4C5052"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path
        d="M8.26074 7.21763L12.9564 2.52197"
        stroke="#4C5052"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path
        d="M8.78223 2H13.4779V7.21739"
        stroke="#4C5052"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const Check = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 7.5L6.22727 12L14.5 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export const Clock = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5L8 8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  )
}

export const Download = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9.61414L1 13.4215C1 14.2626 1.68185 14.9445 2.52295 14.9445L13.1836 14.9445C14.0247 14.9445 14.7065 14.2626 14.7065 13.4215L14.7065 9.61413"
        stroke="currentColor"
        strokeWidth="1.37065"
        strokeLinejoin="round"
      />
      <path
        d="M7.85083 2L7.85083 10.3762"
        stroke="currentColor"
        strokeWidth="1.37065"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M4.80615 8.09119L7.85205 11.1371L10.8979 8.09119"
        stroke="currentColor"
        strokeWidth="1.37065"
        strokeLinecap="square"
      />
    </svg>
  )
}

// (*)
export const Asterisk = ({ ...props }) => {
  return (
    <svg
      width="7"
      height="15"
      viewBox="0 0 7 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.928 1V2.776L5.584 2.248L5.884 3.172L4.228 3.7L5.296 5.164L4.528 5.764L3.436 4.276L2.356 5.764L1.6 5.152L2.668 3.7L1 3.172L1.3 2.248L2.956 2.776L2.944 1H3.928Z"
        fill="#FB8320"
      />
    </svg>
  )
}

// GNB
export const Person = ({ ...props }) => {
  const { fill, ...rest } = props

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="12" cy="6" r="5" fill={(fill as string) ?? '#D3DCE4'} />
      <path
        d="M22 20.3269C22 24.3734 17.5228 23.9903 12 23.9903C6.47715 23.9903 2 24.3734 2 20.3269C2 16.2803 6.47715 13 12 13C17.5228 13 22 16.2803 22 20.3269Z"
        fill={(fill as string) ?? '#D3DCE4'}
      />
    </svg>
  )
}

export const Planet = ({ ...props }) => {
  const { fill, ...rest } = props
  const [clipId, setClipId] = useState<string>('')

  useEffect(() => {
    setClipId(generateUUID())
  }, [])

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.715456 23.1813C2.26657 24.7324 6.01863 23.6774 10.2426 20.8285C10.811 20.941 11.3986 21 12 21C16.9706 21 21 16.9706 21 12C21 11.412 20.9436 10.8371 20.8359 10.2806C23.7569 5.99919 24.8529 2.18057 23.2845 0.612185C21.7043 -0.9681 17.8395 0.156629 13.5186 3.12759C13.025 3.04369 12.5176 3 12 3C7.02944 3 3 7.02944 3 12C3 12.5309 3.04598 13.0511 3.13416 13.5568C0.235651 17.8204 -0.847566 21.6182 0.715456 23.1813ZM2.53126 19.7402C3.08904 20.298 4.45617 19.9469 6.24551 18.9203C6.23825 18.9142 6.231 18.9082 6.22376 18.9021C7.08452 18.4667 7.9482 17.7608 8.98693 16.681C9.15617 16.5051 8.86763 16.1874 8.65899 16.3142C7.14643 17.2329 5.94069 17.5613 5.05767 17.7279C4.5864 17.1573 4.18411 16.5277 3.86357 15.8518C2.51134 17.7242 1.92687 19.1358 2.53126 19.7402ZM19.8218 2.44962C20.3906 3.01837 20.0144 4.42862 18.9405 6.26995C18.1021 5.25558 17.0456 4.42809 15.8428 3.85932C17.7601 2.4614 19.2123 1.84008 19.8218 2.44962Z"
          fill={(fill as string) ?? '#D3DCE4'}
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const QuizNote = ({ ...props }) => {
  const { fill, ...rest } = props

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M1 4.32722C1 3.57554 1.57318 2.94789 2.32177 2.87984C5.04576 2.6322 7.78193 3.19924 10.1832 4.50901L12 5.5L13.8168 4.50901C16.2181 3.19924 18.9542 2.6322 21.6782 2.87984C22.4268 2.94789 23 3.57554 23 4.32722V18.5293C23 19.2951 22.3065 19.8739 21.553 19.7369C18.9304 19.2601 16.2236 19.6962 13.8835 20.9726L12.7689 21.5806C12.2896 21.842 11.7104 21.842 11.2311 21.5806L10.1165 20.9726C7.77636 19.6962 5.06956 19.2601 2.44698 19.7369C1.69354 19.8739 1 19.2951 1 18.5293V4.32722Z"
        fill={(fill as string) ?? '#D3DCE4'}
      />
      <circle cx="6.95" cy="12.25" r="1.25" fill="white" />
      <circle cx="11.95" cy="12.25" r="1.25" fill="white" />
      <circle cx="16.95" cy="12.25" r="1.25" fill="white" />
    </svg>
  )
}

export const Picktoss = ({ ...props }) => {
  const { fill, ...rest } = props

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M22.2504 1.14996C22.2504 1.14996 22.223 1.15437 22.2106 1.15969C16.5322 2.60066 10.4849 4.60744 6.01271 8.5758C4.11269 10.265 2.60141 12.4654 2.44448 15.0776C2.19902 19.1635 5.2985 22.6745 9.36676 22.9189C11.0416 23.0195 12.7213 22.5355 14.0898 21.5569C15.4048 20.6146 16.3007 19.2136 17.0306 17.7633C18.1584 15.5155 21.294 9.38472 21.294 9.38472C21.4031 9.17609 21.197 8.93943 20.9775 9.02626C19.9383 9.24569 17.608 9.96038 16.7166 10.4827C16.5946 10.5541 16.4478 10.4362 16.489 10.3023C16.8847 8.98951 17.7884 7.71025 18.5005 6.6074C19.6886 4.76332 21.027 3.07981 22.5373 1.49755C22.5855 1.44892 22.6342 1.39123 22.6384 1.32178C22.6484 1.15568 22.421 1.12384 22.2502 1.15298L22.2504 1.14996Z"
        fill={(fill as string) ?? '#D3DCE4'}
      />
    </svg>
  )
}
