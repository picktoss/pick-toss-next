import { useSession } from 'next-auth/react'

const defaultData = {
  possessDocumentCount: 0,
  availableAiPickCount: 0,
  freePlanMaxPossessDocumentCount: 0,
  freePlanMonthlyDocumentCount: 0,
  proPlanMonthlyDocumentCount: 0,
  uploadableCount: 0,
  uploadableRate: 0,
}
export const useDocumentUsage = () => {
  const { data: session } = useSession()
  const documentUsage = session?.user.dto.documentUsage
  if (!documentUsage) return defaultData

  const { possessDocumentCount, freePlanMaxPossessDocumentCount } = documentUsage

  const uploadableCount = freePlanMaxPossessDocumentCount - possessDocumentCount
  const uploadableRate = Math.floor((possessDocumentCount / freePlanMaxPossessDocumentCount) * 100)

  return {
    ...documentUsage,
    uploadableCount,
    uploadableRate,
  }
}
