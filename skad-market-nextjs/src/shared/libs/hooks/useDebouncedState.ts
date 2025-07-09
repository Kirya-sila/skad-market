import { useEffect, useState } from 'react'

export const useDebouncedState = <T>(delay: number, defaultValue: T, onStateChange?: (state: T) => void) => {
  const [currentValue, setCurrentValue] = useState<T>(defaultValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (currentValue !== debouncedValue) {
      const handler = setTimeout(() => {
        setDebouncedValue(currentValue)
        onStateChange && onStateChange(currentValue)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }

    return () => null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, delay])

  return [debouncedValue, setCurrentValue] as const
}
