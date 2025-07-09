import { toast } from '@/helpers'

export const handleCatchedError = (error: unknown): string => {
  let errorMessage: string = ''
  if (error instanceof Error) {
    errorMessage = error.message
  }
  toast.error(errorMessage)
  return errorMessage
}

export const handleCatchedHttpClientError = (error: unknown): string => {
  let errorMessage: string

  if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }
  toast.error(errorMessage)
  return errorMessage
}
