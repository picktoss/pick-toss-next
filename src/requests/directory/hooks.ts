import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createDirectory,
  deleteDirectory,
  fetchDirectories,
  fetchDirectory,
  updateDirectoryInfo,
} from '.'

/**
 * 모든 디렉토리 조회 Hook
 */
export const useDirectories = () => {
  return useQuery({
    queryKey: ['directories'],
    queryFn: fetchDirectories,
  })
}

/**
 * 특정 디렉토리 조회 Hook
 */
export const useDirectory = (directoryId: Directory.Item['id']) => {
  return useQuery({
    queryKey: ['directory', directoryId],
    queryFn: () => fetchDirectory(directoryId),
  })
}

/**
 * 디렉토리 생성 Hook
 */
export const useCreateDirectory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDirectory,
    onSuccess: async () => {
      // 디렉토리 목록 갱신
      await queryClient.invalidateQueries({ queryKey: ['directories'] })
    },
  })
}

/**
 * 디렉토리 삭제 Hook
 */
export const useDeleteDirectory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDirectory,
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDirectoryInfo,
    onSuccess: async (_, { directoryId }) => {
      // 디렉토리 목록과 해당 디렉토리 상세 정보 갱신
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['directories'] }),
        queryClient.invalidateQueries({ queryKey: ['directory', directoryId] }),
      ])
    },
  })
}
