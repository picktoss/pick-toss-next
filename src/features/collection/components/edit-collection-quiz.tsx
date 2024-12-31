import { useCollectionInfo } from '@/requests/collection/hooks'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditCollectionQuiz = () => {
  const { id } = useParams()
  const { data: collectionInfoData } = useCollectionInfo(Number(id))
  const [quizzes, setQuizzes] = useState<Omit<Quiz.Item, 'document' | 'directory'>[]>([])

  useEffect(() => {
    if (!collectionInfoData) {
      return
    }

    setQuizzes(collectionInfoData.quizzes)
  }, [collectionInfoData])

  console.log(quizzes)

  return null
}

export default EditCollectionQuiz
