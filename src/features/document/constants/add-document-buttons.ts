export const addDocumentButtons = [
  {
    key: 'pencil',
    position: 76,
    text: { bottomCss: 'bottom-[89.5px]', content: '직접 작성하기' },
    href: '/document/editor',
  },
  {
    key: 'clip',
    position: 144,
    text: { bottomCss: 'bottom-[157.5px]', content: '파일 업로드하기' },
    href: '/document/file',
  },
  {
    key: 'notion',
    position: 212,
    text: { bottomCss: 'bottom-[225.5px]', content: '페이지 연동하기' },
    href: '/document/notion',
  },
] as const
