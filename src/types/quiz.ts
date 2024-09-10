import { DocumentStatus } from '@/actions/types/dto/document.dto'

export type SelectDocumentItem = {
  id: number
  name: string
  order: number
  documentStatus: DocumentStatus
  checked: boolean
}

export type CheckItem = {
  id: number
  name: string
  checked: boolean
  documentStatus?: DocumentStatus
  emoji?: string
}
