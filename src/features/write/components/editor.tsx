'use client'

import '@remirror/styles/all.css'
import '../styles/remirror-custom.css'

import { css } from '@emotion/css'
import React, { useCallback } from 'react'
import { Remirror, ThemeProvider, useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { cn } from '@/shared/lib/utils'
import { RemirrorEventListener } from 'remirror'

interface EditorProps {
  handleContentChange: (value: string) => void
  initialContent?: string
  maxLength?: number
}

export default function Editor({
  initialContent,
  handleContentChange,
  maxLength = 50000,
}: EditorProps) {
  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  })

  const handleEditorChange: RemirrorEventListener<Remirror.Extensions> = useCallback(
    ({
      helpers,
      state,
    }: {
      helpers: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getMarkdown?: (state: any) => string
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state: any
    }) => {
      try {
        const markdown = helpers.getMarkdown && helpers.getMarkdown(state)
        if (typeof markdown !== 'string') return

        const newLength = markdown.length

        if (newLength <= maxLength) {
          handleContentChange(markdown)
        } else {
          const truncatedContent = markdown.slice(0, maxLength)

          const editor = manager.view
          if (editor) {
            const currentSelection = editor.state.selection

            editor.updateState(
              editor.state.apply(
                editor.state.tr
                  .setSelection(currentSelection)
                  .replaceWith(
                    0,
                    editor.state.doc.content.size,
                    editor.state.schema.text(truncatedContent)
                  )
              )
            )

            editor.focus()
          }
        }
      } catch (error) {
        console.error('Editor change error:', error)
      }
    },
    [maxLength, manager, handleContentChange]
  )

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoRender="end"
        initialContent={initialContent}
        onChange={handleEditorChange}
        placeholder="본문을 작성해보세요!"
        classNames={[
          css`
            &.ProseMirror {
              padding: 16px 20px;
              margin-bottom: 100px;
              width: 100%;
              max-width: 430px;
              min-height: 80vh;

              .remirror-ul-list-content {
                margin-top: 0;
                margin-bottom: 0;
                padding-left: 12px;
              }
              .remirror-list-item-marker-container {
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
      ></Remirror>
    </ThemeProvider>
  )
}
