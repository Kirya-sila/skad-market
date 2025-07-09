import { makeAutoObservable } from 'mobx'
import { loginBuyer, sendUserPhone, smsCodeVerification } from '../api'
import { buyerAccessToken, buyerRefreshToken, phoneNumber } from '@/constants'
import { getHoursString } from '@/helpers'
import { handleCatchedError } from '@/shared/libs'

class AuthorizationStore {
  isSmsCodeSent = false
  isSmsCodeSentAgain = false
  phoneNumberWithPrefix = ''
  phoneNumber = ''
  captchaToken = ''
  phoneNumberError = ''
  phoneVerificationId = ''
  isSmsCodeValid = true
  isAuthorized = false
  refreshToken = ''
  refreshTokenId = ''
  openAuthorizationModal = false
  toGoPath = ''
  isOrder = false
  remainingAttemptsCount = 5
  remainingHoursUntillNextVerification = 0
  isInitOrderLoading = false
  isSmsVerificationLoading = false
  isLoginBuyerLoading = false
  isSendBuyerPhoneLoading = false
  isLoggingOut = false

  constructor() {
    makeAutoObservable(this)
  }

  sendUserPhone = async ({ phoneNumber, captchaToken }: { phoneNumber: string; captchaToken: string }) => {
    this.phoneNumber = phoneNumber
    this.captchaToken = captchaToken
    this.phoneNumberWithPrefix = `+7${phoneNumber}`
    try {
      this.isSendBuyerPhoneLoading = true
      const data = await sendUserPhone({ phoneNumber: this.phoneNumberWithPrefix, captchaToken })
      if (data?.content.errors?.length) {
        this.phoneNumberError = data?.content.errors
          .join(', ')
          .concat(getHoursString(data?.content.remainingHoursUntillNextVerification ?? 0))
      }
      this.isSmsCodeSent = data?.content.isSmsCodeSent ?? true
      this.isSmsCodeSentAgain = data?.content.isSmsCodeSent ?? true
      this.phoneVerificationId = data?.content.verificationId ?? ''
      this.remainingAttemptsCount = data?.content.remainingAttemptsCount ?? 4
      this.remainingHoursUntillNextVerification = data?.content.remainingHoursUntillNextVerification ?? 24
    } catch (e) {
      if (e instanceof Error) {
        this.phoneNumberError = e.message
      }
    } finally {
      this.isSendBuyerPhoneLoading = false
    }
  }

  smsCodeVerification = async (smsCode: string) => {
    try {
      this.isSmsVerificationLoading = true
      const result = await smsCodeVerification(smsCode, this.phoneVerificationId)
      this.isSmsCodeValid = result
      return result
    } catch (e) {
      if (e instanceof Error) {
        this.phoneNumberError = e.message
      }
    } finally {
      this.isSmsVerificationLoading = false
    }
  }

  loginByuer = async () => {
    try {
      this.isLoginBuyerLoading = true
      const result = await loginBuyer(this.phoneVerificationId, this.phoneNumberWithPrefix)
      this.isAuthorized = true
      localStorage.setItem(buyerAccessToken, result?.content?.accessToken)
      localStorage.setItem(buyerRefreshToken, result?.content?.refreshToken)
      localStorage.setItem(phoneNumber, this.phoneNumberWithPrefix)
      return result
    } catch (e) {
      if (e instanceof Error) {
        handleCatchedError(e)
      }
    } finally {
      this.isLoginBuyerLoading = false
    }
  }

  logout = async () => {
    try {
      this.isLoggingOut = true
      // await logout()
    } catch (e) {
      if (e instanceof Error) {
        handleCatchedError(e)
      }
    } finally {
      this.isLoggingOut = false
    }
  }

  handleOpenAuthorizationModal = (open: boolean) => {
    this.openAuthorizationModal = open
  }

  setToGoPath = (path: string) => {
    this.toGoPath = path
  }

  resetSmsCodeSendStatus = () => {
    this.isSmsCodeSent = false
  }

  resetSmsCodeSentAgainStatus = () => {
    this.isSmsCodeSentAgain = false
  }

  setOrderFlag = (isOrder: boolean) => {
    this.isOrder = isOrder
  }

  resetModalState = () => {
    this.phoneNumberError = ''
    this.remainingAttemptsCount = 0
    this.remainingHoursUntillNextVerification = 0
    this.resetSmsCodeSendStatus()
    this.isSmsCodeValid = true
  }
}

export const authorizationStore = new AuthorizationStore()
