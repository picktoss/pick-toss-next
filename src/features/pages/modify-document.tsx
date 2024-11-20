import { useState } from 'react'
import TitleInput from '../write/components/title-input'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Editor from '../write/components/editor'
import { MAX_CHARACTERS, MIN_CHARACTERS } from '../document/config'

const ModifyDocument = () => {
  // document id로 문서 정보 가져와 기존 title과 content 설정
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <>
      <TitleInput value={title} handleChange={setTitle} />

      <div className="sticky top-[54px] z-10 flex items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
        <div className="flex items-center">
          <Icon name="info" className="mr-[4px] size-[16px]" />
          <Text as="span" typography="text2-medium" className="text-text-caption">
            최소 {MIN_CHARACTERS}자, 최대 {MAX_CHARACTERS}자 입력 가능
          </Text>
        </div>
        <Text typography="text1-medium" className="text-text-secondary">
          <Text
            as="span"
            color={
              content.length < MIN_CHARACTERS || content.length > MAX_CHARACTERS
                ? 'critical'
                : 'info'
            }
          >
            {content.length}
          </Text>{' '}
          / {MAX_CHARACTERS}
        </Text>
      </div>

      <Editor initialContent={content} handleContentChange={setContent} />
    </>
  )
}

export default ModifyDocument
