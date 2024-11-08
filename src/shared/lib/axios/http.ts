import { ServerEnv } from '@/actions/api-client/server-env'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import axios from 'axios'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(async (config) => {
  const session = await auth()

  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`
  }
  return config
})
