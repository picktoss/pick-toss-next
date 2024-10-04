'use client'

import { useUpdateUsernameMutation } from '@/actions/fetchers/user/update-user-name/mutation'
import { Button } from '@/shared/components/ui/button'
import { useToast } from '@/shared/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

const EditForm = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState(session?.user.dto.name || '')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (value.length > 20) return

    setName(value)
    setIsButtonDisabled(false)
  }

  const { mutate: mutateUpdateUsername } = useUpdateUsernameMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length === 0) return

    setIsButtonDisabled(true)

    mutateUpdateUsername(
      { name },
      {
        onSuccess: () => {
          toast({ description: '프로필이 변경되었습니다' })
          router.push('/profile')
        },
      }
    )
  }

  return (
    <div>
      <label className="mb-[8px] text-small1-regular text-gray-07">이름</label>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex h-[48px] w-full items-center rounded-sm border border-gray-01 bg-gray-01 px-[10px] focus-within:border-blue-05">
          <input
            name="name"
            className="flex-1 bg-gray-01 outline-none"
            value={name}
            onChange={handleNameChange}
          />
          <span className="text-body1-medium text-gray-06">{name.length}/20</span>
        </div>
        <Button
          className="float-end mt-[40px] text-[16px] font-bold"
          size="lg"
          disabled={name.length === 0 || isButtonDisabled}
        >
          완료
        </Button>
      </form>
    </div>
  )
}

export default EditForm
