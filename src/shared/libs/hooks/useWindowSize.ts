import { useLayoutEffect, useState } from 'react'
// import { useDebouncedState } from './useDebouncedState'

export const useWindowSize = () => {
  // const [windowSize, setWindowSize] = useDebouncedState(500, { width: 0, height: 0 })
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleSize)

    return () => window.removeEventListener('resize', handleSize)
  }, [])

  return windowSize
}
