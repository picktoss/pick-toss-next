import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'

interface CreateDocumentContextValues {
  selectedCategoryId: CategoryDTO['id']
  selectCategory: (categoryId: CategoryDTO['id']) => void
  title: string
  changeTitle: (title: string) => void
}

const CreateDocumentContext = createContext<CreateDocumentContextValues | null>(null)

export function CreateDocumentProvider({
  children,
  initCategoryId,
}: PropsWithChildren<{ initCategoryId: CategoryDTO['id'] }>) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(initCategoryId)
  const [title, setTitle] = useState('')

  const selectCategory = useCallback((categoryId: CategoryDTO['id']) => {
    setSelectedCategoryId(categoryId)
  }, [])

  const changeTitle = useCallback((title: string) => {
    setTitle(title)
  }, [])

  const values = useMemo(
    () => ({
      selectedCategoryId,
      selectCategory,
      title,
      changeTitle,
    }),
    [selectedCategoryId, selectCategory, title, changeTitle]
  )

  return <CreateDocumentContext.Provider value={values}>{children}</CreateDocumentContext.Provider>
}

export const useCreateDocumentContext = () => {
  const values = useContext(CreateDocumentContext)

  if (values == null) {
    throw new Error('CreateDocumentProvider 내에서 사용해주세요.')
  }

  return values
}
