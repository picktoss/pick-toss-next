/* eslint-disable @typescript-eslint/require-await */
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function actionRevalidatePath(path: string) {
  revalidatePath(path)
}

export async function actionRevalidateTag(tag: string) {
  revalidateTag(tag)
}
