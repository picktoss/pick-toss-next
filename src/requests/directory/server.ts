'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

/**
 * 모든 디렉토리 가져오기
 */
export const getDirectories = async () => {
  try {
    const { data } = await httpServer.get<Directory.Response.GetDirectories>(
      API_ENDPOINTS.DIRECTORY.GET.ALL
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
