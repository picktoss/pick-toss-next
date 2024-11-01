import DetailInfoWithQuizzes from '@/features/collection/components/detail-info-with-quizzes'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'

const CollectionDetailPage = () => {
  return (
    <>
      <DetailInfoWithQuizzes />
      <FixedBottom>
        <Link href="#">
          <Button className="w-full">퀴즈 시작하기</Button>
        </Link>
      </FixedBottom>
    </>
  )
}

export default CollectionDetailPage
