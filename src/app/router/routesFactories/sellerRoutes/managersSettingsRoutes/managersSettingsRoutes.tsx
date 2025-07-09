import { Navigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { Buyers, Employees } from '@/pages'

export const managersSettingsRoutes = [
  { index: true, element: <Navigate to={appRoutes.manager.settings.profile} /> },
  {
    path: appRoutes.manager.settings.profile,
    element: <div>Профиль</div>,
  },
  {
    path: appRoutes.manager.settings.employees,
    element: <Employees />,
  },
  {
    path: appRoutes.manager.settings.merchants,
    element: <div>Продавцы</div>,
  },
  {
    path: appRoutes.manager.settings.buyers,
    element: <Buyers />,
  },
  {
    path: appRoutes.manager.settings.notifications,
    element: <div>Уведомления</div>,
  },
]
