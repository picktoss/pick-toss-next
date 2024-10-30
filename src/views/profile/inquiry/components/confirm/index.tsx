'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import TermsAndConditionsDrawer from '../terms-and-conditions-drawer'
import { Button } from '@/shared/components/ui/button'
import { useInquiry } from '../../context/inquiry-context'

const Confirm = () => {
  const { isAgreeChecked, setIsAgreeChecked } = useInquiry()

  return (
    <div className="px-[16px] pb-[36px] pt-[7px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <Checkbox
            checked={isAgreeChecked}
            onCheckedChange={(checked) =>
              typeof checked === 'boolean' && setIsAgreeChecked(checked)
            }
            id="checkAgreement"
          />
          <Label htmlFor="checkAgreement">
            <Text typography="text2-medium" className="text-text-primary">
              개인정보 수집 및 이용동의
            </Text>
          </Label>
        </div>
        <TermsAndConditionsDrawer setIsAgreeChecked={setIsAgreeChecked} />
      </div>

      <Button
        variant={'largeRound'}
        colors={'primary'}
        className="mt-[9px] w-full"
        disabled={!isAgreeChecked}
      >
        문의 보내기
      </Button>
    </div>
  )
}

export default Confirm
