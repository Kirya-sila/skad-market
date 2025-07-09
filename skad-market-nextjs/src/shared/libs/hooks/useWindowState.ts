import { useWindowSize } from './useWindowSize'

const desktopSize = 1440
const laptopSize = 1024
const tabletSize = 768
const mobileSize = 360

export const useWindowState = () => {
  const { width } = useWindowSize()

  const isDesktop = width >= desktopSize
  const isLaptop = width >= laptopSize && width < desktopSize
  const isTablet = width >= tabletSize && width < laptopSize
  const isMobile = width >= 0 && width < tabletSize
  const isOldMobilePhone = width >= 0 && width < mobileSize

  return {
    isDesktop,
    isLaptop,
    isTablet,
    isMobile,
    isOldMobilePhone,
  }
}
