import { createEndPoint } from './utils/create-end-point'

export const user = {
  getUser: () => createEndPoint({ url: '/members/info', method: 'GET' }),
  updateUserName: () =>
    createEndPoint({ url: '/members/update-name', method: 'PATCH', auth: true }),
  updateQuizNotification: () =>
    createEndPoint({
      url: '/members/update-quiz-notification',
      method: 'PATCH',
      auth: true,
    }),
}
