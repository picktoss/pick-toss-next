'use client'

import { ServerEnv } from '@/actions/api-client/server-env'
import axios, { isAxiosError } from 'axios'
import { getSession } from 'next-auth/react'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  async (config) => {
    const session = await getSession()
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
