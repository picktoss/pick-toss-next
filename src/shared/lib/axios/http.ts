import { ServerEnv } from '@/actions/api-client/server-env'
import axios, { AxiosResponse } from 'axios'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(<T>(res: AxiosResponse<T>) => res.data)
