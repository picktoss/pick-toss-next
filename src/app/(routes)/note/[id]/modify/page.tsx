import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import VisualEditor from '@/features/editor/components/visual-editor'
import TitleInput from '@/features/editor/components/title-input'
import { CreateNoteProvider } from '@/features/editor/context/create-note-context'

const ModifyPage = () => {
  return (
    <CreateNoteProvider prevTitle="최근 이슈" prevContent="기존 노트 내용...">
      <TitleInput />

      <div className="sticky top-[54px] z-10 flex items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
        <div className="flex items-center">
          <Icon name="info" className="mr-[4px] size-[16px]" />
          <Text as="span" typography="text2-medium" className="text-text-caption">
            최소 500자, 최대 15000자 입력 가능
          </Text>
        </div>
        <Text typography="text1-medium" className="text-text-secondary">
          <span className="text-text-caption">{0}</span> / 15000
        </Text>
      </div>

      <VisualEditor />
    </CreateNoteProvider>
  )
}

export default ModifyPage
