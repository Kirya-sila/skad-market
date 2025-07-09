import { useEffect } from 'react'
import { ModalRenderer } from '@app/config/modal/modal.renderer'
import { ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { cityStore } from '@/features/location/model'
import { SnackBarRenderer } from '@/features/notification'
import { AuthorizationModal } from '@/shared/ui'
import { theme } from '@/theme'
import { Toast } from '@/widgets'

export const AppLayout = observer(() => {
  useEffect(() => {
    cityStore.initCurrentCity()
  }, [])

  return (
    <ConfigProvider theme={theme}>
      {/*<StrictMode>*/}
      <Toast />
      <Outlet />
      <ModalRenderer />
      <SnackBarRenderer />
      <AuthorizationModal />
      {/*</StrictMode>*/}
    </ConfigProvider>
  )
})
