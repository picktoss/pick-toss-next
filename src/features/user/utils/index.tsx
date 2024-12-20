import { createHash } from 'crypto'

export const getGravatarUrl = (email: string): string => {
  if (!email) return getDefaultGravatarUrl()

  const hash = createHash('md5').update(email.toLowerCase().trim()).digest('hex')

  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=200`
}

function getDefaultGravatarUrl(): string {
  return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}
