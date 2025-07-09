import { useEffect, useState } from 'react'

const MOBILE_WIDTH_THRESHOLD = 768

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH_THRESHOLD)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH_THRESHOLD)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

export default useIsMobile
