'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/shared/lib/utils'
import TurndownService from 'turndown'
import MarkdownIt from 'markdown-it'
import '../styles/tiptap-custom.css'

interface EditorProps {
  handleContentChange: (value: string) => void
  initialContent?: string
  maxLength?: number
}

// HTML을 마크다운으로 변환하기 위한 turndown 서비스 초기화
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
})
turndownService.addRule('lineBreak', {
  filter: 'br',
  replacement: () => '\n',
})

// 마크다운을 HTML으로 변환
const markdownParser = new MarkdownIt({
  html: true,
  breaks: true,
})
markdownParser.renderer.rules.text = (tokens, idx) => {
  const content = tokens[idx]?.content ?? ''
  return content.replace(/<br\s*\/?>/g, '\n')
}

export default function Editor({
  initialContent = '',
  handleContentChange,
  maxLength = 50000,
}: EditorProps) {
  const initialHTML = markdownParser.render(initialContent)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-3',
          },
        },
      }),
      Placeholder.configure({
        placeholder: '여기를 탭하여 입력을 시작하세요',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: initialHTML,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm !shadow-none sm:prose-base lg:prose-lg xl:prose-md focus:outline-none',
          'min-h-[100vh]'
        ),
      },
    },
    onUpdate: ({ editor }) => {
      try {
        const content = editor.getText()
        const contentLength = content.length

        if (contentLength <= maxLength) {
          // HTML을 마크다운으로 변환
          const html = editor.getHTML()
          const markdown = turndownService.turndown(html)
          handleContentChange(markdown)
        } else {
          const truncatedContent = content.slice(0, maxLength)
          editor.commands.setContent(truncatedContent)
          editor.commands.focus()
        }
      } catch (error) {
        console.error('Editor update error:', error)
      }
    },
  })

  return (
    <div className="tiptap-editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}
