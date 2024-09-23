'use client'

import { ClassAttributes, HTMLAttributes } from 'react'
import Markdown, { ExtraProps } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { cn } from '@/shared/lib/utils'
import { useParams } from 'next/navigation'
import { DocumentStatus } from '@/actions/types/dto/document.dto'
import Header from './header'

interface Props {
  documentName: string
  createdAt: string
  content: string
  status: DocumentStatus
}

// Viewer 컴포넌트
const Viewer = ({ documentName, createdAt, content, status }: Props) => {
  const { isPickOpen } = useDocumentDetailContext()
  const { documentId } = useParams()

  return (
    <div
      className={cn(
        'lg:max-w-[896px] flex-1 overflow-scroll px-[20px] w-full pt-[10px] lg:pt-[28px] pb-[80px]',
        isPickOpen && 'pr-[24px]'
      )}
    >
      <div className="flex flex-col gap-[24px]">
        <Header
          documentId={documentId}
          documentName={documentName}
          createdAt={createdAt}
          status={status}
        />

        <div className="prose max-w-none pb-[80px] lg:pb-0">
          <Markdown remarkPlugins={[remarkGfm]} components={{ code: handleMarkDownCodeBlock }}>
            {content}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default Viewer

// Viewer 컴포넌트 내부에서 사용되는 컴포넌트 렌더링 함수
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
