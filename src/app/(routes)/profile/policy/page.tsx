import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'

const PolicyPage = () => {
  return (
    <main className="h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden pt-[8px]">
      <Link
        href="https://picktoss.notion.site/1209d818f56080fbb469e82def758e9c?pvs=4"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between px-[16px] py-[12px]"
      >
        <Text typography="subtitle2-medium">개인정보 처리방침</Text>
        <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
      </Link>
      <Link
        href="https://picktoss.notion.site/1209d818f560809aad11c5b64020d735?pvs=4"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between px-[16px] py-[12px]"
      >
        <Text typography="subtitle2-medium">서비스 이용약관</Text>
        <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
      </Link>
    </main>
  )
}

export default PolicyPage
