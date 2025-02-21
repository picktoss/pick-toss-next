'use client'

import '@remirror/styles/all.css'
import '../styles/remirror-custom.css'

import { css } from '@emotion/css'
import React from 'react'
import {
  // MarkdownToolbar,
  Remirror,
  ThemeProvider,
  useRemirror,
} from '@remirror/react'
import { extensions } from '../libs/extensions'
import { useEditDocumentContext } from '../context/edit-document-context'

interface VisualEditorProps {
  prevContent?: string
}

export default function VisualEditor({ prevContent }: VisualEditorProps) {
  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
    // content: '**Markdown** content is the _best_',
  })
  const { setEditorMarkdownContent } = useEditDocumentContext()

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoRender="end"
        initialContent={prevContent}
        onChange={({ helpers, state }) => {
          if (helpers.getMarkdown) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const markdown = helpers.getMarkdown(state)

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setEditorMarkdownContent(markdown)
          }
        }}
        placeholder="여기를 탭하여 입력을 시작하세요"
        classNames={[
          css`
            &.ProseMirror {
              /* ../styles/remirror-custom.css에 기본 설정 */
              white-space: pre-wrap;
              word-wrap: break-word;

              p {
                margin: 0 0 1.2em 0;
                line-height: 1.5;
                display: inline-block;
              }

              /* Add spacing between block elements */
              h1 {
                margin: 1.2em 0;
              }
              h2 {
                margin: 1em 0;
              }
              h3,
              h4,
              ul,
              ol {
                margin: 0.8em 0;
              }
              blockquote {
                margin: 1em 0;
              }

              .remirror-list-item-with-custom-mark p {
                height: fit-content;
                margin: 0;
              }
            }
          `,
          'prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm !shadow-none sm:prose-base lg:prose-lg xl:prose-md focus:outline-none !list-decimal',
          'min-h-[100vh]',
        ]}
      >
        {/* <MarkdownToolbar /> */}
      </Remirror>
    </ThemeProvider>
  )
}
