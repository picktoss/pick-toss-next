/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import check from '../../public/icons/check.svg'
import chevronDown from '../../public/icons/chevron-down.svg'
import chevronRight from '../../public/icons/chevron-right.svg'
import bell from '../../public/icons/bell.svg'
import calendar from '../../public/icons/calendar.svg'
import kakao from '../../public/icons/kakao.svg'
import mobileApp from '../../public/icons/mobile-app.svg'
import link from '../../public/icons/link.svg'
import powerUpQuiz from '../../public/icons/power-up-quiz.svg'
import search from '../../public/icons/search.svg'
import star from '../../public/icons/star.svg'
import circleQuestion from '../../public/icons/circle-question.svg'
import kebab from '../../public/icons/kebab.svg'
import pin from '../../public/icons/pin.svg'
import google from '../../public/icons/google.svg'
import file from '../../public/icons/file.svg'
import plus from '../../public/icons/plus.svg'
import quizReady from '../../public/icons/quiz-ready.svg'
import quizNotReady from '../../public/icons/quiz-not-ready.svg'
import quizDone from '../../public/icons/quiz-done.svg'
import arrowRight from '../../public/icons/arrow-right.svg'
import logOut from '../../public/icons/log-out.svg'
import ranking from '../../public/icons/ranking.svg'
import quizArchive from '../../public/icons/quiz-archive.svg'
import savePick from '../../public/icons/save-pick.svg'
import timer from '../../public/icons/timer.svg'

const icons = {
  check,
  chevronDown,
  bell,
  calendar,
  kakao,
  mobileApp,
  link,
  powerUpQuiz,
  search,
  star,
  circleQuestion,
  kebab,
  pin,
  google,
  file,
  plus,
  quizReady,
  quizNotReady,
  quizDone,
  arrowRight,
  logOut,
  chevronRight,
  ranking,
  quizArchive,
  savePick,
  timer,
}

export default icons as Record<keyof typeof icons, StaticImport>
