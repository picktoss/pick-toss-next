'use client'

import { getCategories } from '@/apis/fetchers/category/get-categories'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import CreateCategoryDialog from './create-category-dialog'

interface Props extends PropsWithChildren {}

export function CategoryProtector({ children }: Props) {
  const { data: session } = useSession()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.categories),
    enabled: !!session?.user.accessToken,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const targetRef = useRef<(EventTarget & Element) | null>(null)

  const handleClick: MouseEventHandler = (e) => {
    if (!categories || categories.length === 0) {
      e.preventDefault()
      setIsDialogOpen(true)
      targetRef.current = e.currentTarget
    }
  }

  const handleDialogSuccess = () => {
    setIsDialogOpen(false)
  }

  const clonedChildren = (child: ReactNode): ReactNode => {
    if (categories && categories.length > 0) return child

    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      return React.cloneElement(child, { onClick: handleClick } as any)
    }
    return child
  }

  useEffect(() => {
    if (!targetRef.current) return

    const target = targetRef.current
    targetRef.current = null

    const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
    target.dispatchEvent(event)
  }, [categories])

  return (
    <>
      {React.Children.map(children, clonedChildren)}

      <CreateCategoryDialog
        trigger={<></>}
        externalOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => handleDialogSuccess()}
      />
    </>
  )
}
