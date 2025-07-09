import { AppLayout } from '@layouts/AppLayout'
import { RouteObject } from 'react-router-dom'
import { buyerCabinetRoutes } from './buyerCabinetRoutes'
import { mainRoutes } from './mainRoutes'
import { managersRoutes } from './sellerRoutes'
import { catalogRoutes } from '@/app/router/routesFactories/catalogRoutes'
import { devModeRoutes } from '@/app/router/routesFactories/devModeRoutes'
import { appRoutes } from '@/app-settings'
import { ErrorBoundary } from '@/layouts/ErrorBoundary'


export const createAppRoutes = (): RouteObject => {
  return {
    errorElement: <ErrorBoundary />,
    path: appRoutes.root,
    element: <AppLayout />,
    children: [...mainRoutes, devModeRoutes, ...catalogRoutes, ...managersRoutes, ...buyerCabinetRoutes],
  }
}
