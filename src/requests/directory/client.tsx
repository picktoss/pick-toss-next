'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/**
 * 모든 디렉토리 가져오기
 */
export const getDirectories = async () => {
  try {
    const { data } = await http.get<Directory.Response.GetDirectories>(
      API_ENDPOINTS.DIRECTORY.GET.ALL
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/**
 * directory_id로 디렉토리 가져오기
 */
export const fetchDirectory = async (directoryId: Directory.Item['id']) => {
  try {
    const { data } = await http.get<Directory.Response.GetDirectory>(
      API_ENDPOINTS.DIRECTORY.GET.BY_ID(directoryId)
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/**
 * 디렉토리 생성
 */
export const createDirectory = async ({ name, emoji }: Directory.Request.CreateDirectory) => {
  try {
    const { data } = await http.post<Directory.Response.CreateDirectory>(
      API_ENDPOINTS.DIRECTORY.POST.CREATE,
      { name, emoji }
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/**
 * 디렉토리 정보 변경
 */
export const updateDirectoryInfo = async ({
  directoryId,
  name,
  emoji,
}: {
  directoryId: Directory.Item['id']
} & Directory.Request.UpdateDirectoryInfo) => {
  try {
    await http.patch(API_ENDPOINTS.DIRECTORY.PATCH.UPDATE_INFO(directoryId), { name, emoji })
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/**
 * 디렉토리 삭제
 */
export const deleteDirectory = async (directoryId: Directory.Item['id']) => {
  try {
    await http.delete(API_ENDPOINTS.DIRECTORY.DELETE.BY_ID(directoryId))
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
