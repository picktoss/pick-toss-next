import { PropsWithChildren } from 'react'
import { auth } from '../api/auth/[...nextauth]/auth'
import { notFound } from 'next/navigation'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await auth()
  if (session?.user.dto.role !== 'ROLE_ADMIN') {
    notFound()
  }

  return children
}
