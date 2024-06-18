import { Header } from './components/header'
import { PowerUpQuiz } from './sections/power-up-quiz'
import { Repository } from './sections/repository'
import { Review } from './sections/review'
import { TodayQuiz } from './sections/today-quiz'
import { Footer } from './components/footer'
import { Intro } from './components/intro'
import { VariousCategories } from './components/various-categories'

export default function Landing() {
  return (
    <div className="bg-white scrollbar-hide">
      <Header />
      <Intro />
      <div>
        <Repository />
        <PowerUpQuiz />
        <TodayQuiz />
        <Review />
      </div>
      <VariousCategories />
      <Footer />
    </div>
  )
}
