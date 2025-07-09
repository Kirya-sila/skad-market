import { router } from '@/app'
import { apiRoutes, appRoutes } from '@/app-settings'
import {
  buyerAccessToken,
  buyerRefreshToken,
  email as emailAddress,
  managerAccessToken,
  managerRefreshToken,
  phoneNumber as phone,
  managerRefreshError,
  buyerRefreshError,
  phoneNumber,
} from '@/constants'
import { authorizationStore } from '@/features/authorization'
import { cartStore } from '@/features/cart'

const API_URL = import.meta.env.VITE_API_URL

export const refreshTokens = async (isBuyer: boolean) => {
  const { resetSmsCodeSendStatus } = authorizationStore
  const { getCartItems } = cartStore
  
  localStorage.removeItem(isBuyer ? buyerAccessToken : managerAccessToken)

  // try {
  //TODO: fix apiRoute for seller
  const refreshTokenUrl = `${API_URL}${apiRoutes.refreshToken}`
  const refreshToken = localStorage.getItem(isBuyer ? buyerRefreshToken : managerRefreshToken)
  const phoneNum = localStorage.getItem(phone)
  const email = localStorage.getItem(emailAddress)

  const body = isBuyer ? { phoneNumber: phoneNum, refreshToken } : { email, refreshToken }

  const buyerLogout = () => {
    resetSmsCodeSendStatus()
    localStorage.removeItem(buyerRefreshToken)
    localStorage.removeItem(buyerAccessToken)
    localStorage.removeItem(phoneNumber)
    getCartItems()
  }

  const response = await fetch(refreshTokenUrl, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (response.ok) {
    const result = await response.json()
    localStorage.setItem(isBuyer ? buyerAccessToken : managerAccessToken, result?.content?.accessToken)
    localStorage.setItem(isBuyer ? buyerRefreshToken : managerRefreshToken, result?.content?.refreshToken)

    return result
  }

  if (!response.ok) {
    // router.navigate(appRoutes.managerSignIn)
    // const errorMessage = handleApiErrors(result)
    if (isBuyer) {
      if (response.status === 419) {
        buyerLogout()
        throw new Error(buyerRefreshError)
      } else {
        throw new Error(buyerRefreshError)
      }
    } else {
      throw new Error(managerRefreshError)
    }
  }
}
