'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

export const getUserInfo = async () => {
  try {
    const { data } = await httpServer.get<User.Info>(API_ENDPOINTS.USER.GET.INFO)
    return data
  } catch (error: unknown) {
    throw error
  }
}
