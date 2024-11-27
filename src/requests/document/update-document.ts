'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const updateDocument = async (
  documentId: number,
  requestBody: Document.Request.UpdateContent,
  accessToken: string
) => {
  const formData = new FormData()

  const blob = new Blob([requestBody.file], { type: 'text/markdown' })
  const file = new File([blob], `${requestBody.name}.md`, { type: 'text/markdown' })

  formData.append('file', file)
  formData.append('name', requestBody.name)

  try {
    const response = await http.patch(
      API_ENDPOINTS.DOCUMENT.PATCH.UPDATE_CONTENT(documentId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    throw error
  }
}
