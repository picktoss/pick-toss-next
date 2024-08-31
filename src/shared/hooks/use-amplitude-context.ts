import { AmplitudeContext } from '@/contexts/amplitude-context'
import { useContext } from 'react'

const useAmplitudeContext = () => {
  const context = useContext(AmplitudeContext)
  if (context == null)
    throw new Error('useAmplitudeContext must be used within a AmplitudeContextProvider')

  return context
}

export default useAmplitudeContext
