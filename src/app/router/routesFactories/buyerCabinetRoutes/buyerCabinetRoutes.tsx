import { buyerCabinetChildRoutes } from './buyerCabinetChildRoutes'
import { appRoutes } from '@/app-settings'
import { BuyerCabinetSecurityRoute } from '@/layouts'
import { BuyerCabinet, BuyerOrderPage } from '@/pages'

export const buyerCabinetRoutes = [
  {
    path: appRoutes.buyer.root,
    element: <BuyerCabinet />,
    children: buyerCabinetChildRoutes,
  },
  {
    path: appRoutes.buyer.orders.orderItem,
    element: (
      <BuyerCabinetSecurityRoute>
        <BuyerOrderPage />
      </BuyerCabinetSecurityRoute>
    ),
  },
]
