import { Header } from './components/header'
import { PowerUpQuiz } from './sections/power-up-quiz'
import { Repository } from './sections/repository'

export default function Landing() {
  return (
    <div className="scrollbar-hide">
      <Header />
      <Repository />
      <PowerUpQuiz />
    </div>
  )
}
