import RandomQuizView from '@/features/quiz/screen/random-quiz-view'
import { getBookmarkedCollections } from '@/requests/collection'

const RandomQuiz = async () => {
  const bookmarkedCollections = await getBookmarkedCollections()

  return <RandomQuizView bookmarkedCollections={bookmarkedCollections} />
}

export default RandomQuiz
