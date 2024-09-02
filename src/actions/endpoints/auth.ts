import { createEndPoint } from './utils/create-end-point'

export const auth = {
  signIn: () => createEndPoint({ url: '/login', method: 'POST', auth: true }),
  verifyEmail: () => createEndPoint({ url: '/auth/verification', method: 'POST', auth: true }),
  verifyEmailCheck: () =>
    createEndPoint({ url: '/auth/verification/check', method: 'POST', auth: true }),
}
