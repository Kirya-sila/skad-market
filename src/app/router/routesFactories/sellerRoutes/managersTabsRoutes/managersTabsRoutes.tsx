import { Flex } from 'antd'
import { Navigate } from 'react-router-dom'
import { managersSettingsRoutes } from '../managersSettingsRoutes'
import { appRoutes } from '@/app-settings'
import { ManagerGoods, ManagerOrder, ManagerSettingsHomePage } from '@/pages'
import { ManagerOrders } from '@/pages/Manager/ManagerOrders'

export const managersTabsRoutes = [
  { index: true, element: <Navigate to={appRoutes.manager.settings.root} /> },
  {
    path: appRoutes.manager.settings.root,
    element: <ManagerSettingsHomePage />,
    children: managersSettingsRoutes,
  },
  {
    path: appRoutes.manager.goods.root,
    element: <ManagerGoods />,
  },
  {
    path: appRoutes.manager.orders.root,
    element: <ManagerOrders/>,
  },
  {
    path: appRoutes.manager.orders.orderItem,
    element: <ManagerOrder />,
  },
  {
    path: appRoutes.manager.reports.root,
    element: <Flex>Отчеты</Flex>,
  },
  {
    path: appRoutes.manager.notifications.root,
    element: <Flex>Уведомления</Flex>,
  },
]
