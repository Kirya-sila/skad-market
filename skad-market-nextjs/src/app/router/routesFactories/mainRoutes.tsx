import { MainLayout } from '@layouts/MainLayout'
import { appRoutes } from '@/app-settings'
import { BuyerSecurityRoute } from '@/layouts'
import { CartPage, SadSmilePage, Tyres } from '@/pages'
import { ConfirmedOrderPage } from '@/pages/ConfirmedOrderPage'
import { Order } from '@/pages/Order/Order'
import {
  BuyerSignInPage,
  ManagerSignIn,
  ResetPassword,
  ResetPasswordRequestPage,
  ResetPasswordRequestSentPage,
} from '@/pages/SignIn'
import { MainPage } from '@/pages/main-page'

export const mainRoutes = [
  {
    index: true,
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
  {
    path: appRoutes.cart,
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    ),
  },
  {
    path: appRoutes.tyres,
    element: (
      <MainLayout>
        <Tyres />
      </MainLayout>
    ),
  },
  {
    path: appRoutes.components,
    element: (
      <MainLayout>
        <SadSmilePage />
      </MainLayout>
    ),
  },
  {
    path: appRoutes.order,
    element: (
      <BuyerSecurityRoute>
        <Order />
      </BuyerSecurityRoute>
    ),
  },
  {
    path: appRoutes.appliedOrderInfo,
    element: (
      <BuyerSecurityRoute>
        <ConfirmedOrderPage />
      </BuyerSecurityRoute>
    ),
  },
  {
    path: appRoutes.buyerSignIn,
    element: (
      // <ManagerSignInRouteWrapper>
      <BuyerSignInPage />
      // </ManagerSignInRouteWrapper>
    ),
  },
  {
    path: appRoutes.managerSignIn,
    element: (
      // <ManagerSignInRouteWrapper>
      <ManagerSignIn />
      // </ManagerSignInRouteWrapper>
    ),
  },
  { path: appRoutes.forgetPassword, element: <ResetPassword /> },
  { path: appRoutes.resetPasswordRequestPage, element: <ResetPasswordRequestPage /> },
  { path: appRoutes.resetPasswordRequestSentPage, element: <ResetPasswordRequestSentPage /> },
]
