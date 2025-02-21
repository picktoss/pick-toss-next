'use client'

import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ClassAttributes, HTMLAttributes, useEffect, useRef, useState } from 'react'
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
    return content.replace(/<br\s*\/?>/gi, '\n\n')
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
                p: HandleParagraph,
                h1: handleHeading1,
                h2: handleHeading2,
                h3: handleHeading3,
                h4: handleHeading4,
                ol: handleOrderedList,
                ul: handleUnorderedList,
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
const HandleParagraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
  const pRef = useRef<HTMLParagraphElement>(null)
  const [isOrderedList, setIsOrderedList] = useState(false)

  useEffect(() => {
    if (pRef.current?.parentElement?.tagName === 'LI') {
      setIsOrderedList(true)
    }
  }, [])

  if (isOrderedList) {
    return <span {...props}>{props.children}</span>
  }

  return (
    <>
      <p ref={pRef} {...props} className="my-[10px] whitespace-pre-wrap leading-relaxed">
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
    <ol
      {...props}
      className="flex !list-decimal flex-col gap-[10px] pl-5"
      style={{ listStyleType: 'decimal' }}
    >
      {props.children}
    </ol>
    <br />
  </>
)

// 순서 없는 목록 핸들러
const handleUnorderedList = (props: HTMLAttributes<HTMLUListElement>) => (
  <>
    <br />
    <ul {...props} className="flex !list-disc flex-col gap-[10px] pl-5">
      {props.children}
    </ul>
    <br />
  </>
)
