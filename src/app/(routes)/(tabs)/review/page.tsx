import { createCategory } from '@/apis/fetchers/category/create-category'
import { getCategories } from '@/apis/fetchers/category/get-categories'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import Profile from '@/components/profile'
import { Button } from '@/components/ui/button'

export default async function Review() {
  const session = await auth()
  const categories = await getCategories(session?.user.accessToken)

  return (
    <div>
      <Profile trigger={<Button>프로필 열기</Button>} />
      <form
        action={async () => {
          'use server'
          await createCategory({
            name: '자바스크립트',
            tag: 'IT',
            emoji: '🚀',
          })
        }}
      >
        <button>더미 폴더 생성</button>
      </form>
      <div>{JSON.stringify(categories)}</div>
    </div>
  )
}
