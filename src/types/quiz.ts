import { CategoryTagType } from '@/actions/fetchers/category/get-categories'
import { DocumentStatus } from '@/actions/types/dto/document.dto'

export type CheckItem = {
  id: number
  name: string
  checked: boolean
  documentStatus?: DocumentStatus
  emoji?: string
}

export interface SelectDocumentItem extends CheckItem {
  order: number
  documentStatus: DocumentStatus
}

export interface SelectCategoryItem extends CheckItem {
  order: number
  tag: CategoryTagType
  documents: {
    id: number
    name: string
    order: number
    documentStatus: DocumentStatus
  }[]
}

interface Item {
  id: string | number
  checked?: boolean
}

export type ReturnUseCheckList<T extends Item> = {
  list: T[]
  set: (items: T[]) => void
  isChecked: (id: T['id']) => boolean | undefined
  isAllChecked: () => boolean
  check: (id: T['id']) => void
  unCheck: (id: T['id']) => void
  toggle: (id: T['id']) => void
  updateItem: (id: T['id'], checked: boolean) => void
  toggleAll: () => void
  checkAll: () => void
  unCheckAll: () => void
  updateAll: (checked: boolean) => void
  getCheckedList: () => T[]
  getCheckedIds: () => (string | number)[]
  isAllCheckedWithoutIgnored: () => boolean
  checkAllWithoutIgnored: () => void
  unCheckAllWithoutIgnored: () => void
}
