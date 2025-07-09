import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from '@shared/libs/hooks/useDebounce'
import { useWindowSize } from '@shared/libs'

const BASE_STYLE = {
  transition: 'transform 0.3s ease-in-out, box-shadow 0.9s ease-in-out',
  boxShadow: '0 4px 20px 0 transparent',
}

const FIXED_STYLE = {}

export const useScrollHideShow = () => {
  const { width } = useWindowSize()
  const lastScrollY = useRef(0)
  const [headerStyle, setHeaderStyle] = useState({})
  const shortScrollUpThreshold = 5
  const longScrollUpThreshold = 20
  const [isBottomLineShowed, setBottomLineShowed] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollContainer = document.querySelector('[role=main-page]')
    const header = document.querySelector('header')

    if (!scrollContainer || !header) return

    const currentScrollY = scrollContainer.scrollTop
    const scrolledUpDistance = lastScrollY.current - currentScrollY

    if (isBottomLineShowed && scrolledUpDistance >= 100) {
      setHeaderStyle({ ...BASE_STYLE, ...FIXED_STYLE })
    } else if (currentScrollY <= 100) {
      setHeaderStyle({ ...BASE_STYLE, ...FIXED_STYLE })
    } else if (scrolledUpDistance >= shortScrollUpThreshold && width >= 768) {
      setBottomLineShowed(true)
      setHeaderStyle({
        ...BASE_STYLE,
        ...FIXED_STYLE,
        transform: 'translate(-50%,-55%)',
        boxShadow: '0 4px 20px 0 #1B22252E',
      })
    } else {
      setBottomLineShowed(false)
      if (currentScrollY > 150) {
        if (width >= 768) {
          setHeaderStyle({
            ...BASE_STYLE,
            ...FIXED_STYLE,
            transform: 'translate(-50%,-100%)',
            transition: 'transform 0.9s ease-in-out, box-shadow 0.9s ease-in-out',
            boxShadow: '0 4px 15px 0 #1B22252E',
          })
        } else {
          setBottomLineShowed(true)
          setHeaderStyle({ ...BASE_STYLE, ...FIXED_STYLE, transform: 'translateY(-55%)' })
        }
      }
    }

    lastScrollY.current = currentScrollY
  }, [shortScrollUpThreshold, isBottomLineShowed, width])

  const debouncedHandleScroll = useDebounce(handleScroll, 50)

  useEffect(() => {
    const scrollContainer = document.querySelector('[role=main-page]')
    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [debouncedHandleScroll])

  return headerStyle
}
