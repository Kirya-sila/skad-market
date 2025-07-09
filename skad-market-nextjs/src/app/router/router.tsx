import { createBrowserRouter } from 'react-router-dom'
import { buyerCabinetRoutes, catalogRoutes, devModeRoutes, mainRoutes, managersRoutes } from './routesFactories'
import { appRoutes } from '@/app-settings'
import { AppLayout } from '@/layouts'
import { ErrorBoundary } from '@/layouts/ErrorBoundary'

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    path: appRoutes.root,
    element: <AppLayout />,
    children: [...mainRoutes, devModeRoutes, ...catalogRoutes, ...managersRoutes, ...buyerCabinetRoutes],
  },
])
