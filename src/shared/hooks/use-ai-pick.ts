import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { GetKeyPointsByIdResponse } from '@/actions/fetchers/key-point/get-key-points-by-id'
import { useCreateAIPickMutation } from '@/actions/fetchers/document/create-ai-pick/mutation'
import { useReCreateAIPickMutation } from '@/actions/fetchers/document/re-create-ai-pick/mutation'
import { useToggleBookmarkMutation } from '@/actions/fetchers/key-point/toggle-bookmark/mutation'
import { DocumentStatus } from '@/actions/types/dto/document.dto'

interface UseAiPickParams {
  initKeyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  initStatus: DocumentStatus
}

export const useAiPick = ({ initKeyPoints, initStatus }: UseAiPickParams) => {
  const documentId = Number(useParams().documentId as string)
  const queryClient = useQueryClient()
  const prevStatusRef = useRef<DocumentStatus>()

  const {
    data: { documentStatus: status, keyPoints },
  } = useQuery({
    ...queries.keyPoints.item(documentId),
    initialData: { documentStatus: initStatus, keyPoints: initKeyPoints },
    retry: false,
  })

  const { mutate: mutateCreateAiPick } = useCreateAIPickMutation()
  const { mutate: mutateReCreateAiPick } = useReCreateAIPickMutation()
  const { mutate: mutateToggleBookmark } = useToggleBookmarkMutation({ documentId })

  const handleCreateAiPick = () => {
    prevStatusRef.current = 'PROCESSING'

    queryClient.setQueryData<GetKeyPointsByIdResponse>(
      queries.keyPoints.item(documentId).queryKey,
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          documentStatus: 'PROCESSING',
        }
      }
    )

    mutateCreateAiPick({
      documentId,
    })
  }

  const handleReCreateAiPick = () => {
    prevStatusRef.current = 'PROCESSING'

    queryClient.setQueryData<GetKeyPointsByIdResponse>(
      queries.keyPoints.item(documentId).queryKey,
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          documentStatus: 'PROCESSING',
          keyPoints: [],
        }
      }
    )

    mutateReCreateAiPick({
      documentId,
    })
  }

  const handleToggleBookmark = (data: { keyPointId: number; bookmark: boolean }) => {
    queryClient.setQueryData<GetKeyPointsByIdResponse>(
      queries.keyPoints.item(documentId).queryKey,
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          keyPoints: oldData?.keyPoints.map((keypoint) =>
            keypoint.id !== data.keyPointId ? keypoint : { ...keypoint, bookmark: data.bookmark }
          ),
        }
      }
    )

    mutateToggleBookmark(data)
  }

  // useEffect for polling logic
  useEffect(() => {
    // 문서 생성 polling이 완료 된 후 View 컴포넌트의 document refetch
    if (prevStatusRef.current === 'PROCESSING' && status === 'PROCESSED') {
      const refetchDocument = async () => {
        prevStatusRef.current === 'PROCESSED'
        await queryClient.refetchQueries({
          queryKey: queries.keyPoints.item(documentId).queryKey,
        })
      }

      void refetchDocument()
    }
  }, [status, documentId, queryClient])

  useEffect(() => {
    if (status !== 'PROCESSING') return

    const refetchKeyPoints = async () => {
      await queryClient.refetchQueries({ queryKey: queries.keyPoints.item(documentId).queryKey })
      if (status === 'PROCESSING') {
        timerId = setTimeout(refetchKeyPoints, 4000)
      }
    }

    let timerId = setTimeout(refetchKeyPoints, 4000)

    return () => clearTimeout(timerId)
  }, [status, queryClient, documentId])

  return {
    status,
    keyPoints,
    handleCreateAiPick,
    handleReCreateAiPick,
    handleToggleBookmark,
  }
}
