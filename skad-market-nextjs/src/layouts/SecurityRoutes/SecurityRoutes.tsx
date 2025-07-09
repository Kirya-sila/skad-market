import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { managerAccessToken, buyerAccessToken, managerRefreshToken, buyerRefreshToken } from '@/constants'

export const ManagerSecurityRoute: FC<{ children: ReactNode }> = ({ children }) => {
  if (!localStorage.getItem(managerRefreshToken) || !localStorage.getItem(managerAccessToken)) {
    return <Navigate to={appRoutes.managerSignIn} />
  }

  return <>{children}</>
}

export const BuyerSecurityRoute: FC<{ children: ReactNode }> = ({ children }) => {
  if (!localStorage.getItem(buyerAccessToken)) {
    return <Navigate to={appRoutes.root} />
  }

  return <>{children}</>
}

export const ManagerSignInRouteWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  if (localStorage.getItem(managerRefreshToken)) {
    return <Navigate to={appRoutes.manager.orders.root} />
  }

  return <>{children}</>
}

export const BuyerCabinetSecurityRoute: FC<{ children: ReactNode }> = ({ children }) => {
  if (!localStorage.getItem(buyerRefreshToken)) {
    return <Navigate to={appRoutes.buyerSignIn} />
  }

  return <>{children}</>
}
