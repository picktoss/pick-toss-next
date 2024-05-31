import '@remirror/styles/all.css'
import '../styles/remirror-custom.css'

import { css } from '@emotion/css'
import React from 'react'
import {
  // MarkdownToolbar,
  ReactExtensions,
  Remirror,
  ThemeProvider,
  UseRemirrorReturn,
} from '@remirror/react'

interface VisualEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: UseRemirrorReturn<ReactExtensions<any>>
}

export const VisualEditor = ({ visual }: VisualEditorProps) => {
  const { manager, state, setState } = visual

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoRender="end"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onChange={({ helpers, state }) => setState(helpers.getMarkdown(state))}
        initialContent={state}
        placeholder="본문을 작성해보세요!"
        classNames={[
          css`
            &.ProseMirror {
              padding: 16px 20px;
              min-width: 100vw;
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
          'prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm !shadow-none sm:prose-base lg:prose-lg xl:prose-md focus:outline-none',
        ]}
      >
        {/* <MarkdownToolbar /> */}
      </Remirror>
    </ThemeProvider>
  )
}
