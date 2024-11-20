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

// 링크 방식일 때
// 노션 페이지를 마크다운 파일로 변환하는 함수
// export async function convertPagesToMarkdownFile(
//   notionAccessToken: string,
//   notionLinks: string[]
// ): Promise<{ content: string }> {
//   const notionClient = new Client({
//     auth: notionAccessToken,
//     notionVersion: '2022-06-28',
//   })
//   const n2m = new NotionToMarkdown({ notionClient })

//   const markdownResults = await Promise.all(
//     notionLinks.map(async (link) => {
//       const pageId = extractPageIdFromLink(link) // 링크에서 페이지 ID 추출
//       return fetchSinglePageToMarkdown(notionClient, n2m, pageId)
//     })
//   )

//   const combinedMarkdown = markdownResults
//     .filter((markdown) => markdown.trim() !== '') // 실패한 페이지 제거
//     .join('\n\n')

//   return { content: combinedMarkdown }
// }

// // 링크에서 노션 페이지 ID 추출
// function extractPageIdFromLink(link: string): string {
//   // 노션 링크의 형식: https://www.notion.so/{workspace}/{pageId}-{slug}
//   const regex = /([a-f0-9]{32})/ // 32자리의 페이지 ID 추출
//   const match = link.match(regex)
//   if (!match) throw new Error(`Invalid Notion link: ${link}`)
//   return match[1]
// }
