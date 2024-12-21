import RandomQuizView from '@/features/quiz/screen/random-quiz-view'
import { getDirectories } from '@/requests/directory/server'

const RandomQuiz = async () => {
  const directories = await getDirectories()

  const directoriesHasDocuments = directories.directories.filter(
    (directory) => directory.documentCount > 0
  )

  return <RandomQuizView directories={directoriesHasDocuments} />
}

export default RandomQuiz
