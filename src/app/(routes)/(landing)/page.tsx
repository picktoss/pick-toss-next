import { Header } from './components/header'
import { Footer } from './components/footer'
import { Intro } from './components/intro'

export default function Landing() {
  return (
    <div className="bg-white scrollbar-hide">
      <Header />
      <Intro />
      {/* 기존 레거시 컴포넌트들 삭제했습니다 */}
      <Footer />
    </div>
  )
}
