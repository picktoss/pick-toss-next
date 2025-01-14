importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBwmQsAZwnGr8Ah43wjG5EzPQnyAymYzj8',
  authDomain: 'picktoss-6b0e1.firebaseapp.com',
  projectId: 'picktoss-6b0e1',
  storageBucket: 'picktoss-6b0e1.firebasestorage.app',
  messagingSenderId: '456784018307',
  appId: '1:456784018307:web:5559778b3a422968ea54b6',
  measurementId: 'G-7TB5Q9HVQS',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload) => {
//   console.log('백그라운드 메시지 수신:', payload)
//   const { title, body } = payload.notification
//   self.registration.showNotification(title, {
//     body,
//   })
// })

// 마지막 알림 정보를 저장할 변수
let lastNotification = {
  id: null,
  timestamp: 0
}

// 중복 알림 방지를 위한 시간 간격 (밀리초)
const NOTIFICATION_INTERVAL = 1000

messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload)
  
  const { title, body } = payload.notification
  const currentTime = Date.now()
  const notificationId = payload.data?.notificationId || currentTime.toString()

  // 같은 ID의 알림이 최근에 표시되었는지 확인
  if (
    lastNotification.id === notificationId &&
    currentTime - lastNotification.timestamp < NOTIFICATION_INTERVAL
  ) {
    console.log('중복 알림 방지: 최근에 같은 알림이 표시됨')
    return
  }

  // 알림 표시
  self.registration.showNotification(title, {
    body,
    tag: notificationId, // 같은 tag를 가진 알림은 새 알림으로 교체됨
    renotify: false, // 같은 tag의 알림이 와도 새로운 알림으로 알리지 않음
    data: {
      timestamp: currentTime,
      ...payload.data
    }
  })

  // 마지막 알림 정보 업데이트
  lastNotification = {
    id: notificationId,
    timestamp: currentTime
  }
})
