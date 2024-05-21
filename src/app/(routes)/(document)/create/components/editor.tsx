import '@remirror/styles/all.css'

import { css } from '@emotion/css'
import React from 'react'
import { getThemeVar } from 'remirror'
import {
  MarkdownToolbar,
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
        autoFocus
        manager={manager}
        autoRender="end"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onChange={({ helpers, state }) => setState(helpers.getMarkdown(state))}
        initialContent={state}
        classNames={[
          css`
            &.ProseMirror {
              p,
              h3,
              h4 {
                margin-top: ${getThemeVar('space', 2)};
                margin-bottom: ${getThemeVar('space', 2)};
              }

              h1,
              h2 {
                margin-bottom: ${getThemeVar('space', 3)};
                margin-top: ${getThemeVar('space', 3)};
              }
            }
          `,
        ]}
      >
        <MarkdownToolbar />
      </Remirror>
    </ThemeProvider>
  )
}
