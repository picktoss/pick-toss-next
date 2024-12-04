import { ServerEnv } from '@/actions/api-client/server-env'
import axios, { isAxiosError } from 'axios'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
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
