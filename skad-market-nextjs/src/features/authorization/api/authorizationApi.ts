import { apiRoutes } from '@/app-settings'
import { httpClient } from '@/shared/api/httpClient'

export const sendUserPhone = async (body: { phoneNumber: string; captchaToken: string }) => {
  return await httpClient(apiRoutes.initSmsVerification, {
    method: 'POST',
    body,
  })
}

export const smsCodeVerification = async (smsVerificationCode: string, phoneVerificationId: string) => {
  return await httpClient(apiRoutes.smsCodeVerification, {
    method: 'POST',
    body: { smsVerificationCode, phoneVerificationId },
  })
}

export const loginBuyer = async (phoneVerificationId: string, phoneNumber: string) => {
  return await httpClient(apiRoutes.loginBuyer, {
    method: 'POST',
    body: { phoneNumber, phoneVerificationId },
  })
}
