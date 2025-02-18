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

export const AddBookMark = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.61043 4.32861H4.20906C3.3988 4.32861 2.74194 4.98547 2.74194 5.79574L2.74194 18.9998L8.61043 15.4215L14.4789 18.9998V10.1971"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14.479 0.807617V7.8498" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 4.32861L10.9578 4.32861" stroke="currentColor" strokeWidth="1.5" />
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

export const Directory = ({ ...props }) => {
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

export const DirectoryFill = ({ ...props }) => {
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

// document
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
export const WriteDocument = ({ ...props }) => {
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

export const CheckRound = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.3584 6.5L7.85857 12L17.7499 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export const Timer = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="9.83337" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 6.5L8 9.83333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <path
        d="M13.8379 3.95782L12.5118 5.28394"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10 1.83337L6 1.83337"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        d="M14.666 4.57849L13.2543 3.16671"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}

// 픽토스 로고
export const Logo = ({ ...props }) => {
  const clipId = useId()

  return (
    <svg
      width="108"
      height="36"
      viewBox="0 0 108 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M14.3696 11.6592C13.5398 11.1185 12.5316 10.8434 11.3593 10.8434C10.5633 10.8434 9.85899 10.9544 9.24149 11.1813C8.624 11.4082 8.07886 11.7027 7.60127 12.0647C7.12367 12.4268 6.69432 12.8323 6.31321 13.286L6.44829 11.1668H3.95418L0.504883 30.8287H3.21608L4.65369 22.7381C4.87078 23.1918 5.18435 23.5973 5.58958 23.9594C5.99481 24.3214 6.48688 24.6159 7.06578 24.8428C7.64469 25.0697 8.27666 25.1807 8.96651 25.1807C10.052 25.1807 11.0554 24.978 11.9768 24.5676C12.8982 24.1621 13.7087 23.5925 14.4034 22.8587C15.0981 22.125 15.6577 21.2657 16.0725 20.2809C16.4874 19.2961 16.7142 18.2196 16.7528 17.0611C16.8251 15.8832 16.6515 14.826 16.2366 13.8846C15.8217 12.9433 15.1945 12.1999 14.3648 11.6592H14.3696ZM13.2311 20.1988C12.7776 21.0243 12.1842 21.6664 11.4558 22.125C10.7273 22.5836 9.89758 22.8153 8.97134 22.8153C8.22841 22.8153 7.58197 22.6415 7.03201 22.2988C6.48206 21.956 6.06235 21.4781 5.78255 20.8747C5.50274 20.2664 5.38696 19.5472 5.44485 18.7168C5.47862 17.65 5.72466 16.7087 6.17813 15.8928C6.63161 15.077 7.2298 14.4253 7.98238 13.9377C8.73013 13.4502 9.56954 13.204 10.491 13.204C11.2484 13.204 11.8948 13.3874 12.4158 13.7446C12.9416 14.1067 13.3421 14.5991 13.6219 15.2266C13.9017 15.8494 14.0223 16.5687 13.9885 17.3845C13.9354 18.432 13.6797 19.3734 13.2311 20.194V20.1988Z"
          fill="currentColor"
        />
        <path
          d="M20.3369 5.1712C19.8111 5.1712 19.3817 5.33051 19.0488 5.64429C18.716 5.96289 18.5471 6.36357 18.5471 6.85113C18.5471 7.3387 18.716 7.77316 19.0488 8.10142C19.3817 8.42486 19.8111 8.58899 20.3369 8.58899C20.8627 8.58899 21.268 8.42486 21.6105 8.10142C21.953 7.77799 22.1267 7.35801 22.1267 6.85113C22.1267 6.34426 21.953 5.95807 21.6105 5.64429C21.268 5.32568 20.8434 5.1712 20.3369 5.1712Z"
          fill="currentColor"
        />
        <path d="M21.6926 11.1714H18.9814V24.857H21.6926V11.1714Z" fill="currentColor" />
        <path
          d="M28.7745 13.7254C29.3872 13.3634 30.0577 13.1848 30.7813 13.1848C31.669 13.1848 32.4312 13.402 33.0728 13.8365C33.7145 14.2709 34.1245 14.8792 34.3078 15.6564H37.13C36.8212 14.1889 36.1121 13.0206 34.9977 12.1517C33.8833 11.2828 32.4891 10.8483 30.8055 10.8483C29.5029 10.8483 28.3307 11.1525 27.2935 11.7559C26.2514 12.3641 25.4458 13.2041 24.8669 14.2806C24.288 15.3571 23.9985 16.6219 23.9985 18.0701C23.9985 19.5183 24.288 20.6769 24.8669 21.763C25.4458 22.8492 26.2563 23.6892 27.2935 24.2878C28.3355 24.8864 29.5029 25.1856 30.8055 25.1856C32.4698 25.1856 33.864 24.7415 34.9832 23.8533C36.1024 22.9651 36.8212 21.8065 37.1252 20.3776H34.303C34.1776 20.9038 33.9508 21.3527 33.6228 21.7196C33.2996 22.0913 32.8847 22.3761 32.3878 22.574C31.8909 22.772 31.3506 22.8733 30.7717 22.8733C30.2314 22.8733 29.7104 22.7623 29.2135 22.5451C28.7166 22.3278 28.2872 22.0189 27.9254 21.623C27.5636 21.2272 27.279 20.7203 27.0715 20.1024C26.8641 19.4893 26.758 18.7894 26.758 18.0122C26.758 16.9453 26.9365 16.0522 27.2983 15.3378C27.6601 14.6233 28.1473 14.0827 28.7648 13.7206L28.7745 13.7254Z"
          fill="currentColor"
        />
        <path
          d="M50.5074 11.1719H47.2511L41.9348 16.9213V5.30661H39.2236V24.8575H41.9348V17.8481L47.8252 24.8575H51.2407L44.6557 17.4282L50.5074 11.1719Z"
          fill="currentColor"
        />
        <path
          d="M56.557 7.72477H54.198L53.8458 11.1715H51.4868V13.45H53.8458V20.5077C53.8458 21.5938 54.0195 22.4531 54.362 23.0855C54.7046 23.7179 55.1918 24.1717 55.8286 24.442C56.4654 24.7123 57.2131 24.8475 58.0815 24.8475H60.3054V22.54H58.7327C57.9368 22.54 57.3772 22.4 57.0491 22.12C56.7259 21.84 56.5619 21.309 56.5619 20.5318V13.4452H60.4164V11.1667H56.5619V7.71994L56.557 7.72477Z"
          fill="currentColor"
        />
        <path
          d="M71.7242 11.7413C70.7112 11.1427 69.5534 10.8434 68.2508 10.8434C66.9483 10.8434 65.8098 11.1427 64.7774 11.7413C63.745 12.3399 62.9346 13.175 62.3508 14.2515C61.7623 15.328 61.468 16.5928 61.468 18.041C61.468 19.4892 61.7575 20.6961 62.3364 21.7726C62.9153 22.8491 63.7209 23.6842 64.7485 24.2828C65.7808 24.8814 66.9483 25.1807 68.246 25.1807C69.5437 25.1807 70.6822 24.8814 71.7049 24.2828C72.7277 23.6842 73.5381 22.8491 74.1315 21.7726C74.7297 20.6961 75.0288 19.4409 75.0288 18.012C75.0288 16.5831 74.7297 15.3087 74.1315 14.237C73.5333 13.1702 72.7277 12.335 71.7146 11.7413H71.7242ZM71.7001 20.6719C71.319 21.396 70.8269 21.9367 70.2191 22.2988C69.6112 22.6608 68.9503 22.8394 68.2267 22.8394C67.5031 22.8394 66.8422 22.6608 66.244 22.2988C65.6458 21.9367 65.1633 21.396 64.7919 20.6719C64.4204 19.9478 64.2371 19.0596 64.2371 18.012C64.2371 16.9645 64.4204 16.0521 64.7919 15.3377C65.1633 14.6232 65.6554 14.0826 66.2681 13.7205C66.8808 13.3584 67.5513 13.1798 68.2749 13.1798C68.9986 13.1798 69.6595 13.3633 70.2577 13.7205C70.8559 14.0826 71.3383 14.6232 71.7098 15.3377C72.0812 16.0521 72.2646 16.9452 72.2646 18.012C72.2646 19.0789 72.0764 19.9478 71.6953 20.6719H71.7001Z"
          fill="currentColor"
        />
        <path
          d="M85.2903 17.4037C84.5329 17.1237 83.6694 16.892 82.7142 16.7134C82.0436 16.5879 81.484 16.4334 81.0306 16.2499C80.5771 16.0713 80.2298 15.8541 79.9837 15.5983C79.7377 15.3472 79.6171 15.0576 79.6171 14.7293C79.6171 14.2418 79.8245 13.8363 80.2394 13.5225C80.6543 13.2039 81.2525 13.0494 82.0292 13.0494C82.8059 13.0494 83.4523 13.2232 83.9154 13.5659C84.3786 13.9087 84.6535 14.3914 84.7404 15.0045H87.3744C87.1911 13.6673 86.6411 12.6391 85.7197 11.9246C84.7983 11.2102 83.5777 10.8529 82.0581 10.8529C81.0113 10.8529 80.0947 11.0315 79.318 11.3839C78.5413 11.7363 77.9479 12.2239 77.5427 12.8515C77.1374 13.4742 76.93 14.179 76.93 14.9562C76.93 15.6079 77.0651 16.1486 77.3352 16.583C77.6054 17.0175 77.972 17.3844 78.4351 17.6837C78.8983 17.983 79.4241 18.2243 80.0223 18.403C80.6205 18.5864 81.2139 18.736 81.8121 18.8664C82.4971 18.9774 83.0857 19.1126 83.5777 19.2719C84.0698 19.4312 84.4316 19.6484 84.6777 19.9091C84.9237 20.1698 85.0443 20.556 85.0443 21.0628C85.0443 21.4056 84.9478 21.729 84.7597 22.0283C84.5715 22.3276 84.2821 22.5642 83.8913 22.7331C83.5006 22.9069 83.0181 22.989 82.4392 22.989C81.788 22.989 81.2332 22.8828 80.7701 22.6655C80.3069 22.4483 79.9451 22.1587 79.6846 21.7966C79.4241 21.4346 79.2456 21.0387 79.154 20.6042H76.4138C76.52 21.5263 76.8239 22.3276 77.3208 23.0083C77.8177 23.6889 78.4979 24.22 79.3566 24.611C80.2153 25.002 81.2428 25.1951 82.4344 25.1951C83.5199 25.1951 84.4654 25.0116 85.271 24.6544C86.0767 24.2924 86.699 23.7903 87.1428 23.1483C87.5866 22.5062 87.8086 21.7483 87.8086 20.8794C87.8086 19.9043 87.577 19.1512 87.1187 18.625C86.6556 18.0988 86.0477 17.6982 85.2855 17.4182L85.2903 17.4037Z"
          fill="currentColor"
        />
        <path
          d="M99.9023 18.6105C99.4392 18.0844 98.8314 17.6837 98.0691 17.4037C97.3117 17.1237 96.4482 16.892 95.493 16.7134C94.8225 16.5879 94.2629 16.4334 93.8094 16.2499C93.3559 16.0713 93.0086 15.8541 92.7625 15.5983C92.5165 15.3472 92.3959 15.0576 92.3959 14.7293C92.3959 14.2418 92.6033 13.8363 93.0182 13.5225C93.4331 13.2039 94.0313 13.0494 94.808 13.0494C95.5847 13.0494 96.2311 13.2232 96.6942 13.5659C97.1574 13.9087 97.4324 14.3914 97.5192 15.0045H100.153C99.9699 13.6673 99.4199 12.6391 98.4985 11.9246C97.5771 11.2102 96.3565 10.8529 94.8369 10.8529C93.7901 10.8529 92.8735 11.0315 92.0968 11.3839C91.3201 11.7363 90.7267 12.2239 90.3215 12.8515C89.9163 13.4742 89.7088 14.179 89.7088 14.9562C89.7088 15.6079 89.8439 16.1486 90.114 16.583C90.3842 17.0175 90.7508 17.3844 91.214 17.6837C91.6771 17.983 92.2029 18.2243 92.8011 18.403C93.3993 18.5864 93.9927 18.736 94.5909 18.8664C95.2759 18.9774 95.8645 19.1126 96.3566 19.2719C96.8486 19.4312 97.2104 19.6484 97.4565 19.9091C97.7025 20.1698 97.8231 20.556 97.8231 21.0628C97.8231 21.4056 97.7266 21.729 97.5385 22.0283C97.3503 22.3276 97.0609 22.5642 96.6701 22.7331C96.2794 22.9069 95.7969 22.989 95.218 22.989C94.5668 22.989 94.012 22.8828 93.5489 22.6655C93.0857 22.4483 92.7239 22.1587 92.4634 21.7966C92.2029 21.4346 92.0244 21.0387 91.9328 20.6042H89.1926C89.2988 21.5263 89.6027 22.3276 90.0996 23.0083C90.5965 23.6889 91.2767 24.22 92.1354 24.611C92.9941 25.002 94.0216 25.1951 95.2132 25.1951C96.2987 25.1951 97.2442 25.0116 98.0498 24.6544C98.8555 24.2924 99.4778 23.7903 99.9216 23.1483C100.365 22.5062 100.587 21.7483 100.587 20.8794C100.587 19.9043 100.356 19.1512 99.8975 18.625L99.9023 18.6105Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="107.1" height="25.5" fill="white" transform="translate(0.384033 5.25003)" />
        </clipPath>
      </defs>
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

export const MyCollection = ({ ...props }) => {
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
  const { fill, ...rest } = props

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
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
      <ellipse
        cx="22.8087"
        cy="6.15539"
        rx="5.78722"
        ry="5.78722"
        fill={(fill as string) ?? '#FB8320'}
      />
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
        d="M9.99982 2.82691C5.02989 2.82691 1 5.92277 1 9.74398C1 12.1985 2.66912 14.3535 5.17575 15.5835L4.32773 18.6634C4.29528 18.758 4.32219 18.8581 4.39263 18.9263C4.44113 18.9738 4.50585 19 4.5761 19C4.63032 19 4.68416 18.979 4.73284 18.9422L8.37919 16.5453C8.90877 16.6189 9.44904 16.6609 9.99982 16.6609C14.9697 16.6609 19 13.5652 19 9.74398C19 5.92277 14.9697 2.82691 9.99982 2.82691Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const KakaoWithBackground = ({ ...props }) => {
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
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.6706 8.36775H17.9993V8.33317H10.4993V11.6665H15.2089C14.5219 13.6069 12.6756 14.9998 10.4993 14.9998C7.7381 14.9998 5.49935 12.7611 5.49935 9.99984C5.49935 7.23859 7.7381 4.99984 10.4993 4.99984C11.7739 4.99984 12.9335 5.48067 13.8164 6.26609L16.1735 3.909C14.6852 2.52192 12.6943 1.6665 10.4993 1.6665C5.89727 1.6665 2.16602 5.39775 2.16602 9.99984C2.16602 14.6019 5.89727 18.3332 10.4993 18.3332C15.1014 18.3332 18.8327 14.6019 18.8327 9.99984C18.8327 9.44109 18.7752 8.89567 18.6706 8.36775Z"
        fill="#FFC107"
      />
      <path
        d="M3.12695 6.12109L5.86487 8.129C6.6057 6.29484 8.39987 4.99984 10.4995 4.99984C11.774 4.99984 12.9336 5.48067 13.8165 6.26609L16.1736 3.909C14.6853 2.52192 12.6945 1.6665 10.4995 1.6665C7.29862 1.6665 4.52279 3.47359 3.12695 6.12109Z"
        fill="#FF3D00"
      />
      <path
        d="M10.5008 18.3331C12.6533 18.3331 14.6091 17.5094 16.0879 16.1698L13.5087 13.9873C12.6439 14.645 11.5872 15.0007 10.5008 14.9998C8.33328 14.9998 6.49286 13.6177 5.79953 11.689L3.08203 13.7827C4.4612 16.4815 7.26203 18.3331 10.5008 18.3331Z"
        fill="#4CAF50"
      />
      <path
        d="M18.6713 8.36808H18V8.3335H10.5V11.6668H15.2096C14.8809 12.5903 14.2889 13.3973 13.5067 13.9881L13.5079 13.9872L16.0871 16.1697C15.9046 16.3356 18.8333 14.1668 18.8333 10.0002C18.8333 9.44141 18.7758 8.896 18.6713 8.36808Z"
        fill="#1976D2"
      />
    </svg>
  )
}

export const GoogleWithBackground = ({ ...props }) => {
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

export const TodayQuiz = ({ ...props }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M86.9591 2.40938C86.9591 2.40938 86.8466 2.42749 86.7957 2.44931C63.4941 8.36246 38.6785 16.5974 20.3264 32.882C12.5295 39.8136 6.32784 48.8435 5.68387 59.5629C4.67659 76.3297 17.3956 90.7373 34.09 91.7402C40.9627 92.1531 47.8557 90.1668 53.4714 86.1512C58.8675 82.2841 62.544 76.5352 65.5392 70.5836C70.1675 61.3597 83.0344 36.2014 83.0344 36.2014C83.4821 35.3453 82.6365 34.3741 81.7358 34.7305C77.4714 35.6309 67.9086 38.5637 64.2506 40.707C63.75 41.0003 63.1476 40.5163 63.3168 39.9668C64.9407 34.5797 68.6491 29.3301 71.571 24.8044C76.4465 17.2371 81.9387 10.3287 88.1365 3.83576C88.3343 3.63621 88.5342 3.39948 88.5514 3.11445C88.5923 2.43287 87.659 2.30218 86.9584 2.42177L86.9591 2.40938Z"
        fill="url(#paint0_linear_8507_5425)"
      />
      <path
        d="M57.4514 69.6894C53.4611 81.314 40.8061 87.4934 29.1856 83.4916C17.5651 79.4899 11.3796 66.8222 15.3699 55.1977C23.2707 38.9777 30.8481 62.3192 42.4686 66.321C54.0891 70.3227 61.4417 58.0649 57.4514 69.6894Z"
        fill="#FFC773"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8507_5425"
          x1="48.9961"
          y1="0.0691329"
          x2="43.4552"
          y2="92.3028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB7E20" />
          <stop offset="1" stopColor="#FDA53A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const CorrectCheckRound = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#3ACC83" />
      <path
        d="M9.77734 15.3017L14.6469 20.4446L22.2218 12.4446"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const WrongXRound = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#F4502C" />
      <path
        d="M10.668 10.666L21.3346 21.3327"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
      <path
        d="M21.332 10.666L10.6654 21.3327"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const PicktossColor = ({ ...props }) => {
  const fillId = useId()

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36.6537 1.1308C36.6537 1.1308 36.6067 1.13838 36.5854 1.1475C26.8431 3.61975 16.4679 7.06275 8.79495 13.8712C5.53511 16.7693 2.94223 20.5446 2.67299 25.0264C2.25185 32.0365 7.56959 38.0602 14.5494 38.4795C17.4229 38.6521 20.3048 37.8217 22.6527 36.1428C24.9088 34.526 26.4459 32.1224 27.6982 29.6341C29.6332 25.7776 35.0128 15.2591 35.0128 15.2591C35.2 14.9011 34.8464 14.4951 34.4699 14.6441C32.687 15.0205 28.6888 16.2467 27.1594 17.1428C26.9501 17.2654 26.6982 17.0631 26.769 16.8334C27.4479 14.581 28.9984 12.3862 30.22 10.4941C32.2584 7.3302 34.5547 4.44182 37.146 1.72716C37.2287 1.64373 37.3123 1.54476 37.3194 1.42559C37.3365 1.14063 36.9463 1.08599 36.6534 1.13599L36.6537 1.1308Z"
        fill={`url(#${fillId})`}
      />
      <defs>
        <radialGradient
          id={fillId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.62865 35) rotate(-68.4287) scale(22.4771 19.2985)"
        >
          <stop stopColor="#C7D6FF" />
          <stop offset="1" stopColor="#FB7E20" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const TodayQuizDecoration = ({ ...props }) => {
  return (
    <svg
      width="91"
      height="65"
      viewBox="0 0 91 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.9501 8.79196C51.9153 8.79196 49.4551 11.2522 49.4551 14.2869V20.8809C49.4551 23.9157 51.9153 26.3759 54.9501 26.3759H69.1617L74.643 30.9437C75.1701 31.3829 75.9702 31.0081 75.9702 30.3221L75.9702 26.2358C78.4087 25.6742 80.227 23.4899 80.227 20.8809V14.2869C80.227 11.2521 77.7668 8.79196 74.732 8.79196H54.9501Z"
        fill="#FDA53A"
      />
      <path
        d="M53.8511 14.2869L75.6987 14.2869"
        stroke="#F5F7F9"
        strokeWidth="1.61834"
        strokeLinecap="round"
      />
      <path
        d="M53.8511 17.5839L75.6987 17.5839"
        stroke="#F5F7F9"
        strokeWidth="1.61834"
        strokeLinecap="round"
      />
      <path
        d="M53.8511 20.8809L63.5611 20.8809"
        stroke="#F5F7F9"
        strokeWidth="1.61834"
        strokeLinecap="round"
      />
      <path
        d="M86.6489 9.88124C86.8642 9.4964 87.3543 9.4964 87.5695 9.88124L88.4022 11.37C88.4372 11.4326 88.4816 11.4876 88.5334 11.5323L89.8109 12.6364C90.1014 12.8875 90.1014 13.388 89.8109 13.6391L88.5334 14.7432C88.4816 14.7879 88.4372 14.8429 88.4022 14.9055L87.5695 16.3942C87.3543 16.7791 86.8642 16.7791 86.6489 16.3942L85.8163 14.9055C85.7813 14.8429 85.7368 14.7879 85.685 14.7432L84.4076 13.6391C84.1171 13.388 84.1171 12.8875 84.4076 12.6364L85.685 11.5323C85.7368 11.4876 85.7813 11.4326 85.8163 11.37L86.6489 9.88124Z"
        fill="#FEC473"
      />
      <path
        d="M41.8475 20.7251C42.0474 20.3403 42.5025 20.3403 42.7024 20.7251L43.4755 22.2138C43.5081 22.2764 43.5493 22.3314 43.5974 22.3762L44.7836 23.4803C45.0534 23.7314 45.0534 24.2318 44.7836 24.4829L43.5974 25.587C43.5493 25.6318 43.5081 25.6867 43.4755 25.7494L42.7024 27.2381C42.5025 27.6229 42.0474 27.6229 41.8475 27.2381L41.0744 25.7494C41.0418 25.6867 41.0006 25.6318 40.9525 25.587L39.7663 24.4829C39.4965 24.2318 39.4965 23.7314 39.7663 23.4803L40.9525 22.3762C41.0006 22.3314 41.0418 22.2764 41.0744 22.2138L41.8475 20.7251Z"
        fill="#FEC473"
      />
      <path
        d="M81.865 0.390499C82.1725 -0.130167 82.8726 -0.130166 83.1801 0.390499L84.3696 2.40468C84.4196 2.48938 84.4831 2.56375 84.5571 2.62431L86.382 4.11809C86.797 4.4578 86.797 5.1349 86.382 5.47461L84.5571 6.9684C84.4831 7.02895 84.4196 7.10332 84.3696 7.18803L83.1801 9.2022C82.8726 9.72287 82.1725 9.72287 81.865 9.2022L80.6755 7.18803C80.6255 7.10332 80.562 7.02895 80.488 6.9684L78.6631 5.47461C78.2481 5.1349 78.2481 4.4578 78.6631 4.11809L80.488 2.62431C80.562 2.56375 80.6255 2.48938 80.6755 2.40468L81.865 0.390499Z"
        fill="#FEC473"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3818 31.8709C6.43903 31.8709 0.000167847 38.3097 0.000167847 46.2525C0.000167847 54.1952 6.43901 60.6341 14.3817 60.6341H30.4281L35.1698 64.6984C35.5503 65.0246 36.1382 64.7542 36.1382 64.253L36.1382 59.8276C41.7417 57.8629 45.7598 52.5269 45.7598 46.2525C45.7598 38.3097 39.3209 31.8709 31.3782 31.8709H14.3818Z"
        fill="#7A9EFF"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 34.0264 43.6042)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 24.6396 43.6042)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 15.2532 43.6042)"
        fill="#F5F7F9"
      />
    </svg>
  )
}

export const ExitDoor = ({ ...props }) => {
  return (
    <svg
      width="97"
      height="103"
      viewBox="0 0 97 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="36.248" y="13.6726" width="30.8113" height="83.3718" rx="3.62486" fill="#FFE1AC" />
      <path
        d="M0 17.1184C0 15.2714 1.38881 13.7197 3.22456 13.5157L46.7229 8.68259C48.8702 8.44401 50.7481 10.1248 50.7481 12.2853V98.3675C50.7481 100.551 48.8324 102.239 46.6666 101.964L3.16823 96.4399C1.35736 96.21 0 94.6693 0 92.8439V17.1184Z"
        fill="#FFAB40"
      />
      <rect x="36.248" y="44.4836" width="7.24973" height="19.9367" rx="1.81243" fill="#FFD180" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M92.37 0C94.6358 0 96.4727 1.83683 96.4727 4.10267V17.4364C96.4727 19.7022 94.6358 21.539 92.37 21.539H70.2175L63.2839 27.3171C62.6158 27.8738 61.6016 27.3988 61.6016 26.5292L61.6016 21.539H60.5742C58.3084 21.539 56.4716 19.7022 56.4716 17.4364V4.10267C56.4716 1.83683 58.3084 0 60.5742 0H92.37Z"
        fill="#95B0F8"
      />
      <path
        d="M90.3184 6.1543L62.6253 6.1543"
        stroke="#BCCFFF"
        strokeWidth="2.05134"
        strokeLinecap="round"
      />
      <path
        d="M90.3184 10.2571L62.6253 10.2571"
        stroke="#BCCFFF"
        strokeWidth="2.05134"
        strokeLinecap="round"
      />
      <path
        d="M74.6621 14.3591L62.3541 14.3591"
        stroke="#BCCFFF"
        strokeWidth="2.05134"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 알림 유형 표시 아이콘 */
export const NotiTodayQuiz = ({ ...props }) => {
  const paintId = useId()

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#4D7BF9" />
      <path
        d="M25.7971 7.0106C25.7971 7.0106 25.773 7.01447 25.7621 7.01915C20.7719 8.28549 15.4575 10.0491 11.5273 13.5365C9.85752 15.021 8.52939 16.9548 8.39148 19.2504C8.17576 22.8411 10.8996 25.9266 14.4748 26.1414C15.9467 26.2298 17.4229 25.8044 18.6255 24.9445C19.7811 24.1163 20.5685 22.8851 21.2099 21.6106C22.2011 19.6352 24.9566 14.2474 24.9566 14.2474C25.0525 14.064 24.8714 13.8561 24.6785 13.9324C23.7653 14.1252 21.7173 14.7533 20.9339 15.2123C20.8267 15.2751 20.6977 15.1715 20.734 15.0538C21.0817 13.9001 21.8759 12.7759 22.5016 11.8066C23.5458 10.1861 24.722 8.70657 26.0493 7.31606C26.0916 7.27333 26.1344 7.22263 26.1381 7.16159C26.1469 7.01563 25.947 6.98764 25.797 7.01325L25.7971 7.0106Z"
        fill={`url(#${paintId})`}
      />
      <path
        d="M12.6847 4.20354C12.8321 3.93215 13.1679 3.93215 13.3153 4.20354L13.8857 5.25339C13.9097 5.29754 13.9402 5.3363 13.9756 5.36787L14.8507 6.14647C15.0498 6.32354 15.0498 6.67646 14.8507 6.85353L13.9756 7.63213C13.9402 7.6637 13.9097 7.70246 13.8857 7.74661L13.3153 8.79646C13.1679 9.06785 12.8321 9.06785 12.6847 8.79646L12.1143 7.74661C12.0903 7.70246 12.0598 7.6637 12.0244 7.63213L11.1493 6.85353C10.9502 6.67646 10.9502 6.32354 11.1493 6.14647L12.0244 5.36787C12.0598 5.3363 12.0903 5.29754 12.1143 5.25339L12.6847 4.20354Z"
        fill="#A0C2FF"
      />
      <path
        d="M8.10584 8.24425C8.29015 7.91858 8.70985 7.91858 8.89416 8.24425L9.60715 9.50407C9.63714 9.55705 9.67519 9.60356 9.71953 9.64144L10.8134 10.5758C11.0622 10.7882 11.0622 11.2118 10.8134 11.4242L9.71953 12.3586C9.67519 12.3964 9.63714 12.443 9.60715 12.4959L8.89416 13.7558C8.70985 14.0814 8.29015 14.0814 8.10584 13.7558L7.39285 12.4959C7.36286 12.443 7.32481 12.3964 7.28047 12.3586L6.18657 11.4242C5.93781 11.2118 5.93781 10.7882 6.18657 10.5758L7.28047 9.64144C7.32481 9.60356 7.36286 9.55705 7.39285 9.50407L8.10584 8.24425Z"
        fill="#A0C2FF"
      />
      <defs>
        <linearGradient
          id={paintId}
          x1="17.6671"
          y1="6.50942"
          x2="16.4805"
          y2="26.2619"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB7E20" />
          <stop offset="1" stopColor="#FFD188" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const NotiUpdateNews = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#FFF1D5" />
      <rect x="8.66602" y="17.3333" width="2.66667" height="7.33333" rx="0.823045" fill="#FFD180" />
      <circle cx="22.9993" cy="15" r="2.33333" fill="#FB7E20" />
      <path
        d="M10.666 11.6078L21.7034 7.88314C22.5036 7.61309 23.3327 8.20831 23.3327 9.0529V20.9471C23.3327 21.7917 22.5036 22.3869 21.7034 22.1168L10.666 18.3921V11.6078Z"
        fill="#FFD180"
      />
      <path
        d="M6 13.8025C6 12.4388 7.10547 11.3333 8.46914 11.3333H11.3333V18.6666H8.46914C7.10547 18.6666 6 17.5612 6 16.1975V13.8025Z"
        fill="#FFAB40"
      />
    </svg>
  )
}

export const NotiGeneral = ({ ...props }) => {
  const paintId = useId()

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#F5F7F9" />
      <path
        d="M24.4929 6.97307C24.4929 6.97307 24.4697 6.9768 24.4592 6.9813C19.6543 8.20062 14.5372 9.89871 10.7529 13.2567C9.14514 14.686 7.86632 16.548 7.73354 18.7584C7.52583 22.2158 10.1485 25.1867 13.591 25.3935C15.0082 25.4786 16.4296 25.0691 17.5875 24.241C18.7002 23.4436 19.4584 22.2581 20.076 21.0309C21.0303 19.1289 23.6836 13.9411 23.6836 13.9411C23.7759 13.7646 23.6015 13.5643 23.4158 13.6378C22.5364 13.8235 20.5646 14.4283 19.8103 14.8702C19.707 14.9307 19.5828 14.8309 19.6177 14.7176C19.9526 13.6067 20.7172 12.5242 21.3198 11.591C22.3251 10.0306 23.4576 8.60606 24.7356 7.26719C24.7764 7.22605 24.8177 7.17723 24.8212 7.11846C24.8296 6.97791 24.6372 6.95096 24.4927 6.97562L24.4929 6.97307Z"
        fill={`url(#${paintId})`}
      />
      <defs>
        <radialGradient
          id={paintId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(9.68447 23.6774) rotate(-68.4287) scale(11.0857 9.51803)"
        >
          <stop stopColor="#C7D6FF" />
          <stop offset="1" stopColor="#FF7B18" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const NotiReward = ({ ...props }) => {
  const clipId = useId()
  const paintId = useId()

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#7095F8" />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M17.37 6.84726L19.2792 10.7004C19.5004 11.1492 19.9311 11.4626 20.4278 11.5322L24.6925 12.1512C25.9459 12.333 26.4465 13.8689 25.5384 14.747L22.4535 17.7452C22.0926 18.0934 21.9296 18.6002 22.015 19.0915L22.7445 23.3277C22.9579 24.5695 21.6502 25.5212 20.5287 24.9332L16.7142 22.9331C16.268 22.701 15.7363 22.701 15.294 22.9331L11.4794 24.9332C10.358 25.5212 9.05027 24.5734 9.26369 23.3277L9.99323 19.0915C10.0786 18.5963 9.91562 18.0934 9.55473 17.7452L6.46975 14.747C5.56172 13.865 6.0623 12.333 7.31569 12.1512L11.5803 11.5322C12.077 11.4587 12.5078 11.1492 12.729 10.7004L14.6382 6.84726C15.197 5.71762 16.8151 5.71762 17.3778 6.84726H17.37Z"
          fill="#FFC95E"
        />
        <path
          d="M16.2136 11.35L13.6719 16.9093L15.8255 16.9248L15.2862 20.8862L17.9831 15.6017H15.8255L16.2136 11.35Z"
          fill={`url(#${paintId})`}
        />
      </g>
      <defs>
        <linearGradient
          id={paintId}
          x1="13.1286"
          y1="18.7353"
          x2="18.359"
          y2="13.485"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.12" stopColor="#FFB95E" />
          <stop offset="0.78" stopColor="#FF832A" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="20" height="19.1111" fill="white" transform="translate(6 6.00003)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const NotiCollection = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#C4DBFF" />
      <rect x="8.375" y="7.59375" width="14.8438" height="17.2188" rx="1.26171" fill="#FEC473" />
      <path
        d="M8.375 8.85546C8.375 8.15864 8.93989 7.59375 9.63671 7.59375H10.75V24.8125H9.63671C8.93989 24.8125 8.375 24.2476 8.375 23.5508V8.85546Z"
        fill="#FDA53A"
      />
      <path
        d="M21.0824 15.8636L18.7656 14.143L16.4489 15.8636C16.2954 15.9767 16.0938 15.8517 16.0938 15.6413V7.59432C16.7617 7.59409 16.3765 7.59375 16.7247 7.59375H20.8066C21.1548 7.59375 21.1035 7.5941 21.4375 7.59409V15.6394C21.4375 15.8497 21.2358 15.9767 21.0824 15.8616V15.8636Z"
        fill="#4D7BF9"
      />
    </svg>
  )
}

export const FocusBox = ({ ...props }) => {
  const { fill, ...rest } = props

  const color = fill ? (fill as string) : '#EFC364'

  return (
    <svg
      width="106"
      height="106"
      viewBox="0 0 106 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M3 24V13C3 7.47715 7.47715 3 13 3L24 3"
        stroke="url(#paint0_linear_11607_9257)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M103 82L103 93C103 98.5228 98.5228 103 93 103L82 103"
        stroke="url(#paint1_linear_11607_9257)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M103 24L103 13C103 7.47715 98.5228 3 93 3L82 3"
        stroke="url(#paint2_linear_11607_9257)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M3.00001 82L3 93C3 98.5228 7.47716 103 13 103L24 103"
        stroke="url(#paint3_linear_11607_9257)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11607_9257"
          x1="58.8511"
          y1="27.7333"
          x2="57.389"
          y2="-8.66178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="0.951624" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11607_9257"
          x1="47.1489"
          y1="79.15"
          x2="48.5085"
          y2="114.249"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="0.951624" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_11607_9257"
          x1="47.1489"
          y1="27.7333"
          x2="48.611"
          y2="-8.66178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="0.951624" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint3_linear_11607_9257"
          x1="58.8511"
          y1="79.15"
          x2="57.4914"
          y2="114.249"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="0.951624" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** 앱 시작화면 온보딩 일러스트 svg */
export const StartPicktoss = ({ ...props }) => {
  return (
    <svg
      width="160"
      height="157"
      viewBox="0 0 160 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.109 11.2173C66.237 11.2173 63.0981 14.3562 63.0981 18.2281V26.6412C63.0981 30.5131 66.237 33.652 70.109 33.652H88.2416L95.2352 39.48C95.9076 40.0404 96.9285 39.5622 96.9285 38.6869L96.9285 33.4731C100.039 32.7564 102.359 29.9697 102.359 26.6411V18.2281C102.359 14.3561 99.22 11.2173 95.348 11.2173H70.109Z"
        fill="#FDA53A"
      />
      <path
        d="M68.7058 18.228L96.5804 18.228"
        stroke="#F5F7F9"
        strokeWidth="2.06478"
        strokeLinecap="round"
      />
      <path
        d="M68.7058 22.4347L96.5804 22.4347"
        stroke="#F5F7F9"
        strokeWidth="2.06478"
        strokeLinecap="round"
      />
      <path
        d="M68.7058 26.641L81.0945 26.641"
        stroke="#F5F7F9"
        strokeWidth="2.06478"
        strokeLinecap="round"
      />
      <path
        d="M110.551 12.607C110.826 12.116 111.451 12.116 111.726 12.607L112.788 14.5065C112.833 14.5863 112.89 14.6565 112.956 14.7136L114.586 16.1223C114.956 16.4426 114.956 17.0811 114.586 17.4015L112.956 18.8102C112.89 18.8673 112.833 18.9374 112.788 19.0173L111.726 20.9167C111.451 21.4077 110.826 21.4077 110.551 20.9167L109.489 19.0173C109.444 18.9374 109.388 18.8673 109.322 18.8102L107.692 17.4015C107.321 17.0811 107.321 16.4426 107.692 16.1223L109.322 14.7136C109.388 14.6565 109.444 14.5863 109.489 14.5065L110.551 12.607Z"
        fill="#FEC473"
      />
      <path
        d="M53.3908 26.4425C53.6458 25.9515 54.2265 25.9515 54.4815 26.4425L55.4679 28.3419C55.5094 28.4218 55.5621 28.4919 55.6234 28.549L57.1369 29.9577C57.481 30.2781 57.481 30.9166 57.1369 31.2369L55.6234 32.6456C55.5621 32.7027 55.5094 32.7729 55.4679 32.8527L54.4815 34.7522C54.2265 35.2432 53.6458 35.2432 53.3908 34.7522L52.4044 32.8527C52.3629 32.7729 52.3102 32.7027 52.2489 32.6456L50.7354 31.2369C50.3913 30.9166 50.3913 30.2781 50.7354 29.9577L52.2489 28.549C52.3102 28.4919 52.3629 28.4218 52.4044 28.3419L53.3908 26.4425Z"
        fill="#FEC473"
      />
      <path
        d="M104.448 0.498224C104.84 -0.166075 105.734 -0.166075 106.126 0.498224L107.643 3.06804C107.707 3.17612 107.788 3.271 107.883 3.34826L110.211 5.25413C110.741 5.68755 110.741 6.55144 110.211 6.98486L107.883 8.89073C107.788 8.96799 107.707 9.06287 107.643 9.17095L106.126 11.7408C105.734 12.4051 104.84 12.4051 104.448 11.7408L102.93 9.17095C102.866 9.06287 102.785 8.96799 102.691 8.89073L100.363 6.98486C99.8332 6.55144 99.8332 5.68755 100.363 5.25413L102.691 3.34826C102.785 3.271 102.866 3.17612 102.93 3.06804L104.448 0.498224Z"
        fill="#FEC473"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.349 40.6628C8.21512 40.6628 1.52588e-05 48.8779 1.52588e-05 59.0118C1.52588e-05 69.1456 8.21512 77.3608 18.349 77.3608H38.8213L44.8712 82.5464C45.3567 82.9626 46.1068 82.6176 46.1068 81.9781L46.1068 76.332C53.2563 73.8254 58.3831 67.0173 58.3831 59.0118C58.3831 48.8779 50.168 40.6628 40.0341 40.6628H18.349Z"
        fill="#7A9EFF"
      />
      <circle
        cx="2.994"
        cy="2.994"
        r="2.994"
        transform="matrix(-1 0 0 1 43.4128 55.6328)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.994"
        cy="2.994"
        r="2.994"
        transform="matrix(-1 0 0 1 31.4368 55.6328)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.994"
        cy="2.994"
        r="2.994"
        transform="matrix(-1 0 0 1 19.4604 55.6328)"
        fill="#F5F7F9"
      />
      <path
        d="M157.897 38.0757C157.897 38.0757 157.752 38.099 157.686 38.1271C127.672 45.7438 95.7066 56.3513 72.0673 77.3273C62.0241 86.256 54.0358 97.8873 53.2063 111.695C51.9088 133.292 68.2921 151.851 89.7962 153.143C98.6489 153.674 107.528 151.116 114.761 145.943C121.712 140.962 126.448 133.557 130.306 125.891C136.267 114.01 152.841 81.6031 152.841 81.6031C153.418 80.5004 152.329 79.2494 151.169 79.7084C145.676 80.8683 133.358 84.646 128.646 87.4067C128.001 87.7845 127.225 87.1612 127.443 86.4534C129.535 79.5141 134.312 72.7522 138.075 66.9227C144.355 57.1752 151.43 48.2765 159.413 39.913C159.668 39.6559 159.926 39.351 159.948 38.9839C160 38.1059 158.798 37.9376 157.896 38.0916L157.897 38.0757Z"
        fill="url(#paint0_linear_10373_11851)"
      />
      <path
        d="M119.89 124.739C114.75 139.713 98.4487 147.672 83.4804 142.518C68.512 137.363 60.5445 121.046 65.6844 106.072C75.8614 85.1795 85.6218 115.246 100.59 120.4C115.558 125.555 125.029 109.766 119.89 124.739Z"
        fill="#FFC773"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10373_11851"
          x1="108.997"
          y1="35.0612"
          x2="101.859"
          y2="153.867"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB7E20" />
          <stop offset="1" stopColor="#FDA53A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CompleteQuiz({ ...props }) {
  return (
    <svg
      width="100"
      height="150"
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.3564 71.2495H69.6422V140.892L49.9993 129.285L30.3564 140.892V71.2495Z"
        fill="url(#paint0_linear_9214_6920)"
      />
      <path
        d="M47.7402 10.5886C49.0565 9.5178 50.9435 9.5178 52.2598 10.5886L59.7555 16.6862C60.5472 17.3302 61.5759 17.6058 62.5835 17.4439L72.1237 15.9111C73.7991 15.6419 75.4334 16.5855 76.0379 18.171L79.4806 27.1995C79.8441 28.153 80.5972 28.9061 81.5508 29.2697L90.5793 32.7123C92.1648 33.3169 93.1083 34.9512 92.8391 36.6265L91.3063 46.1668C91.1444 47.1743 91.4201 48.2031 92.064 48.9947L98.1617 56.4904C99.2324 57.8067 99.2324 59.6938 98.1617 61.0101L92.064 68.5058C91.4201 69.2974 91.1444 70.3262 91.3063 71.3337L92.8391 80.874C93.1083 82.5493 92.1648 84.1836 90.5793 84.7882L81.5508 88.2308C80.5972 88.5944 79.8441 89.3475 79.4806 90.301L76.0379 99.3295C75.4334 100.915 73.7991 101.859 72.1237 101.589L62.5835 100.057C61.5759 99.8947 60.5472 100.17 59.7555 100.814L52.2598 106.912C50.9435 107.983 49.0565 107.983 47.7402 106.912L40.2445 100.814C39.4528 100.17 38.4241 99.8947 37.4165 100.057L27.8763 101.589C26.2009 101.859 24.5666 100.915 23.9621 99.3295L20.5194 90.301C20.1559 89.3475 19.4028 88.5944 18.4492 88.2308L9.42071 84.7882C7.83523 84.1836 6.89168 82.5493 7.16086 80.874L8.69371 71.3337C8.85559 70.3262 8.57993 69.2974 7.93596 68.5058L1.83835 61.0101C0.76756 59.6938 0.767559 57.8067 1.83835 56.4904L7.93596 48.9947C8.57993 48.2031 8.85559 47.1743 8.69371 46.1668L7.16086 36.6265C6.89168 34.9512 7.83523 33.3169 9.42071 32.7123L18.4492 29.2697C19.4028 28.9061 20.1559 28.153 20.5194 27.1995L23.9621 18.171C24.5666 16.5855 26.2009 15.6419 27.8763 15.9111L37.4165 17.4439C38.4241 17.6058 39.4528 17.3302 40.2445 16.6862L47.7402 10.5886Z"
        fill="#577CFF"
      />
      <ellipse cx="49.9994" cy="58.7504" rx="35.7143" ry="35.7143" fill="#95B0F8" />
      <path
        d="M35.7129 59.7111L45.2544 70.0856C45.8219 70.7027 46.8026 70.6801 47.3411 70.0376L64.2843 49.8213"
        stroke="white"
        strokeWidth="7.16216"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_9214_6920"
          x1="49.9993"
          y1="110.535"
          x2="49.9993"
          y2="140.892"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD180" />
          <stop offset="1" stopColor="#FF9635" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function TimerColor({ ...props }) {
  return (
    <svg
      width="31"
      height="36"
      viewBox="0 0 31 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="13.5" y="3.00195" width="4" height="4" rx="0.833333" fill="#FFAB40" />
      <circle cx="15.5" cy="20.916" r="15" fill="#FFECD0" />
      <circle cx="15.5" cy="20.916" r="13.9583" stroke="#FF9100" strokeWidth="2.08333" />
      <path
        d="M27.9123 7.11441C27.1312 6.33336 25.8649 6.33336 25.0838 7.11441L23.2071 8.99113L26.8153 12.5993L28.692 10.7226C29.473 9.94151 29.473 8.67518 28.692 7.89414L27.9123 7.11441Z"
        fill="#FF9100"
      />
      <path
        d="M15.5 10.916C13.8555 10.916 12.2364 11.3216 10.786 12.0968C9.3357 12.872 8.09894 13.993 7.1853 15.3603C6.27166 16.7277 5.70934 18.2993 5.54815 19.9358C5.38696 21.5724 5.63188 23.2235 6.2612 24.7428C6.89053 26.2622 7.88484 27.6029 9.15607 28.6461C10.4273 29.6894 11.9362 30.403 13.5491 30.7239C15.162 31.0447 16.8291 30.9628 18.4028 30.4854C19.9765 30.008 21.4082 29.1499 22.5711 27.9871L15.5 20.916V10.916Z"
        fill="#FFD180"
      />
      <rect
        x="11.332"
        y="0.0839844"
        width="8.33333"
        height="4.16667"
        rx="0.833333"
        fill="#FF9100"
      />
    </svg>
  )
}

export function SpeechBubbleColor({ ...props }) {
  return (
    <svg
      width="36"
      height="29"
      viewBox="0 0 36 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8017 0C30.5346 0 35.9928 5.45814 35.9928 12.1911C35.9928 18.9241 30.5346 24.3822 23.8017 24.3822H16.5857L9.64457 28.7993C9.48999 28.8976 9.28769 28.7866 9.28769 28.6034L9.28768 24.0343C3.95649 22.7319 0 17.9235 0 12.1911C0 5.45814 5.45814 0 12.1911 0H23.8017Z"
        fill="#7A9EFF"
      />
      <circle cx="9.77153" cy="12.0943" r="1.64458" fill="#F5F7F9" />
      <circle cx="17.7051" cy="12.0943" r="1.64458" fill="#F5F7F9" />
      <circle cx="25.6387" cy="12.0943" r="1.64458" fill="#F5F7F9" />
    </svg>
  )
}

// 퀴즈 기록 아이콘
export const DocumentTypeRoundIcon = ({ ...props }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="#FDA53A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3218 10.88C9.57318 10.948 9 11.5757 9 12.3273V26.5294C9 27.2952 9.69354 27.874 10.447 27.737C13.0696 27.2602 15.7764 27.6963 18.1165 28.9727L19.2311 29.5807C19.7104 29.8421 20.2896 29.8421 20.7689 29.5807L21.8835 28.9727C24.2236 27.6963 26.9304 27.2602 29.553 27.737C30.3065 27.874 31 27.2952 31 26.5294V12.3273C31 11.5757 30.4268 10.948 29.6782 10.88C26.9542 10.6323 24.2181 11.1993 21.8168 12.5091L20 13.5001L18.1832 12.5091C15.7819 11.1994 13.0458 10.6323 10.3218 10.88ZM14.95 21.5C15.6404 21.5 16.2 20.9404 16.2 20.25C16.2 19.5596 15.6404 19 14.95 19C14.2596 19 13.7 19.5596 13.7 20.25C13.7 20.9404 14.2596 21.5 14.95 21.5ZM21.2 20.25C21.2 20.9404 20.6404 21.5 19.95 21.5C19.2596 21.5 18.7 20.9404 18.7 20.25C18.7 19.5596 19.2596 19 19.95 19C20.6404 19 21.2 19.5596 21.2 20.25ZM24.95 21.5C25.6404 21.5 26.2 20.9404 26.2 20.25C26.2 19.5596 25.6404 19 24.95 19C24.2596 19 23.7 19.5596 23.7 20.25C23.7 20.9404 24.2596 21.5 24.95 21.5Z"
        fill="white"
      />
    </svg>
  )
}

export const TodayQuizTypeRoundIcon = ({ ...props }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#FB8320" />
      <path
        d="M29.2482 10.0931C29.2482 10.0931 29.2221 10.0973 29.2103 10.1023C23.8129 11.472 18.0648 13.3795 13.8139 17.1515C12.0079 18.7571 10.5714 20.8487 10.4222 23.3316C10.1889 27.2154 13.135 30.5526 17.002 30.7849C18.5939 30.8806 20.1906 30.4205 21.4913 29.4903C22.7413 28.5946 23.5928 27.2629 24.2866 25.8844C25.3587 23.7478 28.3391 17.9204 28.3391 17.9204C28.4428 17.7221 28.2469 17.4971 28.0383 17.5796C27.0505 17.7882 24.8355 18.4675 23.9881 18.964C23.8722 19.0319 23.7326 18.9198 23.7718 18.7926C24.148 17.5447 25.007 16.3288 25.6838 15.2805C26.8131 13.5276 28.0853 11.9274 29.5209 10.4235C29.5667 10.3772 29.613 10.3224 29.617 10.2564C29.6265 10.0985 29.4103 10.0682 29.248 10.0959L29.2482 10.0931Z"
        fill="white"
      />
    </svg>
  )
}

export const CollectionTypeRoundIcon = ({ ...props }) => {
  const clipId = useId()

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="#4D7BF9" />
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.78251 29.2872C10.0056 30.7482 13.2223 30.2326 17.0337 28.2523C17.7227 28.4984 18.4539 28.6617 19.2167 28.7293C24.0427 29.157 28.3017 25.5916 28.7294 20.7656C28.7958 20.0164 28.766 19.2809 28.6501 18.5712C31.3398 15.1182 32.4545 11.985 31.2166 10.5062C29.9697 9.01675 26.6504 9.58173 22.7415 11.6588C22.1137 11.4522 21.4524 11.3137 20.7657 11.2529C15.9397 10.8251 11.6807 14.3906 11.253 19.2166C11.1909 19.9168 11.2129 20.6051 11.3106 21.2715C8.64868 24.705 7.55046 27.8155 8.78251 29.2872ZM13.658 26.0713C12.2042 26.6719 11.1351 26.7891 10.719 26.2921C10.265 25.7497 10.7488 24.6851 11.8671 23.3059C12.0781 23.8218 12.3372 24.3144 12.6392 24.7776C13.4472 24.7238 14.6961 24.6336 16.4215 23.817C16.6421 23.7125 16.9034 24.0614 16.7179 24.2201C15.5392 25.2288 14.6047 25.8043 13.658 26.0713ZM27.9061 11.9036C28.3328 12.4132 28.0029 13.4851 27.1063 14.8594C26.4517 13.9527 25.6264 13.1727 24.6725 12.5699C26.2743 11.6721 27.4467 11.3548 27.9061 11.9036Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="24" height="24" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const InfiniteGray = ({ ...props }) => {
  return (
    <svg
      width="164"
      height="77"
      viewBox="0 0 164 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M78.8353 38.6198C65.9396 51.9897 51.2527 67.0307 36.1182 67.0307C20.9838 67.0307 8.71484 54.3107 8.71484 38.6198C8.71484 22.929 20.9838 10.209 36.1182 10.209C51.2527 10.209 64.3276 23.5788 78.8353 38.6198Z"
        stroke="#F5F7F9"
        strokeWidth="17"
      />
      <path
        d="M78.8357 38.6198C92.8431 52.5586 108.796 68.2397 125.235 68.2397C141.674 68.2397 155.001 54.9784 155.001 38.6198C155.001 22.2613 141.674 9 125.235 9C108.796 9 94.594 22.9387 78.8357 38.6198Z"
        stroke="#F5F7F9"
        strokeWidth="17"
      />
    </svg>
  )
}

export const InfiniteColor = ({ ...props }) => {
  return (
    <svg
      width="164"
      height="77"
      viewBox="0 0 164 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M78.8348 38.6198C65.9391 51.9897 51.2522 67.0307 36.1177 67.0307C20.9833 67.0307 8.71436 54.3107 8.71436 38.6198C8.71436 22.929 20.9833 10.209 36.1177 10.209C51.2522 10.209 64.3271 23.5788 78.8348 38.6198Z"
        stroke="url(#paint0_linear_10944_12685)"
        strokeWidth="17"
      />
      <path
        d="M78.8347 38.6198C92.8421 52.5586 108.795 68.2397 125.234 68.2397C141.673 68.2397 155 54.9784 155 38.6198C155 22.2613 141.673 9 125.234 9C108.795 9 94.593 22.9387 78.8347 38.6198Z"
        stroke="url(#paint1_linear_10944_12685)"
        strokeWidth="17"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10944_12685"
          x1="63.809"
          y1="38.6198"
          x2="56.1979"
          y2="-3.29525"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF7ED" />
          <stop offset="1" stopColor="#7A9EFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10944_12685"
          x1="99.6071"
          y1="34.6326"
          x2="138.39"
          y2="83.4298"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF7ED" />
          <stop offset="1" stopColor="#FDA53A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const InfiniteColorInverse = ({ ...props }) => {
  return (
    <svg
      width="145"
      height="68"
      viewBox="0 0 145 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M69.8347 34.1198C58.4628 45.9098 45.5114 59.1735 32.1653 59.1735C18.8192 59.1735 8 47.9566 8 34.1198C8 20.283 18.8192 9.0661 32.1653 9.0661C45.5114 9.0661 57.0413 20.8561 69.8347 34.1198Z"
        stroke="url(#paint0_linear_11071_14100)"
        strokeWidth="14.5116"
      />
      <path
        d="M69.8347 34.1198C82.1869 46.4115 96.2548 60.2397 110.751 60.2397C125.248 60.2397 137 48.5454 137 34.1198C137 19.6942 125.248 8 110.751 8C96.2548 8 83.731 20.2917 69.8347 34.1198Z"
        stroke="url(#paint1_linear_11071_14100)"
        strokeWidth="14.5116"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11071_14100"
          x1="56.5844"
          y1="34.1198"
          x2="49.8727"
          y2="-2.84242"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7A9EFF" />
          <stop offset="1" stopColor="#FEC473" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11071_14100"
          x1="88.1525"
          y1="30.6037"
          x2="122.353"
          y2="73.6349"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7A9EFF" />
          <stop offset="1" stopColor="#C4DBFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const Bomb = ({ ...props }) => {
  const paintId0 = useId()
  const paintId1 = useId()

  return (
    <svg
      width="55"
      height="68"
      viewBox="0 0 55 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.3546 -8.96797e-08C30.4877 -4.0151e-08 31.4062 0.918547 31.4062 2.05163L31.4062 8.20653C31.4062 9.33961 30.4877 10.2582 29.3546 10.2582L25.2514 10.2582C24.1183 10.2582 23.1997 9.33961 23.1997 8.20653L23.1997 2.05163C23.1997 0.918549 24.1183 -3.18568e-07 25.2514 -2.69039e-07L29.3546 -8.96797e-08Z"
        fill={`url(#${paintId0})`}
      />
      <path
        d="M19.0957 11.4522C19.0957 9.68814 20.5258 8.25806 22.2899 8.25806H31.8724C33.6365 8.25806 35.0666 9.68814 35.0666 11.4522C35.0666 13.2163 33.6365 14.6464 31.8724 14.6464H22.2899C20.5258 14.6464 19.0957 13.2163 19.0957 11.4522Z"
        fill="#C5C7D4"
      />
      <path
        d="M55 40.1465C55 55.3343 42.6878 67.6465 27.5 67.6465C12.3122 67.6465 -1.07636e-06 55.3343 -2.40413e-06 40.1465C-3.73189e-06 24.9587 12.3122 12.6465 27.5 12.6465C42.6878 12.6465 55 24.9587 55 40.1465Z"
        fill={`url(#${paintId1})`}
      />
      <defs>
        <linearGradient
          id={paintId0}
          x1="27.303"
          y1="-1.79359e-07"
          x2="27.303"
          y2="10.2582"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3E3E3" />
          <stop offset="1" stopColor="#919191" />
        </linearGradient>
        <linearGradient
          id={paintId1}
          x1="12.9658"
          y1="63.5423"
          x2="59.6621"
          y2="5.55345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A2A2A" />
          <stop offset="1" stopColor="#23418E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const BombRed = ({ ...props }) => {
  const paintId0 = useId()
  const paintId1 = useId()

  return (
    <svg
      width="55"
      height="68"
      viewBox="0 0 55 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.3546 -8.96797e-08C30.4877 -4.0151e-08 31.4062 0.918547 31.4062 2.05163L31.4062 8.20653C31.4062 9.33961 30.4877 10.2582 29.3546 10.2582L25.2514 10.2582C24.1183 10.2582 23.1997 9.33961 23.1997 8.20653L23.1997 2.05163C23.1997 0.918549 24.1183 -3.18568e-07 25.2514 -2.69039e-07L29.3546 -8.96797e-08Z"
        fill={`url(#${paintId0})`}
      />
      <path
        d="M19.0957 11.4522C19.0957 9.68814 20.5258 8.25806 22.2899 8.25806H31.8724C33.6365 8.25806 35.0666 9.68814 35.0666 11.4522C35.0666 13.2163 33.6365 14.6464 31.8724 14.6464H22.2899C20.5258 14.6464 19.0957 13.2163 19.0957 11.4522Z"
        fill="#C5C7D4"
      />
      <path
        d="M55 40.1465C55 55.3343 42.6878 67.6465 27.5 67.6465C12.3122 67.6465 -1.07636e-06 55.3343 -2.40413e-06 40.1465C-3.73189e-06 24.9587 12.3122 12.6465 27.5 12.6465C42.6878 12.6465 55 24.9587 55 40.1465Z"
        fill={`url(#${paintId1})`}
      />
      <defs>
        <linearGradient
          id={paintId0}
          x1="27.303"
          y1="-1.79359e-07"
          x2="27.303"
          y2="10.2582"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3E3E3" />
          <stop offset="1" stopColor="#919191" />
        </linearGradient>
        <linearGradient
          id={paintId1}
          x1="12.9658"
          y1="63.5423"
          x2="59.6621"
          y2="5.55345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A2A2A" />
          <stop offset="1" stopColor="#E1824E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const TodayQuizAndBlueSpeechBubble = ({ ...props }) => {
  const paintId = useId()

  return (
    <svg
      width="212"
      height="110"
      viewBox="0 0 212 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.3815 17.792C43.4388 17.792 36.9999 24.2308 36.9999 32.1735C36.9999 40.1163 43.4388 46.5551 51.3815 46.5551H67.4278L72.1695 50.6195C72.5501 50.9457 73.138 50.6753 73.138 50.174L73.138 45.7487C78.7414 43.784 82.7595 38.448 82.7595 32.1735C82.7595 24.2308 76.3207 17.792 68.3779 17.792H51.3815Z"
        fill="#7A9EFF"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 71.0261 29.5252)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 61.6394 29.5252)"
        fill="#F5F7F9"
      />
      <circle
        cx="2.34665"
        cy="2.34665"
        r="2.34665"
        transform="matrix(-1 0 0 1 52.2529 29.5252)"
        fill="#F5F7F9"
      />
      <path
        d="M160.757 15.7642C160.757 15.7642 160.644 15.7825 160.592 15.8045C137.067 21.7744 112.014 30.0883 93.4856 46.529C85.6139 53.5271 79.3528 62.6435 78.7027 73.4657C77.6857 90.3933 90.5267 104.939 107.381 105.952C114.32 106.368 121.279 104.363 126.948 100.309C132.396 96.4048 136.108 90.6007 139.132 84.5921C143.805 75.2798 156.795 49.8803 156.795 49.8803C157.247 49.0159 156.393 48.0355 155.484 48.3952C151.179 49.3043 141.524 52.2652 137.831 54.429C137.326 54.7251 136.717 54.2365 136.888 53.6818C138.528 48.2429 142.272 42.9431 145.222 38.374C150.144 30.7341 155.689 23.7594 161.946 17.2043C162.146 17.0028 162.347 16.7638 162.365 16.476C162.406 15.7879 161.464 15.656 160.756 15.7767L160.757 15.7642Z"
        fill={`url(#${paintId})`}
      />
      <path
        d="M130.967 83.6893C126.939 95.4253 114.162 101.664 102.43 97.6239C90.6984 93.5837 84.4536 80.7946 88.4822 69.0587C96.4587 52.6832 104.109 76.2484 115.841 80.2886C127.573 84.3287 134.996 71.9533 130.967 83.6893Z"
        fill="#FFC773"
      />
      <defs>
        <linearGradient
          id={paintId}
          x1="122.43"
          y1="13.4015"
          x2="116.836"
          y2="106.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB7E20" />
          <stop offset="1" stopColor="#FDA53A" />
        </linearGradient>
      </defs>
    </svg>
  )
}
