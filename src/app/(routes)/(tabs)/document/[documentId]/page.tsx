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
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

const fetchDocument = (documentId: number) => {
  return {
    id: documentId,
    documentName: '최근 이슈',
    status: 'UNPROCESSED',
    quizGenerationStatus: true,
    category: {
      id: 2,
      name: '전공 공부',
    },
    keyPoints: [
      {
        id: 0,
        question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
        answer:
          '기존의 배양육이 기존 축산방식에서 생산되는 육류보다 토지 사용량은 99%, 가스 배출량은 96%, 에너지 소비량은 45%를 감소시킬 수 있어 환경오염에 대한 논란에서 상대적으로 자유로울수 있다는 의견이 배양육 개발 초기 제시된 바 있다',
      },
      {
        id: 1,
        question: '식물기반 단백질 시장에서 구이 방식으로 섭취하기에는 어떤 한계가 있을까요?',
        answer:
          '기존의 배양육이 기존 축산방식에서 생산되는 육류보다 토지 사용량은 99%, 가스 배출량은 96%, 에너지 소비량은 45%를 감소시킬 수 있어 환경오염에 대한 논란에서 상대적으로 자유로울수 있다는 의견이 배양육 개발 초기 제시된 바 있다',
      },
      {
        id: 2,
        question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
        answer:
          '기존의 배양육이 기존 축산방식에서 생산되는 육류보다 토지 사용량은 99%, 가스 배출량은 96%, 에너지 소비량은 45%를 감소시킬 수 있어 환경오염에 대한 논란에서 상대적으로 자유로울수 있다는 의견이 배양육 개발 초기 제시된 바 있다',
      },
      {
        id: 3,
        question: '식물기반 단백질 시장에서?',
        answer:
          '기존의 배양육이 기존 축산방식에서 생산되는 육류보다 토지 사용량은 99%, 가스 배출량은 96%, 에너지 소비량은 45%를 감소시킬 수 있어 환경오염에 대한 논란에서 상대적으로 자유로울수 있다는 의견이 배양육 개발 초기 제시된 바 있다',
      },
    ],
    content: `
# 3.1 리액트의 모든 훅 파헤치기

## 3.1.1 useState

### useState의 구현

- useState는 함수가 호출이 종료된 이후에도 setState를 통해 state값을 변경할 수있다.
- 함수의 실행이 끝났음에도 state값을 기억할 수 있는 이유는 클로저를 때문이다.
- 클로저를 통해 함수(useState) 내부에 선언된 함수(setState)가 함수의 실행이 종료된 이후에도 state를 계속 참조할 수 있다.

### 게으른 초기화

- useState의 원소로 변수 대신 함수를 넘기는 것을 게으른 초기화라고 한다.
- 게으른 초기화 함수는 오로지 state가 처음 만들어질 때만 사용되고, 이후 리렌더링에서는 이 함수의 실행은 무시된다.
- 게으른 초기화는 브라우저 스토리지에 접근하거나, map, filter 등 배열에 대한 접근 등 무거운 연산이 요구될 때 사용하는 것이 좋다.

## Markdown
* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Syntax highlighting

\`\`\`jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import Highlight from 'highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown remarkPlugins={[Highlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

good
`,
    createdAt: '2024-04-24T09:11:01.550Z',
  }
}

interface Props {
  params: {
    documentId: string
  }
}

export default function Document({ params: { documentId } }: Props) {
  const { documentName, createdAt, content, keyPoints } = fetchDocument(Number(documentId))
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
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // markdown 내 코드 블럭 문법 처리
              code(props) {
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
              },
            }}
          >
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
