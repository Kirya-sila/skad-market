import { makeAutoObservable } from 'mobx'
import { sellerResetPassword, sellerResetPasswordRequest, sellerSignIn } from '../api'
import { router } from '@/app'
import { appRoutes } from '@/app-settings'
import { email, managerAccessToken, managerRefreshToken } from '@/constants'
import { getUrlWithSearchParams, parseJwt } from '@/helpers'
import { ISellerResetPasswordRequest, ISellerSignIn } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class SellerAuthorizationStore {
  loading = false
  isSellerAuthorized = false
  authorizationError = ''

  constructor() {
    makeAutoObservable(this)
  }

  sellerSignIn = async (authorizationBody: ISellerSignIn) => {
    this.setLoading(true)
    try {
      const content = await sellerSignIn(authorizationBody)
      localStorage.setItem(managerAccessToken, content?.accessToken)
      localStorage.setItem(managerRefreshToken, content?.refreshToken)
      localStorage.setItem(email, parseJwt(content?.accessToken).email)
      router.navigate(appRoutes.manager.settings.employees)
    } catch (e) {
      const error = handleCatchedError(e)
      this.setError(error)
    } finally {
      this.setLoading(false)
    }
  }

  sellerResetPassword = async (values: ISellerResetPasswordRequest) => {
    this.setLoading(true)

    await sellerResetPassword(values)
  }

  sellerResetPasswordRequest = async (values: Omit<ISellerSignIn, 'password'>) => {
    this.setLoading(true)
    try {
      await sellerResetPasswordRequest(values)
      router.navigate(getUrlWithSearchParams(appRoutes.resetPasswordRequestSentPage, values))
    } catch (e) {
      if (e instanceof Error) {
        this.setError(e.message)
        console.log(e.message)
      }
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  // setSellerAuthorizationStatus = (isAuthorized: boolean) => {
  //   this.isSellerAuthorized = isAuthorized
  // }

  setError = (errorMessage: string) => {
    this.authorizationError = errorMessage
  }
}

export const sellerAuthorizationStore = new SellerAuthorizationStore()
