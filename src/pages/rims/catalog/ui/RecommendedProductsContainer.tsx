import { useMemo } from 'react'
import { useWindowSize } from '@/shared/libs'
import { RecommendedProductsSection } from '@/widgets'

export const RecommendedProductsContainer = () => {
  const { width } = useWindowSize()

  const itemsCount = useMemo(() => {
    if (width >= 1394) return 8
    return 6
  }, [width])

  return <RecommendedProductsSection count={itemsCount} />
}
