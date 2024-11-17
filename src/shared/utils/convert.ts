import { Client } from '@notionhq/client/build/src'
import { NotionToMarkdown } from 'notion-to-md'

// 노션 페이지를 마크다운 파일로 변환하는 함수
export async function convertPagesToMarkdownFile(
  notionAccessToken: string,
  pageIds: string[]
): Promise<{ file: Buffer; content: string }> {
  const notionClient = new Client({
    auth: notionAccessToken,
    notionVersion: '2022-06-28',
  })
  const n2m = new NotionToMarkdown({ notionClient })

  const markdownResults = await Promise.all(
    pageIds.map((pageId) => fetchSinglePageToMarkdown(notionClient, n2m, pageId))
  )

  const combinedMarkdown = markdownResults
    .filter((markdown) => markdown.trim() !== '') // 실패한 페이지 제거
    .join('\n\n')

  return { file: Buffer.from(combinedMarkdown, 'utf-8'), content: combinedMarkdown }
}

async function fetchSinglePageToMarkdown(
  notionClient: Client,
  n2m: NotionToMarkdown,
  pageId: string
): Promise<string> {
  try {
    const blocks = await notionClient.blocks.children.list({
      block_id: pageId,
    })

    const mdBlocks = await n2m.blocksToMarkdown(blocks.results)
    const markdown = n2m.toMarkdownString(mdBlocks)

    return JSON.stringify(markdown)
  } catch (error) {
    console.error(`Failed to fetch or convert page ${pageId} to Markdown:`, error)
    return ''
  }
}
