import { Container, Text, Body, Html, Link, Img } from '@react-email/components'

export default function TodayQuizEmail() {
  return (
    <Html>
      <Body
        style={{
          maxWidth: 500,
          textAlign: 'center',
          color: '#292B2C',
          backgroundColor: '#F5F7F9',
        }}
      >
        <Img src="https://www.picktoss.com/images/mail-today-quiz.png" width="100%" />
        <Container
          style={{
            marginTop: '-50px',
          }}
        >
          <Container>
            <Text
              style={{
                fontWeight: 700,
                color: '#FB7E20',
              }}
            >
              TODAY&apos;s QUIZ
            </Text>
            <Text
              style={{
                fontWeight: 900,
                fontSize: '24px',
                marginTop: '-5px',
              }}
            >
              __TODAY_DATE__ 오늘의 퀴즈
            </Text>
            <Text
              style={{
                fontSize: '12px',
                marginTop: '-12px',
              }}
            >
              __USER_NAME__님을 위해 AI가 선별한 오늘의 퀴즈를 풀어보세요
            </Text>
          </Container>
          <Container
            style={{
              marginTop: '16px',
            }}
          >
            <Link
              href="https://www.picktoss.com"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                background: '#FB7E20',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              오늘의 퀴즈 시작하기
            </Link>
          </Container>
          <Container
            style={{
              marginTop: '30px',
            }}
          >
            <Text>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                CONTACT
              </span>{' '}
              <span
                style={{
                  fontSize: '12px',
                }}
              >
                support@picktoss.com
              </span>
            </Text>
            <Text
              style={{
                fontSize: '11px',
                color: '#A2A6AB',
                marginTop: '-16px',
              }}
            >
              ⓒ 2024. picktoss all rights reserved
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}
