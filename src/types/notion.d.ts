type NotionText = {
  type: 'text'
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

type NotionParent =
  | { type: 'database_id'; database_id: string }
  | { type: 'page_id'; page_id: string }
  | { type: 'workspace' }

type NotionProperty =
  | { type: 'title'; title: NotionText[] }
  | { type: 'rich_text'; rich_text: NotionText[] }
  | { type: 'number'; number: number | null }
  | { type: 'select'; select: { id: string; name: string; color: string } | null }
  | { type: 'multi_select'; multi_select: { id: string; name: string; color: string }[] }
  | { type: 'date'; date: { start: string; end: string | null } | null }
  | { type: 'people'; people: { id: string; name: string }[] }
  | { type: 'checkbox'; checkbox: boolean }
  | { type: 'url'; url: string | null }
  | { type: 'email'; email: string | null }
  | { type: 'phone_number'; phone_number: string | null }
  | { type: 'formula'; formula: { type: string; value: unknown } }
  | { type: 'relation'; relation: { id: string }[] }
  | { type: 'rollup'; rollup: { type: string; value: unknown } }
  | { type: 'files'; files: { name: string; url: string; type: string }[] }

type NotionPage = {
  id: string
  parent: NotionParent
  created_time: string
  last_edited_time: string
  archived: boolean
  properties: Record<string, NotionProperty> // 각 속성의 이름이 키
  url: string
}

declare namespace Notion {
  type Page = NotionPage
}
