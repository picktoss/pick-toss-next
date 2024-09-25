import { useCheckList } from '@/shared/hooks/use-check-list'
import { ReturnUseCheckListDialogDoc, SelectDocumentItem } from '@/types/quiz'
import React, { createContext, useContext } from 'react'

const DocumentCheckContext = createContext<ReturnUseCheckListDialogDoc | null>(null)

interface Props {
  children: JSX.Element
  filteredIgnoreIds: number[]
}

export const DocumentCheckProvider = ({ children, filteredIgnoreIds }: Props) => {
  const {
    list,
    set,
    getCheckedIds,
    toggle,
    isAllCheckedWithoutIgnored,
    checkAllWithoutIgnored,
    unCheckAllWithoutIgnored,
  } = useCheckList([] as SelectDocumentItem[], {
    ignoreIds: filteredIgnoreIds,
  })

  return (
    <DocumentCheckContext.Provider
      value={{
        list,
        set,
        getCheckedIds,
        toggle,
        isAllCheckedWithoutIgnored,
        checkAllWithoutIgnored,
        unCheckAllWithoutIgnored,
      }}
    >
      {children}
    </DocumentCheckContext.Provider>
  )
}

export const useDocumentCheck = () => useContext(DocumentCheckContext)
