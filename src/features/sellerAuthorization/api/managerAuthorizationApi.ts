import { apiRoutes } from '@/app-settings'
import { ISellerResetPassword, ISellerSignIn } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const sellerSignIn = async (authorizationBody: ISellerSignIn) => {
  return await httpClient(
    apiRoutes.managerSignIn,
    {
      method: 'POST',
      body: authorizationBody,
    },
    'seller',
  )
}

export const sellerResetPassword = async (body: ISellerResetPassword) => {
  return await httpClient(
    apiRoutes.sellerPasswordReset,
    {
      method: 'POST',
      body,
    },
    'seller',
  )
}

export const sellerResetPasswordRequest = async (body: Omit<ISellerSignIn, 'password'>) => {
  return await httpClient(
    apiRoutes.requestPasswordReset,
    {
      method: 'POST',
      body,
    },
    'seller',
  )
}
