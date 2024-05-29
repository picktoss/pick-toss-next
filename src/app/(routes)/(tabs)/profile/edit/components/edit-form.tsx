'use client'

import { API_ENDPOINT } from '@/apis/api-endpoint'
import { updateUserName } from '@/apis/fetchers/user/update-user-name'
import { Button } from '@/components/ui/button'
import { actionRevalidatePath } from '@/lib/revalidate'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function EditForm() {
  const { data: session, update } = useSession()
  const router = useRouter()

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

  const handleSubmit = async () => {
    if (name.length === 0) return

    setIsButtonDisabled(true)

    await updateUserName({ accessToken: session?.user.accessToken || '', name: name })
    await Promise.all([update(), actionRevalidatePath(API_ENDPOINT.user.getUser().url)])

    router.push('/profile')
  }

  return (
    <div>
      <label className="mb-[8px] text-small1-regular text-gray-07">이름</label>
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
        onClick={handleSubmit}
        disabled={name.length === 0 || isButtonDisabled}
      >
        완료
      </Button>
    </div>
  )
}
