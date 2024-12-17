import { signOut } from '@/app/api/auth/[...nextauth]/auth'
import Text from '@/shared/components/ui/text'
import ConfirmDialogWidget from '@/widget/confirm-dialog'

interface Props {
  trigger: React.ReactNode
}

const LogoutDialog = ({ trigger }: Props) => {
  return (
    <ConfirmDialogWidget
      triggerComponent={trigger}
      content={<Text typography="subtitle2-bold">로그아웃 하시겠어요?</Text>}
      confirmButton={
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
          className="ml-[21px]"
        >
          <button className="p-[4px]">
            <Text color="critical">로그아웃</Text>
          </button>
        </form>
      }
    />
  )
}

export default LogoutDialog
