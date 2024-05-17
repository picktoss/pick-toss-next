import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

interface CreateDocumentParams extends NextFetchRequestConfig {
  file: string
  userDocumentName: string
  categoryId: string
}

interface CreateDocumentResponse {
  id: number
}

export const createDocument = async (params: CreateDocumentParams) => {
  const session = await auth()

  return await apiClient.fetch<CreateDocumentResponse>({
    ...API_ENDPOINT.document.createDocument(),
    body: {
      file: params.file,
      userDocumentName: params.userDocumentName,
      categoryId: String(params.categoryId),
    },
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
}
