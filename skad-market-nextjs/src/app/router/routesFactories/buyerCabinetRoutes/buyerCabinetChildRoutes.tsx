import { appRoutes } from '@/app-settings'
import { BuyerCabinetSecurityRoute } from '@/layouts'
import { BuyerMainPage, BuyerOrdersPage, NotificationsPage, ProfilePage } from '@/pages'

export const buyerCabinetChildRoutes = [
  {
    index: true,
    element: (
      <BuyerCabinetSecurityRoute>
        <BuyerMainPage />
      </BuyerCabinetSecurityRoute>
    ),
  },
  {
    path: appRoutes.buyer.orders.root,
    element: (
      <BuyerCabinetSecurityRoute>
        <BuyerOrdersPage />
      </BuyerCabinetSecurityRoute>
    ),
  },
  {
    path: appRoutes.buyer.profile,
    element: (
      <BuyerCabinetSecurityRoute>
        <ProfilePage />
      </BuyerCabinetSecurityRoute>
    ),
  },
  // {
  //   path: appRoutes.buyer.favorites,
  //   element: (
  //     <BuyerCabinetSecurityRoute>
  //       <div>Избранное</div>
  //     </BuyerCabinetSecurityRoute>
  //   ),
  // },
  // {
  //   path: appRoutes.buyer.comparisons,
  //   element: (
  //     <BuyerCabinetSecurityRoute>
  //       <div>Сравнения</div>
  //     </BuyerCabinetSecurityRoute>
  //   ),
  // },
  {
    path: appRoutes.buyer.notifications,
    element: (
      <BuyerCabinetSecurityRoute>
        <NotificationsPage />
      </BuyerCabinetSecurityRoute>
    ),
  },
]
