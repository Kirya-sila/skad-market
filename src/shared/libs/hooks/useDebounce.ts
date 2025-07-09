import { useCallback, useRef } from 'react'

export const useDebounce = <T extends any[]>(func: (...args: T) => void, delay: number) => {
  const ref = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: T) => {
      if (ref.current) clearTimeout(ref.current)
      ref.current = setTimeout(() => {
        func(...args)
      }, delay)
    },
    [func, delay],
  )
}
