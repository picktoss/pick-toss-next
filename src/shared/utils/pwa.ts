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
