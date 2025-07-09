import { useCallback, useEffect, useState } from 'react'

export const useSmoothVisibility = (initialVisible = false, delay = 300) => {
  const [shouldRender, setShouldRender] = useState(initialVisible)
  const [isVisible, setIsVisible] = useState(initialVisible)
  const resetVisibility = useCallback(
    (visible: boolean) => {
      if (visible) {
        setShouldRender(true)
        // Используйте двойной requestAnimationFrame, чтобы убедиться, что CSS-переход срабатывает после обновления DOM
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true))
        })
      } else {
        setIsVisible(false)
        setTimeout(() => setShouldRender(false), delay)
      }
    },
    [delay],
  )

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (initialVisible) {
      setShouldRender(true)
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
      timeoutId = setTimeout(() => setShouldRender(false), delay)
    }
    return () => clearTimeout(timeoutId)
  }, [initialVisible, delay])

  return { shouldRender, isVisible, resetVisibility }
}
