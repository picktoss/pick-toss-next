import RandomQuizView from '@/features/quiz/screen/random-quiz-view'
import { getBookmarkedCollections } from '@/requests/collection/server'

const RandomQuiz = async () => {
  const bookmarkedCollections = await getBookmarkedCollections()

  return <RandomQuizView collections={bookmarkedCollections.collections} directories={[]} />
}

export default RandomQuiz
