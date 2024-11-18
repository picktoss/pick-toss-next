import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'
import { Document } from '@/types/document'

type RequestBody = Document.Request.CreateDocument

export const fetchCreateDocument = async (requestBody: RequestBody) => {
  const session = await auth()

  if (!session) {
    throw new Error('Session retrieval failed')
  }

  const { data } = await http.post<string>(API_ENDPOINTS.DOCUMENT.BASE, requestBody, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  })

  return data // document id
}
