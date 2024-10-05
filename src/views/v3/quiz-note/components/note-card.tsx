import Text from '@/shared/components/text'
import Icon from '@/shared/components/v3/icon'
import { EllipseIcon, FolderFillIcon } from './svg-icons'

// NoteCard 컴포넌트
const NoteCard = () => {
  // data : 노트 제목, 미리보기 문장, 문제 수, 글자수, 소속 폴더 이름 필요
  return (
    <div className="flex h-[104px] max-w-full items-center rounded-[16px] bg-white px-[16px] pb-[20px] pt-[17px]">
      <NoteTypeIcon type="write" />
      <div className="ml-[16px] flex w-full flex-col">
        <h4 className="w-fit text-subtitle2-bold">최근 이슈</h4>
        <Text
          as="p"
          typography="text1-regular"
          className="w-[calc(100%-55px)] truncate text-nowrap break-all text-text-sub"
        >
          미리보기 문장 이러이러합니다 한줄이내로 작성해주세요.
        </Text>
        <Text typography="text2-medium" className="flex w-fit items-center text-text-sub">
          <Text as="span">28문제</Text>
          <EllipseIcon />
          <Text as="span">2382자</Text>
          <EllipseIcon />
          <Text as="span" className="flex items-center">
            <FolderFillIcon className="mr-[2px]" />
            전공 공부
          </Text>
        </Text>
      </div>
    </div>
  )
}

export default NoteCard

// NoteCard 내부에서 사용되는 컴포넌트
function NoteTypeIcon({ type }: { type: 'write' | 'file' | 'notion' }) {
  if (type === 'write') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-orange text-text-primary-inverse">
        <Icon name="document" className="size-[16px]" />
      </div>
    )
  }

  if (type === 'file') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-blue text-text-primary-inverse">
        <Icon name="clip" className="size-[16px]" />
      </div>
    )
  }

  if (type === 'notion') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full border border-border-default bg-background-base-01 text-text-primary-inverse">
        <Icon name="notion" className="size-[19px]" />
      </div>
    )
  }
}
