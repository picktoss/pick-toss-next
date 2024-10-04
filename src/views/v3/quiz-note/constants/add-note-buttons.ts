export const addNoteButtons = [
  { key: 'pencil', position: 76 },
  { key: 'clip', position: 144 },
  { key: 'notion', position: 212 },
] as const

export const addNoteText = [
  {
    key: 'pencil',
    bottomCss: 'bottom-[212.5px]',
    rightCss: 'right-[86px]',
    content: '직접 작성하기',
  },
  {
    key: 'clip',
    bottomCss: 'bottom-[280.5px]',
    rightCss: 'right-[86px]',
    content: '파일 업로드하기',
  },
  {
    key: 'notion',
    bottomCss: 'bottom-[348.5px]',
    rightCss: 'right-[86px]',
    content: '페이지 연동하기',
  },
] as const
