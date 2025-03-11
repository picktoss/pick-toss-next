'use client'

import { onMessage } from '@firebase/messaging'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'

export const useServiceWorker = () => {
  const [isUpdated, setIsUpdated] = useState(false)
  const [isAppReady, setIsAppReady] = useState(false)

  // 앱 초기 렌더링 완료 감지
  useEffect(() => {
    // 초기 렌더링이 완료된 후 상태 업데이트
    if (typeof window !== 'undefined') {
      // requestAnimationFrame을 사용하여 첫 렌더링 완료 확인
      requestAnimationFrame(() => {
        // 추가 지연을 통해 더 안정적인 초기화 보장
        setTimeout(() => {
          setIsAppReady(true)
        }, 300) // 300ms 지연으로 초기 렌더링이 안정화될 시간 제공
      })
    }
  }, [])

  // 앱이 준비된 후에만 서비스 워커 등록
  useEffect(() => {
    if (!isAppReady) return // 앱이 준비되지 않았으면 서비스 워커 등록 연기

    let unsubscribe: (() => void) | undefined
    let registration: ServiceWorkerRegistration | undefined

    const registerServiceWorker = async () => {
      // 서비스 워커 등록 시도
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        // eslint-disable-next-line no-console
        console.log('✅ ServiceWorker registration successful')

        // 서비스 워커 업데이트 감지 및 강제 적용
        if (registration) {
          await registration.update().then(() => {
            // eslint-disable-next-line no-console
            console.log('🔄 ServiceWorker 업데이트 확인됨')
          })

          registration.onupdatefound = () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // eslint-disable-next-line no-console
                  console.log('⚡ 새로운 ServiceWorker가 설치됨')
                  setIsUpdated(true) // 새로운 버전 감지
                }
              }
            }
          }

          return registration
        }
      } catch (error) {
        console.error('🚨 ServiceWorker 등록 실패:', error)
      }
    }

    const setRegister = async () => {
      try {
        // iPad 감지
        const isIPad =
          /iPad/.test(navigator.userAgent) ||
          (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

        // iPadOS 버전 감지 추가
        const isIPadOS18 = isIPad && /Version\/18/.test(navigator.userAgent)

        // 이미 등록된 서비스 워커 확인
        const existingRegistration = await navigator.serviceWorker.getRegistration()
        if (existingRegistration) {
          registration = existingRegistration

          // iPadOS 18에서는 기존 서비스 워커를 명시적으로 활성화
          if (isIPadOS18 && existingRegistration.waiting) {
            existingRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
          }
        }

        // iPadOS 18에서는 항상 새로 등록 시도 (기존에 등록되어 있어도)
        if (isIPadOS18 || !(isIPad && existingRegistration)) {
          registration = await registerServiceWorker()
        }

        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            unsubscribe = onMessage(messaging, async (payload) => {
              // 앱이 포그라운드 상태일 때만 알림 표시
              if (document.visibilityState === 'visible') {
                // eslint-disable-next-line no-console
                console.log('📩 포그라운드 메시지 수신:', payload)

                // 앱 실행중에는 푸시 알림을 받지 않도록 정책이 변경되면 아래 코드 삭제
                if (registration && Notification.permission === 'granted') {
                  await registration.showNotification(payload.notification?.title || '', {
                    body: payload.notification?.body,
                  })
                }
              } else {
                // 백그라운드 상태일 때는 onBackgroundMessage가 처리하도록 함
                // eslint-disable-next-line no-console
                console.log('📪 백그라운드 상태 메세지:', '서비스 워커에서 messaging 처리')
              }
            })
          }
        } catch (error) {
          console.error('🚨 Firebase Messaging 초기화 실패:', error)
        }
      } catch (error) {
        console.error('🚨 ServiceWorker 등록 실패:', error)
      }
    }

    if ('serviceWorker' in navigator) {
      void setRegister()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [isAppReady]) // isAppReady 상태가 true로 변경될 때만 실행

  // ✅ 새로운 버전 감지 시 자동 새로고침
  useEffect(() => {
    if (isUpdated) {
      // iPad 감지
      const isIPad =
        /iPad/.test(navigator.userAgent) ||
        (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

      // iPadOS 버전 감지
      const isIPadOS18 = isIPad && /Version\/18/.test(navigator.userAgent)

      // iPad의 경우 localStorage를 사용하여 무한 리로드 방지
      if (isIPad) {
        const lastUpdateTime = localStorage.getItem('lastSwUpdate')
        const currentTime = Date.now()

        // iPadOS 18에서는 더 긴 간격(30분)으로 설정
        const updateInterval = isIPadOS18 ? 1800000 : 600000 // 30분 또는 10분

        // 마지막 업데이트로부터 설정된 시간 이상 지난 경우에만 리로드
        if (!lastUpdateTime || currentTime - parseInt(lastUpdateTime) > updateInterval) {
          localStorage.setItem('lastSwUpdate', currentTime.toString())
          // eslint-disable-next-line no-console
          console.log('🔄 iPad에서 제어된 새로고침 실행')
          window.location.reload()
        } else {
          // iPad에서 너무 빈번한 업데이트 방지
          setIsUpdated(false) // 업데이트 상태 초기화
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('🔄 새로운 버전이 감지됨 → 페이지 새로고침')
        window.location.reload()
      }
    }
  }, [isUpdated])

  return { isAppReady }
}
// export const useServiceWorker = () => {
//   const [isUpdated, setIsUpdated] = useState(false)

//   useEffect(() => {
//     let unsubscribe: (() => void) | undefined
//     let registration: ServiceWorkerRegistration | undefined

//     const registerServiceWorker = async () => {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
//       // eslint-disable-next-line no-console
//       console.log('✅ ServiceWorker registration successful')

//       // 서비스 워커 업데이트 감지 및 강제 적용
//       if (registration) {
//         await registration.update().then(() => {
//           // eslint-disable-next-line no-console
//           console.log('🔄 ServiceWorker 업데이트 확인됨')
//         })

//         registration.onupdatefound = () => {
//           const newWorker = registration.installing
//           if (newWorker) {
//             newWorker.onstatechange = () => {
//               if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
//                 // eslint-disable-next-line no-console
//                 console.log('⚡ 새로운 ServiceWorker가 설치됨')
//                 setIsUpdated(true) // 새로운 버전 감지
//               }
//             }
//           }
//         }

//         return registration
//       }
//     }

//     const setRegister = async () => {
//       try {
//         // iPad 감지
//         const isIPad =
//           /iPad/.test(navigator.userAgent) ||
//           (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

//         // 이미 등록된 서비스 워커 확인
//         const existingRegistration = await navigator.serviceWorker.getRegistration()
//         if (existingRegistration) {
//           registration = existingRegistration
//         }

//         if (!(isIPad && existingRegistration)) {
//           registration = await registerServiceWorker()
//         }

//         try {
//           const messaging = await initializeFirebaseMessaging()

//           if (messaging) {
//             unsubscribe = onMessage(messaging, async (payload) => {
//               // 앱이 포그라운드 상태일 때만 알림 표시
//               if (document.visibilityState === 'visible') {
//                 // eslint-disable-next-line no-console
//                 console.log('📩 포그라운드 메시지 수신:', payload)

//                 if (registration && Notification.permission === 'granted') {
//                   await registration.showNotification(payload.notification?.title || '', {
//                     body: payload.notification?.body,
//                   })
//                 }
//               } else {
//                 // 백그라운드 상태일 때는 onBackgroundMessage가 처리하도록 함
//                 // eslint-disable-next-line no-console
//                 console.log('📪 백그라운드 상태 메세지:', '서비스 워커에서 messaging 처리')
//               }
//             })
//           }
//         } catch (error) {
//           console.error('🚨 Firebase Messaging 초기화 실패:', error)
//         }
//       } catch (error) {
//         console.error('🚨 ServiceWorker 등록 실패:', error)
//       }
//     }

//     if ('serviceWorker' in navigator) {
//       void setRegister()
//     }

//     return () => {
//       if (unsubscribe) {
//         unsubscribe()
//       }
//     }
//   }, [])

//   // ✅ 새로운 버전 감지 시 자동 새로고침
//   useEffect(() => {
//     if (isUpdated) {
//       // iPad 감지
//       const isIPad =
//         /iPad/.test(navigator.userAgent) ||
//         (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

//       // iPad의 경우 localStorage를 사용하여 무한 리로드 방지
//       if (isIPad) {
//         const lastUpdateTime = localStorage.getItem('lastSwUpdate')
//         const currentTime = Date.now()

//         // 마지막 업데이트로부터 10분 이상 지난 경우에만 리로드
//         if (!lastUpdateTime || currentTime - parseInt(lastUpdateTime) > 600000) {
//           localStorage.setItem('lastSwUpdate', currentTime.toString())
//           // eslint-disable-next-line no-console
//           console.log('🔄 iPad에서 제어된 새로고침 실행')
//           window.location.reload()
//         } else {
//           // iPad에서 너무 빈번한 업데이트 방지
//           setIsUpdated(false) // 업데이트 상태 초기화
//         }
//       } else {
//         // eslint-disable-next-line no-console
//         console.log('🔄 새로운 버전이 감지됨 → 페이지 새로고침')
//         window.location.reload()
//       }
//     }
//   }, [isUpdated])
// }
