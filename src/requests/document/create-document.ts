'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const createDocument = async (
  payload: Document.Request.CreateDocument,
  accessToken: string
) => {
  const formData = new FormData()

  const blob = new Blob([payload.file], { type: 'text/markdown' })
  const file = new File([blob], `${payload.documentName}.md`, { type: 'text/markdown' })

  formData.append('file', file)
  formData.append('directoryId', String(payload.directoryId))
  formData.append('documentName', payload.documentName)
  formData.append('star', String(payload.star))
  formData.append('quizType', payload.quizType)

  try {
    const { data } = await http.post<Document.Response.CreateDocument>(
      API_ENDPOINTS.DOCUMENT.POST.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    // console.error(error)
    throw error
  }
}
