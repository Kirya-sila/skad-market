import { appRoutes } from '@/app-settings'
import { MainPage } from '@/pages/main-page'
import { UIKitPage } from '@/pages/uikit-page'

export const devModeRoutes = {
  path: appRoutes.dev,
  element: import.meta.env.MODE === 'development' ? <UIKitPage /> : <MainPage />,
}
