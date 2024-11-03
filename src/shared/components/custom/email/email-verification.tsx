import { Container, Heading, Text, Img, Body, Html } from '@react-email/components'

export default function EmailVerificationEmail() {
  return (
    <Html>
      <Body
        style={{
          maxWidth: 500,
          color: '#4B4F54',
        }}
      >
        <Container
          style={{
            backgroundColor: '#F5F7F9',
            textAlign: 'center',
          }}
        >
          <Heading>
            <Img
              src="https://picktoss-dev-bucket.s3.amazonaws.com/email-icon.png"
              width="50px"
              style={{
                margin: '0 auto',
                paddingTop: '20px',
              }}
            />
            <Text
              style={{
                fontSize: '18px',
                marginTop: '10px',
                fontWeight: 600,
              }}
            >
              이메일 인증 코드
            </Text>
          </Heading>
          <Container
            style={{
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text
              style={{
                fontSize: '12px',
                paddingTop: '10px',
                marginBottom: '10px',
              }}
            >
              아래 코드를 입력하여 이메일 인증을 완료해주세요
            </Text>
            <Text
              style={{
                backgroundColor: '#FFECD0',
                padding: '20px 0',
                borderRadius: '12px',
                margin: '0 40px',
                marginBottom: '45px',
                fontSize: '30px',
                fontWeight: 900,
                color: '#FB7E20',
              }}
            >
              __VERIFICATION_CODE__
            </Text>
          </Container>
          <Container>
            <Img
              src="https://picktoss-dev-bucket.s3.amazonaws.com/logo-black-icon.png"
              width="100px"
              style={{
                margin: '0 auto',
                marginTop: '20px',
              }}
            />
            <Text
              style={{
                marginTop: '5px',
                fontSize: '12px',
                color: '#A2A6AB',
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
