'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createDirectory,
  deleteDirectory,
  fetchDirectories,
  fetchDirectory,
  updateDirectoryInfo,
} from '.'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'

/**
 * 모든 디렉토리 조회 Hook
 */
export const useDirectories = () => {
  return useQuery({
    queryKey: ['directories'],
    queryFn: async () => fetchDirectories(),
  })
}

/**
 * 특정 디렉토리 조회 Hook
 */
export const useDirectory = (directoryId: Directory.Item['id']) => {
  return useQuery({
    queryKey: ['directory', directoryId],
    queryFn: async () => fetchDirectory(directoryId),
  })
}

/**
 * 디렉토리 생성 Hook
 */
export const useCreateDirectory = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (payload: Directory.Request.CreateDirectory) => createDirectory(payload),
    onMutate: async (newDirectory) => {
      await queryClient.cancelQueries({ queryKey: ['directories'] })

      const previousDirectories = queryClient.getQueryData<Directory.Response.GetDirectories>([
        'directories',
      ])

      // 낙관적 업데이트
      const optimisticDirectory = {
        id: -1,
        ...newDirectory,
        tag: '',
        documentCount: 0,
      }

      queryClient.setQueryData<Directory.Response.GetDirectories>(
        ['directories'],
        (old = { directories: [] }) => {
          return {
            directories: [...old.directories, optimisticDirectory],
          }
        }
      )

      return { previousDirectories }
    },
    onError: (_, __, context) => {
      if (context?.previousDirectories) {
        queryClient.setQueryData(['directories'], context.previousDirectories)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['directories'] })
    },
  })
}

/**
 * 디렉토리 삭제 Hook
 */
export const useDeleteDirectory = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (directoryId: Directory.Item['id']) => deleteDirectory(directoryId),
    onSuccess: async () => {
      // 디렉토리 목록 갱신
      await queryClient.invalidateQueries({ queryKey: ['directories'] })
    },
  })
}

/**
 * 디렉토리 정보 수정 Hook
 */
export const useUpdateDirectoryInfo = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (
      payload: {
        directoryId: Directory.Item['id']
      } & Directory.Request.UpdateDirectoryInfo
    ) => updateDirectoryInfo(payload),
    onSuccess: async (_, { directoryId }) => {
      // 디렉토리 목록과 해당 디렉토리 상세 정보 갱신
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['directories'] }),
        queryClient.invalidateQueries({ queryKey: ['directory', directoryId] }),
      ])
    },
  })
}
