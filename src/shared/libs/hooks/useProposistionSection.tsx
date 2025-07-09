import { useWindowSize } from './useWindowSize'

export const useProposistionSection = () => {
  const { width } = useWindowSize()

  const isBigSize = width >= 1426
  const isMediumSize = width >= 1171 && width < 1426
  const isMobileSize = width < 1171

  return {
    isBigSize,
    isMediumSize,
    isMobileSize,
  }
}
