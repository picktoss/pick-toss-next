'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/**
 * 모든 디렉토리 가져오기
 */
export const fetchDirectories = async () => {
  const session = await auth()

  try {
    const { data } = await http.get<Directory.Response.GetDirectories>(
      API_ENDPOINTS.DIRECTORY.GET.ALL,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
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
  const session = await auth()

  try {
    const { data } = await http.get<Directory.Response.GetDirectory>(
      API_ENDPOINTS.DIRECTORY.GET.BY_ID(directoryId),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
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
  const session = await auth()

  try {
    const { data } = await http.post<Directory.Response.CreateDirectory>(
      API_ENDPOINTS.DIRECTORY.POST.CREATE,
      { name, emoji },
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
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
  const session = await auth()

  try {
    await http.patch(
      API_ENDPOINTS.DIRECTORY.PATCH.UPDATE_INFO(directoryId),
      { name, emoji },
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/**
 * 디렉토리 삭제
 */
export const deleteDirectory = async (directoryId: Directory.Item['id']) => {
  const session = await auth()

  try {
    await http.delete(API_ENDPOINTS.DIRECTORY.DELETE.BY_ID(directoryId), {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
