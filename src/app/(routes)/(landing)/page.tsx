import { Header } from './components/header'
import { PowerUpQuiz } from './sections/power-up-quiz'
import { Repository } from './sections/repository'
import { TodayQuiz } from './sections/today-quiz'

export default function Landing() {
  return (
    <div className="bg-white scrollbar-hide">
      <Header />
      <Repository />
      <PowerUpQuiz />
      <TodayQuiz />
    </div>
  )
}
