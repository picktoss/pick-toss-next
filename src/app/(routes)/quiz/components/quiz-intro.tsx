import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import { getCurrentDate } from '@/utils/date'
import { motion } from 'framer-motion'

export default function QuizIntro({ quizzes }: { quizzes: QuizDTO[] }) {
  return (
    <motion.div
      className="mx-[20px] mt-[43px] flex flex-col items-center gap-[55px] rounded-[16px] bg-white pb-[115px] pt-[99px]"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-[8px]">
        <div className="text-h3-bold text-gray-08">오늘의 퀴즈</div>
        <div className="text-body1-medium text-gray-07">{getCurrentDate()}</div>
      </div>
      <DocumentListIcon />
      <div className="flex flex-col gap-[8px]">
        {Object.entries(getEachCategoryCount(quizzes)).map(([key, value]) => (
          <div
            key={key}
            className="flex min-w-[198px] justify-between rounded-[48px] bg-gray-01 px-[24px] py-[12px]"
          >
            <div className="text-body2-medium text-gray-08">{key}</div>
            <div className="text-body1-bold text-orange-06">{value}개</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const getEachCategoryCount = (quizzes: QuizDTO[]) => {
  return quizzes.reduce((acc, quiz) => {
    acc[quiz.category.name] = (acc[quiz.category.name] ?? 0) + 1
    return acc
  }, {} as { [key: string]: number })
}

function DocumentListIcon() {
  return (
    <svg width="66" height="85" viewBox="0 0 66 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="8" width="66" height="77" rx="7.74603" fill="#95B0F8" />
      <rect x="8" y="13" width="56" height="67" rx="6.1" fill="#7095F8" />
      <rect x="6.06738" y="12.6826" width="52.8667" height="63.0333" rx="5.80952" fill="#F5F7F9" />
      <path
        d="M14.2007 42.6509L50.8007 42.6509"
        stroke="#EAECEF"
        strokeWidth="2.97561"
        strokeLinecap="round"
      />
      <path
        d="M14.2007 50.7849L50.8007 50.7849"
        stroke="#EAECEF"
        strokeWidth="2.97561"
        strokeLinecap="round"
      />
      <path
        d="M14.2007 58.9175L38.6007 58.9175"
        stroke="#EAECEF"
        strokeWidth="2.97561"
        strokeLinecap="round"
      />
      <path
        d="M20.2993 11.1333V9.1C20.2993 5.73106 23.0304 3 26.3993 3H38.5993C41.9683 3 44.6993 5.73106 44.6993 9.1V11.1333"
        stroke="#D2D6DB"
        strokeWidth="4.06667"
        strokeLinecap="round"
      />
      <rect x="14.5874" y="6.87305" width="35.8254" height="7.74603" rx="2.03333" fill="#EAECEF" />
      <path
        d="M18.8355 21.0887C19.3877 20.0067 20.9338 20.0067 21.4859 21.0887L22.9387 23.9354C23.1549 24.359 23.5605 24.6537 24.0302 24.7284L27.1865 25.2304C28.3861 25.4212 28.8639 26.8916 28.0055 27.7511L25.7471 30.0124C25.411 30.3489 25.2561 30.8258 25.3302 31.2955L25.8281 34.4524C26.0173 35.6524 24.7666 36.5611 23.6838 36.0103L20.8353 34.5612C20.4114 34.3456 19.91 34.3456 19.4861 34.5612L16.6376 36.0103C15.5549 36.5611 14.3041 35.6524 14.4934 34.4524L14.9913 31.2955C15.0654 30.8258 14.9104 30.3489 14.5744 30.0124L12.316 27.7511C11.4576 26.8916 11.9353 25.4212 13.135 25.2304L16.2912 24.7284C16.7609 24.6537 17.1666 24.359 17.3828 23.9354L18.8355 21.0887Z"
        fill="#FFAB40"
      />
    </svg>
  )
}
