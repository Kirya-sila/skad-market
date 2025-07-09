import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { buyerAccessToken, buyerRefreshToken, phoneNumber } from '@/constants'
import { authorizationStore } from '@/features/authorization'
import { cartStore } from '@/features/cart'

export const useBuyerLogout = () => {
  const navigate = useNavigate()

  const { resetSmsCodeSendStatus } = authorizationStore
  const { getCartItems } = cartStore

  const logout = () => {
    resetSmsCodeSendStatus()
    localStorage.removeItem(buyerRefreshToken)
    localStorage.removeItem(buyerAccessToken)
    localStorage.removeItem(phoneNumber)
    getCartItems()
    navigate(appRoutes.root, { replace: true })
  }

  return logout
}
