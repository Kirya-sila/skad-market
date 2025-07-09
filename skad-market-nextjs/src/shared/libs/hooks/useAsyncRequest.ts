import { useEffect, useState, useCallback } from 'react'

export interface UseAsyncRequest<Response, Error> {
  asyncFunc?: (...args: any[]) => Promise<Response>
  errorHandler?: (error: unknown) => Error
  invokeImmediate?: boolean
  args?: any[]
}

export const useAsyncRequest = <Response extends unknown, Error = unknown>({
  asyncFunc,
  errorHandler,
  invokeImmediate = false,
  args = [],
}: UseAsyncRequest<Response, Error>) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const asyncCallbackHandler = useCallback(async (...args: any[]) => {
    try {
      setLoading(true)
      setError(undefined)

      return (await asyncFunc?.(...args)) || Promise.resolve(args)
    } catch (error) {
      let errorMessage = error as Error

      if (errorHandler) {
        errorMessage = errorHandler(error)
      }

      setError(errorMessage)
      throw errorMessage
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (invokeImmediate) {
      asyncCallbackHandler(...args)
    }
  }, [invokeImmediate])

  return [asyncCallbackHandler, isLoading, error] as const
}
