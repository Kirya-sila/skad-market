import { useLayoutEffect } from 'react'

export const useLockBodyScroll = (isLock: boolean) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (isLock) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isLock])
}
