import { handleCatchedHttpClientError } from '../libs'
import { TUserType } from '../types'
import { getResponseContent } from './getResponseContent'
import { handleApiErrors } from './hadleApiErrors'
import { refetchAfterAuthRefresh } from './refetchAfterAuthRefresh'
import { refreshTokens } from './refreshTokens'
import { router } from '@/app'
import { appRoutes } from '@/app-settings'
import {
  buyerAccessToken,
  buyerRefreshError,
  managerAccessToken,
  managerRefreshError
} from '@/constants'

const API_URL = import.meta.env.VITE_API_URL

type RequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: unknown
}

// interface PromiseWithCancel<T> extends Promise<T> {
//   cancel: () => void
// }

let isTokenRefreshing: Promise<unknown> | null = null

export const httpClient = async (
  endpoint: string,
  options: RequestOptions = {},
  type: TUserType | undefined = 'buyer',
) => {
  try {
    let result
    const url = `${API_URL}${endpoint}`
    const { method = 'GET', headers = {}, body } = options
    const isBuyer = type === 'buyer'

    const token = localStorage.getItem(isBuyer ? buyerAccessToken : managerAccessToken)

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const controller = new AbortController()
    const { signal } = controller

    const mainOptions: RequestInit = {
      credentials: 'include',
      method,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    }

    const response = await fetch(url, {
      ...mainOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })

    if (response.ok) {
      result = await getResponseContent(response)
    }

    if (!response.ok) {
      if (response.status === 401) {
        // if (token) {
        if (!isTokenRefreshing) {
          isTokenRefreshing = refreshTokens(isBuyer)
        }
        await isTokenRefreshing
        isTokenRefreshing = null

        result = await refetchAfterAuthRefresh(url, options, isBuyer)
        // } else {
        //   if (!isBuyer) {
        //     router.navigate(appRoutes.managerSignIn)
        //   }
        // }
        // } else if (response.status === 419 && isBuyer) {
        //   buyerLogout()
      }
      
      if (response.status === 403) {
        throw new Error('Forbidden')
      } else {
        const errorData = await response.json()
        const errorMessage = handleApiErrors(errorData)
        throw new Error(errorMessage)
      }
    }

    controller.abort()

    return result
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === managerRefreshError) {
        router.navigate(appRoutes.managerSignIn)
        throw new Error('')
      } else if (error.message === buyerRefreshError) {
        router.navigate(appRoutes.buyerSignIn)
        throw new Error('')
      } else {
        throw new Error(error.message)
      }
    } else {
      handleCatchedHttpClientError(error)
    }
  }
}
