'use client'

import Icon from '@/shared/components/custom/icon'
import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ClassAttributes, HTMLAttributes } from 'react'
import Markdown, { ExtraProps } from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface Props {
  formattedContent?: string
}

const DocumentContent = ({ formattedContent }: Props) => {
  const { id } = useParams()
  const { data, isPending } = useQuery(queries.document.item(Number(id)))

  const convertBrToNewline = (content: string = '') => {
    const integrated = content.replace(/\n\s*\n/g, '\n')
    // <br/>, <br />, <br>, </br> 등의 다양한 형태를 모두 처리
    return integrated.replace(/<br\s*\/?>/gi, '\n')
    // return integrated
  }

  return (
    <div className="px-[20px] pb-[132px] pt-[10px]">
      {isPending ? (
        <Loading center />
      ) : (
        data && (
          <Text className="font-suit">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: handleMarkDownCodeBlock,
                p: handleParagraph,
                h1: handleHeading1,
                h2: handleHeading2,
                h3: handleHeading3,
                h4: handleHeading4,
                ol: handleOrderedList,
                ul: handleUnorderedList,
                li: handleListItem,
              }}
            >
              {convertBrToNewline(formattedContent)}
            </Markdown>
          </Text>
        )
      )}
    </div>
  )
}

export default DocumentContent

// 기존 코드 블록 핸들러
const handleMarkDownCodeBlock = (
  props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, style, node, ref, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter {...rest} style={dracula} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  )
}

// 단락 핸들러
const handleParagraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <>
      <p {...props} className="whitespace-pre-wrap leading-relaxed">
        {props.children}
      </p>
    </>
  )
}

// 제목 핸들러들
const handleHeading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <>
    <br />
    <h1 {...props} className="my-[12px] text-3xl font-bold">
      {props.children}
    </h1>
    <br />
  </>
)

const handleHeading2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <>
    <br />
    <h2 {...props} className="my-[8px] mb-[10px] text-2xl font-bold">
      {props.children}
    </h2>
  </>
)

const handleHeading3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <>
    <br />
    <h3 {...props} className="my-[5px] text-xl font-bold">
      {props.children}
    </h3>
  </>
)

const handleHeading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <>
    <h4 {...props} className="text-lg font-bold">
      {props.children}
    </h4>
  </>
)

// 순서 있는 목록 핸들러
const handleOrderedList = (props: HTMLAttributes<HTMLUListElement>) => (
  <>
    <br />
    <ol {...props} className="pl-5">
      {props.children}
    </ol>
    <br />
  </>
)

// 순서 없는 목록 핸들러
const handleUnorderedList = (props: HTMLAttributes<HTMLUListElement>) => (
  <>
    <br />
    <ul {...props} className="pl-5">
      {props.children}
    </ul>
    <br />
  </>
)

// 목록 아이템 핸들러
const handleListItem = (props: HTMLAttributes<HTMLLIElement>) => (
  <li {...props} className="flex items-start space-x-2">
    <span className="pt-[10px]">
      <Icon name="middle-dot" className="size-[6px] text-text-secondary" />
    </span>
    <span>{props.children}</span>
  </li>
)

// const DocumentContent = ({ formattedContent }: Props) => {
//   const { id } = useParams()
//   const { data, isPending } = useQuery(queries.document.item(Number(id)))

//   return (
//     <div className="px-[20px] pb-[132px] pt-[10px]">
//       {isPending ? (
//         <Loading center />
//       ) : (
//         data && (
//           <Text className="font-suit">
//             <Markdown
//               remarkPlugins={[remarkGfm]}
//               components={{ code: handleMarkDownCodeBlock, p: handleParagraph }}
//             >
//               {formattedContent}
//             </Markdown>
//           </Text>
//         )
//       )}
//     </div>
//   )
// }

// export default DocumentContent

// const handleMarkDownCodeBlock = (
//   props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps
// ) => {
//   // style, node, ref는 사용하지 않음
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { children, className, style, node, ref, ...rest } = props
//   const match = /language-(\w+)/.exec(className || '')
//   return match ? (
//     <SyntaxHighlighter {...rest} style={dracula} language={match[1]} PreTag="div">
//       {String(children).replace(/\n$/, '')}
//     </SyntaxHighlighter>
//   ) : (
//     <code {...props} className={className}>
//       {children}
//     </code>
//   )
// }

// const handleParagraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
//   return (
//     <>
//       <p {...props}>{props.children}</p>
//       <br />
//     </>
//   )
// }
