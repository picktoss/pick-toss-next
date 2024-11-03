import EmailVerificationEmail from '@/shared/components/custom/email/email-verification'
import TodayQuizEmail from '@/shared/components/custom/email/today-quiz'
import { render } from '@react-email/render'
import { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const type = searchParams.get('type') as 'today_quiz' | 'email_verification'

  if (!type) {
    return new Response('Invalid type', {
      status: 400,
    })
  }

  const rendered =
    type === 'today_quiz' ? render(<TodayQuizEmail />) : render(<EmailVerificationEmail />)

  return Response.json({
    content: rendered.replaceAll('"', "'"),
  })
}
