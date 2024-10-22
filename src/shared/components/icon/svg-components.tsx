'use client'

import { useId } from 'react'

// function generateUUID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }

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

export const FolderFill = ({ ...props }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.1665 2.91667C1.1665 2.27233 1.68884 1.75 2.33317 1.75H4.42158C4.76216 1.75 5.08573 1.89882 5.30738 2.15741L6.35896 3.38426C6.58061 3.64284 6.90418 3.79167 7.24476 3.79167H9.9165H11.6665C12.3108 3.79167 12.8332 4.314 12.8332 4.95833V11.0833C12.8332 11.7277 12.3108 12.25 11.6665 12.25H2.33317C1.68884 12.25 1.1665 11.7277 1.1665 11.0833V2.91667Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Setting = ({ ...props }) => {
  const clipId = useId()

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
  const patternId = useId()
  const imageId = useId()

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
        fill="currentColor"
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

export const Camera = ({ ...props }) => {
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
        d="M1 6C1 5.44772 1.44772 5 2 5H5C5.55228 5 6 4.55228 6 4V3.5C6 2.94772 6.44772 2.5 7 2.5H13C13.5523 2.5 14 2.94772 14 3.5V4C14 4.55228 14.4477 5 15 5H18C18.5523 5 19 5.44772 19 6V16C19 16.5523 18.5523 17 18 17H2C1.44772 17 1 16.5523 1 16V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
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

// (구분점)
export const MiddleDot = ({ ...props }) => {
  return (
    <svg
      width="3"
      height="3"
      viewBox="0 0 3 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="#D3DCE4" />
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
  const clipId = useId()

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

// 일러스트 svg 아이콘
export const Star = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9622_411)">
        <path
          d="M9.19353 1.63543L10.6254 4.5253C10.7913 4.86188 11.1144 5.0969 11.4869 5.14912L14.6854 5.61336C15.6254 5.74973 16.0009 6.90162 15.3198 7.56026L13.0061 9.80891C12.7354 10.07 12.6132 10.4501 12.6772 10.8186L13.2244 13.9957C13.3844 14.9271 12.4037 15.6409 11.5626 15.1999L8.70168 13.6998C8.36699 13.5257 7.96827 13.5257 7.63649 13.6998L4.7756 15.1999C3.93451 15.6409 2.95372 14.93 3.11379 13.9957L3.66093 10.8186C3.72496 10.4472 3.60273 10.07 3.33206 9.80891L1.01833 7.56026C0.337303 6.89872 0.712739 5.74973 1.65279 5.61336L4.85127 5.14912C5.2238 5.09399 5.54685 4.86188 5.71274 4.5253L7.14464 1.63543C7.56373 0.788192 8.77735 0.788192 9.19935 1.63543H9.19353Z"
          fill="#FFC95E"
        />
        <path
          d="M8.32718 5.0127L6.4209 9.18213L8.03615 9.19373L7.63161 12.1649L9.65431 8.20143H8.03615L8.32718 5.0127Z"
          fill="url(#paint0_linear_9622_411)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_9622_411"
          x1="6.01345"
          y1="10.5516"
          x2="9.93623"
          y2="6.61394"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.12" stopColor="#FFB95E" />
          <stop offset="0.78" stopColor="#FF832A" />
        </linearGradient>
        <clipPath id="clip0_9622_411">
          <rect width="15" height="14.3333" fill="white" transform="translate(0.666504 1)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Pin = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.0186 17.9751L15.3795 16.4515L9.03099 27.4474C8.61025 28.1762 8.85994 29.108 9.58869 29.5288C10.3174 29.9495 11.2493 29.6998 11.67 28.9711L18.0186 17.9751Z"
        fill="#D2D6DB"
      />
      <rect
        width="3.04729"
        height="9.14188"
        transform="matrix(-0.866025 -0.5 -0.5 0.866025 20.5596 13.5771)"
        fill="#A2A6AB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.7561 6.31729C30.1116 6.52254 30.2335 6.97712 30.0282 7.33263L29.6567 7.97613C28.9637 9.17631 27.5604 9.71061 26.2845 9.35451L21.7318 17.24C22.6782 18.1669 22.9172 19.6495 22.2242 20.8497L21.8527 21.4932C21.6474 21.8487 21.1929 21.9705 20.8374 21.7652L10.5388 15.8193C10.1832 15.6141 10.0614 15.1595 10.2667 14.804L10.6382 14.1605C11.3306 12.9613 12.7323 12.4269 14.0074 12.7813L18.5609 4.89439C17.6163 3.96733 17.3783 2.48621 18.0707 1.28695L18.4422 0.643448C18.6475 0.287943 19.102 0.166138 19.4575 0.371389L29.7561 6.31729Z"
        fill="url(#paint0_linear_2808_1902)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2808_1902"
          x1="24.6069"
          y1="3.34436"
          x2="15.688"
          y2="18.7923"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7095F8" />
          <stop offset="1" stopColor="#A9C0FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const MultipleQuizIcon = ({ ...props }) => {
  return (
    <svg
      width="72"
      height="45"
      viewBox="0 0 72 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="11.895" width="44.606" height="9.78203" rx="2.2303" fill="#D7E2FF" />
      <rect x="11.895" y="11.5234" width="44.606" height="9.78203" rx="2.2303" fill="#D7E2FF" />
      <rect x="16.7275" y="23.0464" width="44.606" height="9.78203" rx="2.2303" fill="#95B0F8" />
      <rect x="11.895" y="34.5698" width="44.606" height="9.78203" rx="2.2303" fill="#D7E2FF" />
      <circle cx="22.2499" cy="27.9432" r="3.29235" fill="#F5F7F9" />
      <path
        d="M20.9331 27.9008L21.9208 28.8885L23.8962 26.9131"
        stroke="#577CFF"
        strokeWidth="0.658469"
        strokeLinecap="round"
      />
      <path
        d="M61.9981 38.0344L58.109 32.0072C57.5737 31.1777 58.2393 30.0981 59.2209 30.2037L66.295 30.9647C67.3183 31.0747 67.7146 32.3545 66.9327 33.0237L65.1693 34.5326C64.988 34.6878 64.8583 34.8945 64.7974 35.1253L64.1195 37.6972C63.8594 38.6838 62.5513 38.8917 61.9981 38.0344Z"
        fill="#FF9100"
      />
    </svg>
  )
}

export const OXQuizIcon = ({ ...props }) => {
  return (
    <svg
      width="81"
      height="36"
      viewBox="0 0 81 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="41.7969" y="4.64404" width="38.9265" height="27.548" rx="4.79096" fill="#95B0F8" />
      <rect x="6.16943" y="6.67773" width="32.9491" height="23.3179" rx="4.05528" fill="#D7E2FF" />
      <circle cx="22.898" cy="18.337" r="6.08292" stroke="#95B0F8" strokeWidth="2.02764" />
      <path
        d="M55.5708 12.4297L66.9493 23.8082"
        stroke="#F0F4FF"
        strokeWidth="2.99435"
        strokeLinecap="round"
      />
      <path
        d="M66.9492 12.4297L55.5707 23.8082"
        stroke="#F0F4FF"
        strokeWidth="2.99435"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.3704 0.659163C59.9347 0.604254 60.5065 0.576172 61.0848 0.576172C61.663 0.576172 62.2349 0.604254 62.7991 0.659163C63.1642 0.694697 63.4314 1.01949 63.3959 1.38461C63.3604 1.74974 63.0356 2.01692 62.6704 1.98139C62.1489 1.93063 61.62 1.90464 61.0848 1.90464C60.5496 1.90464 60.0206 1.93063 59.4991 1.98139C59.134 2.01692 58.8092 1.74974 58.7737 1.38461C58.7381 1.01949 59.0053 0.694697 59.3704 0.659163ZM56.8341 1.76824C56.9405 2.11933 56.7421 2.49017 56.391 2.59654C55.3692 2.90613 54.3901 3.31424 53.4647 3.8099C53.1413 3.9831 52.7387 3.86137 52.5655 3.53798C52.3923 3.2146 52.514 2.81204 52.8374 2.63883C53.8391 2.10231 54.8992 1.6604 56.0058 1.32514C56.3569 1.21877 56.7278 1.41715 56.8341 1.76824ZM65.3354 1.76824C65.4418 1.41715 65.8127 1.21877 66.1637 1.32514C67.2703 1.6604 68.3305 2.10231 69.3321 2.63883C69.6555 2.81204 69.7773 3.2146 69.6041 3.53798C69.4308 3.86136 69.0283 3.9831 68.7049 3.80989C67.7795 3.31424 66.8004 2.90612 65.7785 2.59654C65.4275 2.49017 65.2291 2.11933 65.3354 1.76824ZM71.2468 4.63785C71.4797 4.35441 71.8983 4.31342 72.1817 4.5463C73.0667 5.27343 73.879 6.08574 74.6062 6.97074C74.8391 7.25418 74.7981 7.67275 74.5146 7.90563C74.2312 8.13852 73.8126 8.09753 73.5797 7.81408C72.9075 6.99594 72.1565 6.24495 71.3384 5.57275C71.0549 5.33987 71.014 4.9213 71.2468 4.63785ZM50.9227 4.63785C51.1556 4.9213 51.1146 5.33987 50.8312 5.57275C50.013 6.24495 49.262 6.99594 48.5898 7.81409C48.357 8.09753 47.9384 8.13852 47.6549 7.90564C47.3715 7.67275 47.3305 7.25418 47.5634 6.97074C48.2905 6.08574 49.1028 5.27343 49.9878 4.5463C50.2713 4.31342 50.6898 4.35441 50.9227 4.63785ZM75.6145 9.54842C75.9379 9.37521 76.3404 9.49695 76.5137 9.82033C77.0502 10.822 77.4921 11.8821 77.8273 12.9887C77.9337 13.3398 77.7353 13.7107 77.3842 13.817C77.0332 13.9234 76.6623 13.725 76.5559 13.3739C76.2464 12.3521 75.8382 11.373 75.3426 10.4476C75.1694 10.1242 75.2911 9.72163 75.6145 9.54842ZM46.5551 9.54842C46.8785 9.72163 47.0002 10.1242 46.827 10.4476C46.3313 11.373 45.9232 12.3521 45.6136 13.3739C45.5073 13.725 45.1364 13.9234 44.7853 13.817C44.4342 13.7107 44.2359 13.3398 44.3422 12.9887C44.6775 11.8821 45.1194 10.822 45.6559 9.82033C45.8291 9.49695 46.2317 9.37521 46.5551 9.54842ZM44.4017 15.7566C44.7668 15.7921 45.034 16.1169 44.9985 16.482C44.9477 17.0035 44.9217 17.5325 44.9217 18.0677C44.9217 18.6029 44.9477 19.1318 44.9985 19.6534C45.034 20.0185 44.7668 20.3433 44.4017 20.3788C44.0366 20.4143 43.7118 20.1472 43.6763 19.782C43.6213 19.2178 43.5933 18.6459 43.5933 18.0677C43.5933 17.4894 43.6213 16.9176 43.6763 16.3534C43.7118 15.9882 44.0366 15.721 44.4017 15.7566ZM77.7679 15.7566C78.133 15.721 78.4578 15.9882 78.4933 16.3534C78.5482 16.9176 78.5763 17.4894 78.5763 18.0677C78.5763 18.6459 78.5482 19.2178 78.4933 19.782C78.4578 20.1472 78.133 20.4143 77.7679 20.3788C77.4027 20.3433 77.1356 20.0185 77.1711 19.6534C77.2218 19.1318 77.2478 18.6029 77.2478 18.0677C77.2478 17.5325 77.2218 17.0035 77.1711 16.482C77.1356 16.1169 77.4027 15.7921 77.7679 15.7566ZM44.7853 22.3184C45.1364 22.212 45.5073 22.4104 45.6136 22.7615C45.9232 23.7833 46.3313 24.7624 46.827 25.6878C47.0002 26.0112 46.8785 26.4138 46.5551 26.587C46.2317 26.7602 45.8291 26.6384 45.6559 26.3151C45.1194 25.3134 44.6775 24.2532 44.3422 23.1467C44.2359 22.7956 44.4342 22.4247 44.7853 22.3184ZM77.3842 22.3184C77.7353 22.4247 77.9337 22.7956 77.8273 23.1467C77.4921 24.2532 77.0502 25.3134 76.5137 26.3151C76.3404 26.6384 75.9379 26.7602 75.6145 26.587C75.2911 26.4138 75.1694 26.0112 75.3426 25.6878C75.8382 24.7624 76.2464 23.7833 76.5559 22.7615C76.6623 22.4104 77.0332 22.212 77.3842 22.3184ZM74.5146 28.2298C74.7981 28.4626 74.8391 28.8812 74.6062 29.1647C73.879 30.0496 73.0667 30.862 72.1817 31.5891C71.8983 31.822 71.4797 31.781 71.2468 31.4975C71.014 31.2141 71.0549 30.7955 71.3384 30.5626C72.1565 29.8904 72.9075 29.1394 73.5797 28.3213C73.8126 28.0379 74.2312 27.9969 74.5146 28.2298ZM47.6549 28.2298C47.9384 27.9969 48.357 28.0379 48.5898 28.3213C49.262 29.1394 50.013 29.8904 50.8312 30.5626C51.1146 30.7955 51.1556 31.2141 50.9227 31.4975C50.6898 31.781 50.2713 31.822 49.9878 31.5891C49.1028 30.862 48.2905 30.0496 47.5634 29.1647C47.3305 28.8812 47.3715 28.4626 47.6549 28.2298ZM52.5655 32.5974C52.7387 32.274 53.1413 32.1523 53.4647 32.3255C54.3901 32.8211 55.3692 33.2293 56.391 33.5389C56.7421 33.6452 56.9405 34.0161 56.8341 34.3671C56.7278 34.7182 56.3569 34.9166 56.0058 34.8102C54.8992 34.475 53.8391 34.0331 52.8374 33.4966C52.514 33.3234 52.3923 32.9208 52.5655 32.5974ZM69.6041 32.5974C69.7773 32.9208 69.6555 33.3233 69.3321 33.4966C68.3305 34.0331 67.2703 34.475 66.1637 34.8102C65.8127 34.9166 65.4418 34.7182 65.3354 34.3671C65.2291 34.0161 65.4275 33.6452 65.7785 33.5389C66.8004 33.2293 67.7795 32.8211 68.7049 32.3255C69.0283 32.1523 69.4308 32.274 69.6041 32.5974ZM58.7737 34.7508C58.8092 34.3857 59.134 34.1185 59.4991 34.154C60.0206 34.2048 60.5496 34.2307 61.0848 34.2307C61.62 34.2307 62.1489 34.2048 62.6704 34.154C63.0356 34.1185 63.3604 34.3857 63.3959 34.7508C63.4314 35.1159 63.1642 35.4407 62.7991 35.4762C62.2349 35.5311 61.663 35.5592 61.0848 35.5592C60.5065 35.5592 59.9347 35.5311 59.3704 35.4762C59.0053 35.4407 58.7381 35.1159 58.7737 34.7508Z"
        fill="#FF9100"
      />
    </svg>
  )
}

export const RandomQuizIcon = ({ ...props }) => {
  return (
    <svg
      width="76"
      height="46"
      viewBox="0 0 76 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.08596 15.5H0V8.5H9.08596C13.9395 8.5 18.5468 10.6369 21.6819 14.342L32.5078 27.1364C34.3129 29.2697 36.9656 30.5 39.76 30.5H49V37.5H39.76C34.9065 37.5 30.2992 35.3631 27.1641 31.658L16.3382 18.8636C14.5331 16.7303 11.8804 15.5 9.08596 15.5Z"
        fill="#95B0F8"
      />
      <path
        d="M57.6271 32.356C58.7751 33.1514 58.7751 34.8486 57.6271 35.644L48.139 42.2175C46.8126 43.1365 45 42.1872 45 40.5736L45 27.4264C45 25.8128 46.8126 24.8635 48.139 25.7825L57.6271 32.356Z"
        fill="#95B0F8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.10924 31.5H0V38.5H8.10924C12.8609 38.5 17.382 36.4515 20.5149 32.8789L32.4784 19.2364C34.2822 17.1795 36.8852 16 39.621 16H49.5V9.00004H39.621C34.8693 9.00004 30.3483 11.0485 27.2154 14.6211L15.2519 28.2636C13.4481 30.3206 10.8451 31.5 8.10924 31.5Z"
        fill="#D7E2FF"
      />
      <path
        d="M57.6271 13.644C58.7751 12.8486 58.7751 11.1514 57.6271 10.356L48.139 3.78245C46.8126 2.86349 45 3.8128 45 5.42644L45 18.5736C45 20.1872 46.8126 21.1365 48.139 20.2175L57.6271 13.644Z"
        fill="#D7E2FF"
      />
      <path
        d="M65.0757 14.0575C65.5412 10.8056 66.5227 9.91339 68.2 9.16207C69.4975 8.56294 70.5098 7.93673 70.6913 6.76473C70.8459 5.58887 70.0269 4.67296 68.8645 4.52033C67.7195 4.34264 66.5646 5.00351 66.3425 6.36248L62.0516 5.7482C62.6716 1.80235 65.8566 0.426905 69.4053 0.934941C73.3184 1.49513 75.8681 3.78794 75.391 7.2172C75.051 9.49566 73.6511 10.7136 71.6885 11.5342C70.1095 12.1757 69.3016 12.9137 69.0427 14.6255L68.9887 15.0033L65.0216 14.4354L65.0757 14.0575ZM64.1029 18.1594C64.2652 16.8332 65.5397 15.9141 66.8756 16.1053C68.1709 16.2908 69.1633 17.5344 68.9875 18.8587C68.7789 20.2196 67.4755 21.1484 66.1801 20.9629C64.8443 20.7717 63.8808 19.5184 64.1029 18.1594Z"
        fill="#FF9100"
      />
    </svg>
  )
}

export const Note = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="4" y="1" width="25" height="29" rx="2.12499" fill="#FEC473" />
      <path
        d="M4 3.12498C4 1.95139 4.95139 1 6.12499 1H8V30H6.12499C4.95139 30 4 29.0486 4 27.875V3.12498Z"
        fill="#FDA53A"
      />
      <rect x="10" y="5" width="16" height="5" rx="0.708328" fill="#FFDEA9" />
      <path
        d="M25.4019 14.9282L21.5 12.0303L17.5981 14.9282C17.3397 15.1187 17 14.9082 17 14.5539V1.00097C18.125 1.00057 17.4761 1 18.0626 1H24.9374C25.5239 1 25.4375 1.00059 26 1.00057V14.5505C26 14.9048 25.6603 15.1187 25.4019 14.9249V14.9282Z"
        fill="#7A9EFF"
      />
    </svg>
  )
}

export const Graph = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.2441 8.05725C11.2441 7.22579 11.9182 6.55176 12.7496 6.55176H19.252C20.0835 6.55176 20.7575 7.22579 20.7575 8.05725V31.6325H11.2441V8.05725Z"
        fill="#A0C2FF"
      />
      <path
        d="M0 15.8405C0 15.009 0.674031 14.335 1.50549 14.335H8.00789C8.83935 14.335 9.51338 15.009 9.51338 15.8405V31.632H0V15.8405Z"
        fill="#7A9EFF"
      />
      <path
        d="M22.4868 19.2994C22.4868 18.468 23.1608 17.7939 23.9923 17.7939H30.4947C31.3262 17.7939 32.0002 18.468 32.0002 19.2994V31.6316H22.4868V19.2994Z"
        fill="#A0C2FF"
      />
      <ellipse cx="22.8087" cy="6.15539" rx="5.78722" ry="5.78722" fill="#FB8320" />
      <path
        d="M20.4253 6.21448L22.1819 7.85679L25.1912 4.79297"
        stroke="#F5F7F9"
        strokeWidth="1.18519"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const Calendar = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="3.30664" width="31.6585" height="28.3511" rx="3.45277" fill="#EAECEF" />
      <path
        d="M0 6.7594C0 4.85249 1.54586 3.30664 3.45277 3.30664H28.2057C30.1126 3.30664 31.6585 4.8525 31.6585 6.75941V10.3944H0V6.7594Z"
        fill="#FB8320"
      />
      <rect
        x="9.45068"
        width="6.14378"
        height="3.30817"
        rx="1.15092"
        transform="rotate(90 9.45068 0)"
        fill="#63686C"
      />
      <rect
        x="25.5166"
        width="6.14378"
        height="3.30817"
        rx="1.15092"
        transform="rotate(90 25.5166 0)"
        fill="#63686C"
      />
      <rect x="4.25049" y="13.5029" width="6.14374" height="6.14378" fill="#D2D6DB" />
      <rect x="12.7588" y="13.5029" width="6.14374" height="6.14378" fill="#D2D6DB" />
      <rect x="4.25049" y="22.2061" width="6.14374" height="6.14378" fill="#D2D6DB" />
      <rect x="12.7588" y="22.2061" width="6.14374" height="6.14378" fill="#D2D6DB" />
      <rect x="21.2612" y="13.5029" width="6.14374" height="6.14378" fill="#D2D6DB" />
      <rect x="21.2612" y="22.1738" width="6.14374" height="6.14378" rx="3.07187" fill="#A0C2FF" />
    </svg>
  )
}

