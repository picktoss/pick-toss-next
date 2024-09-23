import { DocumentStatus } from '@/actions/types/dto/document.dto'
import { AIPickDialog } from '@/shared/components/ai-pick-dialog'
import { SwitchCase } from '@/shared/components/react/switch-case'
import icons from '@/constants/icons'
import Image from 'next/image'
import { GradientStarsIcon } from './pick-icons'

interface Props {
  status: DocumentStatus
  rePick: () => void
}

export function PickBanner({ status, rePick }: Props) {
  return (
    <SwitchCase
      value={status}
      caseBy={{
        PROCESSED: (
          <div className="flex items-center justify-between rounded-[8px] bg-blue-01 py-[16px] pl-[14px] pr-[18px]">
            <div className="flex items-center gap-[8px]">
              <Image src={icons.pin} width={24} height={24} alt="" />
              <div className="text-small1-bold text-blue-06 lg:text-text-bold">
                픽토스 AI의 질문을 통해 내용을 돌아보세요
              </div>
            </div>
          </div>
        ),
        KEYPOINT_UPDATE_POSSIBLE: (
          <div className="flex items-center justify-between rounded-[8px] bg-gray-01 px-[16px] py-[21px]">
            <div className="flex items-center gap-[8px]">
              <GradientStarsIcon />
              <div className="text-small1-bold text-gray-08 lg:text-text-medium">
                퀴즈와 요약에 수정한 내용을 반영해보세요
              </div>
            </div>
            <AIPickDialog
              trigger={
                <div role="button" className="p-[5px] text-small1-bold text-orange-06">
                  pick 다시하기
                </div>
              }
              confirm={() => rePick()}
            />
          </div>
        ),
      }}
      defaultComponent={null}
    />
  )
}
