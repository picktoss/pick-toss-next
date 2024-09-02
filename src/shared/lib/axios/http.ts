import { ServerEnv } from '@/actions/api-client/server-env'
import axios from 'axios'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})
