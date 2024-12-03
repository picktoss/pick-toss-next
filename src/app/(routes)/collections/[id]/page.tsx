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
          {/* 이동 /quiz/[id] - searchParams로 collectionId, createdAt, collectionName, collectionEmoji 넣어서 */}
          <Button className="w-full">퀴즈 시작하기</Button>
        </Link>
      </FixedBottom>
    </>
  )
}

export default CollectionDetailPage
