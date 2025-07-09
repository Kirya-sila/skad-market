import { managersTabsRoutes } from './managersTabsRoutes'
import { appRoutes } from '@/app-settings'
import { ManagerSecurityRoute } from '@/layouts/SecurityRoutes/SecurityRoutes'
import { ManagerHomePage } from '@/pages'

export const managersRoutes = [
  {
    path: appRoutes.manager.root,
    element: (
      <ManagerSecurityRoute>
        <ManagerHomePage />
      </ManagerSecurityRoute>
    ),
    children: managersTabsRoutes,
  },
]
