'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'
import { components } from '@/types/schema'
import { DeepRequired } from 'react-hook-form'

export const getIntegratedSearches = async (requestBody: { keyword: string }) => {
  if (!requestBody.keyword || requestBody.keyword === '') return null

  try {
    const { data } = await http.post<
      DeepRequired<components['schemas']['IntegratedSearchResponse']>
    >(API_ENDPOINTS.SEARCH.POST.SEARCH_ALL, requestBody)
    return data
  } catch (error: unknown) {
    throw error
  }
}
