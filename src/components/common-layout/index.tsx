'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { useSession } from 'next-auth/react'
import { SearchForm } from '../search-form'
import { MobileOptions, SearchOptions, TitleType } from './types'
import { Title } from './components/title'
import { Desktop } from './components/desktop'
import { Mobile } from './components/mobile'
import { useBooleanState } from '@/hooks/use-boolean-state'

interface Props extends React.PropsWithChildren {
  title?: TitleType
  hideHeader?: boolean
  mobileOptions?: MobileOptions
  searchOptions?: SearchOptions
}

export function CommonLayout({ title, hideHeader, mobileOptions, searchOptions, children }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { data: session } = useSession()
  const [isSearching, setSearchingTrue, setSearchingFalse] = useBooleanState(false)

  const user = session?.user.dto

  if (!user) {
    return null
  }

  const handleSubmit = (data: { term: string }) => {
    const trimTerm = data.term.trim()

    if (trimTerm === '') return

    searchOptions?.onSubmit({ term: trimTerm })
    setSearchingFalse()
  }

  if (isDesktop) {
    return (
      <Desktop>
        {!hideHeader && <Desktop.Header />}
        {title != null && <Title className="px-[20px]">{title}</Title>}
        {searchOptions != null && (
          <SearchForm
            placeholder={searchOptions?.placeholder}
            onSubmit={handleSubmit}
            className="mt-[28px] px-[20px]"
          />
        )}
        {children}
      </Desktop>
    )
  }

  return (
    <Mobile>
      {isSearching && searchOptions != null ? (
        <Mobile.SearchingStep
          searchOptions={searchOptions}
          setSearchingFalse={setSearchingFalse}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <Mobile.Header mobileOptions={mobileOptions} setSearchingTrue={setSearchingTrue}>
            <Title center={mobileOptions?.hasBackButton}>
              {mobileOptions?.mobileTitle || title}
            </Title>
          </Mobile.Header>
          {children}
        </>
      )}
    </Mobile>
  )
}
