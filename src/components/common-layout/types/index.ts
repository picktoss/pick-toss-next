import { SearchFormSubmitType } from '@/components/search-form'
import { ReactNode } from 'react'

export type TitleType = ReactNode

export interface MobileOptions {
  hasBackButton?: boolean
  hasStars?: boolean
  hasSearch?: boolean
  hasNotifications?: boolean
  mobileTitle?: TitleType
}

export interface SearchOptions {
  placeholder: string
  recentTermsLocalKey: string
  onSubmit: SearchFormSubmitType
}
