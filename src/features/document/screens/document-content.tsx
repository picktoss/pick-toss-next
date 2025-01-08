'use client'

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

  return (
    <div className="px-[20px] pb-[132px] pt-[10px]">
      {isPending ? (
        <Loading center />
      ) : (
        data && (
          <Text className="font-suit">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{ code: handleMarkDownCodeBlock, p: handleParagraph }}
            >
              {formattedContent}
            </Markdown>
          </Text>
        )
      )}
    </div>
  )
}

export default DocumentContent

const handleMarkDownCodeBlock = (
  props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps
) => {
  // style, node, ref는 사용하지 않음
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

const handleParagraph = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <>
      <p {...props}>{props.children}</p>
      <br />
    </>
  )
}
