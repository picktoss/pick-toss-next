import RandomQuizView from '@/features/quiz/screen/random-quiz-view'
import { getBookmarkedCollections, getMyCollections } from '@/requests/collection/server'
import { getDirectories } from '@/requests/directory/server'

const RandomQuiz = async () => {
  const [bookmarkedCollections, myCollections, directories] = await Promise.all([
    getBookmarkedCollections(),
    getMyCollections(),
    getDirectories(),
  ])

  const directoriesHasDocuments = directories.directories.filter(
    (directory) => directory.documentCount > 0
  )

  return (
    <RandomQuizView
      collections={[...bookmarkedCollections.collections, ...myCollections.collections]}
      directories={directoriesHasDocuments}
    />
  )
}

export default RandomQuiz
