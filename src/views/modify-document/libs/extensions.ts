import jsx from 'refractor/lang/jsx.js'
import javascript from 'refractor/lang/javascript.js'
import typescript from 'refractor/lang/typescript.js'
import { ExtensionPriority } from 'remirror'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from 'remirror/extensions'

export const extensions = () => [
  new LinkExtension({ autoLink: true }),
  new BoldExtension({}),
  new StrikeExtension({}),
  new ItalicExtension({}),
  new HeadingExtension({}),
  new BlockquoteExtension({}),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension({}),
  new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
  new CodeExtension({}),
  new CodeBlockExtension({ supportedLanguages: [jsx, javascript, typescript] }),
  new TrailingNodeExtension({}),
  new TableExtension({}),
  new MarkdownExtension({ copyAsMarkdown: false }),
  /**
   * `HardBreakExtension` allows us to create a newline inside paragraphs.
   * e.g. in a list item
   */
  new HardBreakExtension({}),
]
