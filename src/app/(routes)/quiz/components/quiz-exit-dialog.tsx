import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface Props {
  trigger: React.ReactNode
}

export function QuizExitDialog({ trigger }: Props) {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="flex w-full max-w-[320px] flex-col items-center pt-[32px]"
        displayCloseButton={false}
      >
        <DialogHeader className="!text-h4-bold text-gray-09">퀴즈 나가기</DialogHeader>
        <div className="mt-[28px]">
          <ExitDoorIcon />
        </div>
        <p className="mt-[24.9px] text-center text-text-medium text-gray-08">
          현재까지 풀던 퀴즈는 저장되지 않습니다
          <br />
          퀴즈를 중단하고 나가시겠어요?
        </p>
        <DialogClose asChild>
          <Button className="mt-[40px] h-[44px] w-full bg-orange-01 text-orange-05 hover:bg-orange-02">
            퀴즈 계속 풀기
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="mt-[8px] h-[44px] w-full" onClick={() => router.replace('/main')}>
            나가기
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function ExitDoorIcon() {
  return (
    <svg width="82" height="88" viewBox="0 0 82 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30.8105" y="11.6216" width="26.1892" height="70.8649" rx="3.08108" fill="#FFE1AC" />
      <path
        d="M0 14.5505C0 12.9805 1.18047 11.6616 2.74083 11.4883L39.7138 7.38015C41.5389 7.17736 43.1351 8.60602 43.1351 10.4424V83.611C43.1351 85.4667 41.5068 86.9013 39.6659 86.6676L2.69295 81.9726C1.15374 81.7771 0 80.4676 0 78.9161V14.5505Z"
        fill="#FFAB40"
      />
      <rect x="30.8105" y="37.8105" width="6.16216" height="16.9459" rx="1.54054" fill="#FFD180" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.5128 0C80.4387 0 82 1.56128 82 3.48722V14.8207C82 16.7466 80.4387 18.3079 78.5128 18.3079H59.6827L53.7893 23.219C53.2215 23.6922 52.3594 23.2885 52.3594 22.5493L52.3594 18.3079H51.4869C49.5609 18.3079 47.9997 16.7466 47.9997 14.8207V3.48722C47.9997 1.56128 49.5609 0 51.4869 0H78.5128Z"
        fill="#95B0F8"
      />
      <path
        d="M76.7695 5.23096L53.2308 5.23096"
        stroke="#BCCFFF"
        strokeWidth="1.74361"
        strokeLinecap="round"
      />
      <path
        d="M76.7695 8.71826L53.2308 8.71826"
        stroke="#BCCFFF"
        strokeWidth="1.74361"
        strokeLinecap="round"
      />
      <path
        d="M63.4619 12.2051L53.0003 12.2051"
        stroke="#BCCFFF"
        strokeWidth="1.74361"
        strokeLinecap="round"
      />
    </svg>
  )
}
