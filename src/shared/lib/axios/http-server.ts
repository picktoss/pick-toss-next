import { ServerEnv } from '@/actions/api-client/server-env'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import axios, { isAxiosError } from 'axios'

export const httpServer = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

httpServer.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      throw new Error('httpServer should only be used in server-side code.')
    }

    const session = await auth()
    const token = session?.user?.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpServer.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (isAxiosError(error)) {
      console.error(error.response?.data)
    }
    return Promise.reject(error)
  }
)
