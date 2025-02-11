import AppInstallAos from './app-install-aos'
import AppInstallIos from './app-install-ios'

const AppInstallView = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  if (isIOS) {
    return <AppInstallIos />
  }

  return <AppInstallAos />
}

export default AppInstallView
