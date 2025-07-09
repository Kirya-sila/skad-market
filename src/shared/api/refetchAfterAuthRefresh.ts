import { getResponseContent } from './getResponseContent'
import { handleApiErrors } from './hadleApiErrors'
import { buyerAccessToken, managerAccessToken } from '@/constants'

type RequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: unknown
}

export const refetchAfterAuthRefresh = async (url: string, options: RequestOptions = {}, isBuyer: boolean) => {
  const { method = 'GET', headers = {}, body } = options

  const token = localStorage.getItem(isBuyer ? buyerAccessToken : managerAccessToken)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // try {
  const response = await fetch(url, {
    credentials: 'include',
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (response.ok) {
    return await getResponseContent(response)
  }

  if (!response.ok) {
    const errorData = await response.json()
    const errorMessage = handleApiErrors(errorData)
    throw new Error(errorMessage)
  }

  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw new Error(error.message)
  //   }
  // }
}
