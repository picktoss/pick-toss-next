import { getDocument } from '@/apis/fetchers/document/get-document'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import icons from '@/constants/icons'
import { formatDateKorean } from '@/utils/date'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { ClassAttributes, HTMLAttributes } from 'react'
import Markdown, { ExtraProps } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface Props {
  params: {
    documentId: string
  }
}

export default async function Document({ params: { documentId } }: Props) {
  const session = await auth()
  const { documentName, createdAt, content, keyPoints } = await getDocument({
    accessToken: session?.user.accessToken || '',
    documentId: Number(documentId),
  })

  return (
    <main className="flex h-[calc(100vh-60px)]">
      <div className="flex-1 overflow-scroll pr-[30px]">
        <div className="mb-[45px] flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-h3-bold text-gray-08">{documentName}</h3>
            <p className="text-body2-regular text-gray-06">{formatDateKorean(createdAt)}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-[4px] text-body2-regular text-gray-06">퀴즈 생성</span>
            <Switch displayStatus />
            <div className="ml-[23px] flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
              <Image src={icons.kebab} alt="" width={15} height={3} />
            </div>
          </div>
        </div>
        <div className="prose max-w-none">
          <Markdown remarkPlugins={[remarkGfm]} components={{ code: handleMarkDownCodeBlock }}>
            {content}
          </Markdown>
        </div>
      </div>
      <div className="my-[12px] flex w-[400px] flex-col rounded-[16px] border border-blue-02 bg-blue-01 drop-shadow-lg">
        <div className="flex h-[72px] items-center rounded-t-[16px] border-b border-blue-02 bg-white px-[23px]">
          <div className="flex items-end gap-[6px]">
            <Image src={icons.pin} alt="" width={27} />
            <h3 className="text-h3-bold text-gray-08">핵심 pick</h3>
            <p className="pb-1 text-small1-regular text-gray-06">
              질문을 통해 핵심 내용을 되돌아보세요
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-scroll">
          <Accordion type="multiple" className="flex flex-col px-[16px] py-[7px]">
            {keyPoints.map((keyPoint, index) => (
              <AccordionItem value={keyPoint.id.toString()} key={keyPoint.id}>
                <AccordionTrigger
                  className="flex items-center justify-between"
                  chevronDownIcon={
                    <div className="flex size-[24px] items-center justify-center rounded-full bg-blue-02">
                      <ChevronDown size={16} color="#7095F8" strokeWidth={3} />
                    </div>
                  }
                >
                  <div className="flex flex-1 gap-1">
                    <span className="text-body2-bold text-blue-06">{index + 1}</span>
                    <span className="text-left text-body2-medium text-gray-09">
                      {keyPoint.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-[14px] text-body2-regular text-gray-08">
                  {keyPoint.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  )
}

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