export const Kakao = ({ ...props }) => {
  const clipId = useId()

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="9.58333" fill="#FFE45F" stroke="#FFE45F" strokeWidth="0.833333" />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M9.99989 5.8157C7.10077 5.8157 4.75 7.62162 4.75 9.85066C4.75 11.2824 5.72365 12.5395 7.18585 13.2571L6.69117 15.0537C6.67224 15.1088 6.68795 15.1672 6.72904 15.207C6.75732 15.2347 6.79508 15.25 6.83606 15.25C6.86768 15.25 6.89909 15.2378 6.92749 15.2163L9.05453 13.8181C9.36345 13.861 9.67861 13.8855 9.99989 13.8855C12.899 13.8855 15.25 12.0797 15.25 9.85066C15.25 7.62162 12.899 5.8157 9.99989 5.8157Z"
          fill="#3C1E1E"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect
            width="11.6667"
            height="11.6667"
            fill="white"
            transform="translate(4.1665 4.16602)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Google = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="9.58333" fill="#F5F7F9" stroke="#EAECEF" strokeWidth="0.833333" />
      <path
        d="M15.1069 8.98027H14.6873V8.95866H9.99984V11.042H12.9433C12.5139 12.2548 11.36 13.1253 9.99984 13.1253C8.27406 13.1253 6.87484 11.7261 6.87484 10.0003C6.87484 8.27454 8.27406 6.87533 9.99984 6.87533C10.7965 6.87533 11.5212 7.17585 12.073 7.66673L13.5462 6.19355C12.616 5.32663 11.3717 4.79199 9.99984 4.79199C7.12354 4.79199 4.7915 7.12402 4.7915 10.0003C4.7915 12.8766 7.12354 15.2087 9.99984 15.2087C12.8761 15.2087 15.2082 12.8766 15.2082 10.0003C15.2082 9.65111 15.1722 9.31022 15.1069 8.98027Z"
        fill="#FFC107"
      />
      <path
        d="M5.39209 7.57611L7.10329 8.83105C7.56631 7.6847 8.68766 6.87533 9.9999 6.87533C10.7965 6.87533 11.5213 7.17585 12.0731 7.66673L13.5463 6.19355C12.616 5.32663 11.3718 4.79199 9.9999 4.79199C7.99938 4.79199 6.26449 5.92142 5.39209 7.57611Z"
        fill="#FF3D00"
      />
      <path
        d="M9.99951 15.2083C11.3448 15.2083 12.5672 14.6934 13.4914 13.8562L11.8795 12.4921C11.339 12.9032 10.6785 13.1255 9.99951 13.1249C8.64482 13.1249 7.49456 12.2611 7.06123 11.0557L5.36279 12.3643C6.22477 14.051 7.97529 15.2083 9.99951 15.2083Z"
        fill="#4CAF50"
      />
      <path
        d="M15.107 8.97962H14.6875V8.95801H10V11.0413H12.9435C12.7381 11.6185 12.3681 12.1229 11.8792 12.4921L11.8799 12.4916L13.4919 13.8557C13.3779 13.9593 15.2083 12.6038 15.2083 9.99967C15.2083 9.65046 15.1724 9.30957 15.107 8.97962Z"
        fill="#1976D2"
      />
    </svg>
  )
}
