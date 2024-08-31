import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '../svgs'

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" className="ml-[-12px]" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </Button>
  )
}
