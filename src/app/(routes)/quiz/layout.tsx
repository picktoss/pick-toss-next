import { Viewport } from 'next'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
}

const QuizLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1072px] px-[20px]">{children}</div>
    </div>
  )
}

export default QuizLayout
