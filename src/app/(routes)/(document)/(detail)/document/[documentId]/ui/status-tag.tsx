import { DocumentStatus } from '@/apis/types/dto/document.dto'
import { SwitchCase } from '@/shared/components/react/switch-case'
import { cn } from '@/shared/lib/utils'

interface Props {
  status: DocumentStatus
}

export function StatusTag({ status }: Props) {
  return (
    <div
      className={cn(
        'rounded-[4px] px-[9px] py-[2px] !text-tag bg-gray-02 text-gray-07',
        (status === 'UNPROCESSED' || status === 'KEYPOINT_UPDATE_POSSIBLE') &&
          'bg-orange-01 text-orange-06'
      )}
    >
      <SwitchCase
        value={status}
        caseBy={{
          UNPROCESSED: <span>pick 생성 가능</span>,
          KEYPOINT_UPDATE_POSSIBLE: <span>pick 갱신 필요</span>,
        }}
        defaultComponent={<span>최신 상태</span>}
      />
    </div>
  )
}
