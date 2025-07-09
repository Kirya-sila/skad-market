import { useEffect } from 'react'

type TargetKey = 'Escape' | 'Enter' | 'Tab' | 'Space'

const isTargetKey = (targetKey: string | string[], eventCode: string) => {
  if (Array.isArray(targetKey)) {
    return targetKey.includes(eventCode)
  }

  return eventCode === targetKey
}

export const useKeyPress = (targetKey: TargetKey | TargetKey[], callback: () => void) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      event.stopPropagation()

      if (isTargetKey(targetKey, event.code)) {
        callback()
      }
    }

    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [callback])
}
