export const isAppLaunched = (): boolean => {
  if (typeof window !== 'undefined') {
    const isPWA =
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')

    return isPWA
  }
  return false
}

export const checkPWAAppLaunched = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('isPwaApp') === 'true'
  }
}

export const setPWAAppLaunched = (launched: boolean) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('isPwaApp', launched.toString())
  }
}
