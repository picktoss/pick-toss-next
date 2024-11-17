'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const createDocument = async (payload: Document.Request.CreateDocument) => {
  const formData = new FormData()
  formData.append('file', payload.file)
  formData.append('directoryId', String(payload.directoryId))
  formData.append('documentName', payload.documentName)
  formData.append('star', String(payload.star))
  formData.append('quizType', payload.quizType)

  try {
    const session = await auth()

    const { data } = await http.post<Document.Response.CreateDocument>(
      API_ENDPOINTS.DOCUMENT.POST.CREATE,
      {
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
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
