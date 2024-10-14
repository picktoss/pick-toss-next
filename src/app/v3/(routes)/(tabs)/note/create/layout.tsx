import Text from '@/shared/components/text'
import Icon from '@/shared/components/v3/icon'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

const CreateLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-[430px] translate-x-1/2 border-b border-border-divider bg-background-base-01 px-[16px] transition-all">
        <div className="flex size-full items-center justify-between">
          <div className="flex items-center">
            <button>
              <Icon name="cancel" className="size-[24px]" />
            </button>
          </div>
          <div className="flex items-center text-text1-medium">
            <Text className="mr-[12px] text-text-sub">폴더</Text>
            <div className="rounded-full bg-background-base-02 px-[16px] py-[5px]">
              📊 전공 공부
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}

export default CreateLayout
