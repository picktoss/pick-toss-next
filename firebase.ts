import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const initializeFirebaseMessaging = async () => {
  const firebaseApp = initializeApp(firebaseConfig)

  try {
    const messagingSupported = await isSupported()
    if (messagingSupported) {
      return getMessaging(firebaseApp)
    }
    // eslint-disable-next-line no-console
    console.warn('FCM Messaging is not supported')
    return null
  } catch (error) {
    console.error('Error checking FCM support:', error)
    return null
  }
}
