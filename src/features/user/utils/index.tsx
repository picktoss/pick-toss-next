export const getGravatarUrl = async (email: string) => {
  if (!email) return getDefaultGravatarUrl()

  const hash = await getHashFromEmail(email)

  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=200`
}

const getHashFromEmail = async (email: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(email.toLowerCase().trim())

  const hashBuffer = await crypto.subtle.digest('MD5', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hash
}

function getDefaultGravatarUrl(): string {
  return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}
