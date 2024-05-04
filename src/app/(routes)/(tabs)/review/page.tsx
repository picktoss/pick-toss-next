import Profile from '@/components/profile'
import { Button } from '@/components/ui/button'

export default function Review() {
  return (
    <div>
      <Profile trigger={<Button>프로필 열기</Button>} />
    </div>
  )
}
