'use client'

import '@remirror/styles/all.css'
import '../styles/remirror-custom.css'

import { css } from '@emotion/css'
import React from 'react'
import { Remirror, ThemeProvider, useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { cn } from '@/shared/lib/utils'

interface EditorProps {
  handleContentChange: (value: string) => void
  initialContent?: string
}

export default function Editor({ initialContent, handleContentChange }: EditorProps) {
  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  })

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoRender="end"
        initialContent={initialContent}
        onChange={({ helpers, state }) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          handleContentChange(helpers.getMarkdown && helpers.getMarkdown(state))
        }
        placeholder="본문을 작성해보세요!"
        classNames={[
          css`
            &.ProseMirror {
              padding: 16px 20px;
              margin-bottom: 100px;
              width: 100%;
              /* min-width: 100vw; */
              max-width: 430px;
              min-height: 80vh;

              .remirror-ul-list-content {
                margin-top: 0;
                margin-bottom: 0;
                // default padding-left 28px
                padding-left: 12px;
              }
              .remirror-list-item-marker-container {
                // default left 32px
                left: -18px;
              }
              .remirror-list-item-with-custom-mark {
                margin: 0;
              }
            }
          `,
          cn(
            'prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm !shadow-none sm:prose-base lg:prose-lg xl:prose-md focus:outline-none',
            'min-h-[100vh]'
          ),
        ]}
      >
        {/* <MarkdownToolbar /> */}
      </Remirror>
    </ThemeProvider>
  )
}
