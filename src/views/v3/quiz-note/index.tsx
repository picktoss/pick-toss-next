import { cn } from '@/shared/lib/utils'
import Header from './components/header'
import note_img from './assets/note.png'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import Icon from '@/shared/components/v3/icon'

const isDesktop = false

const QuizNote = () => {
  return (
    <div
      className={cn(
        'flex flex-col h-screen w-screen text-text-primary',
        isDesktop && 'max-w-[430px]'
      )}
    >
      <div className="flex grow flex-col bg-background-base-02 px-[14px]">
        <Header />
        <div className="flex-center grow">
          {/* 노트가 하나도 없을 경우 아래 렌더링 */}
          <div className="flex-center relative size-[202px] flex-col">
            <Image src={note_img} alt="노트 작성" objectPosition="center" width={100} />
            <div className="flex-center mx-[12px] grow flex-col">
              <h3 className="mb-[8px] text-title3">노트를 등록해보세요</h3>
              <p className="text-center text-text1-medium text-text-sub">
                직접 추가하거나 연동한 노트에서 <br /> 퀴즈를 만들 수 있어요
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-[32px] mr-[8px] self-end">
          {/* 아래 버튼 클릭 시 new note 애니메이션과 화면 필요 */}
          <Button variant="mediumIcon" colors="special">
            <Icon name="add" className="size-[24px] text-text-primary-inverse" />
          </Button>

          <Button
            variant="mediumIcon"
            colors="outlined"
            className="absolute bottom-[52px] right-0 mb-[24px]"
          ></Button>
        </div>
      </div>
      <div className="h-[88px] w-full bg-background-base-01"></div>
    </div>
  )
}

export default QuizNote
