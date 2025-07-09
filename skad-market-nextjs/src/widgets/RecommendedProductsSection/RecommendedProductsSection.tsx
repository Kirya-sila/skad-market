import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { PropositionSection, PropositionSectionGrouped } from '../PropositionSection'
import { recommendRimsItemsStore } from '@/features'
import { useProposistionSection } from '@/shared/libs'

interface IRecommendedProductsSection {
  count?: number
}

export const RecommendedProductsSection: FC<IRecommendedProductsSection> = observer(({ count }) => {
  const { isBigSize, isMediumSize } = useProposistionSection()

  const { recommendRimsItemsGrouped, getRecommendRimsItemsGrouped, recommendRimsLoading } = recommendRimsItemsStore

  const getItemsCount = useMemo(() => {
    if (isBigSize) return 10
    if (isMediumSize) return 8
    return 6
  }, [isBigSize, isMediumSize])

  return (
    <PropositionSectionGrouped
      count={count ?? getItemsCount}
      title='Рекомендуемые товары'
      getItems={getRecommendRimsItemsGrouped}
      items={recommendRimsItemsGrouped}
      loading={recommendRimsLoading}
    />
  )

  // const { isBigSize, isMediumSize } = useProposistionSection()

  // const { recommendRimsItems, getRecommendRimsItems, recommendRimsLoading } = recommendRimsItemsStore

  // const getItemsCount = useMemo(() => {
  //   if (isBigSize) return 10
  //   if (isMediumSize) return 8
  //   return 6
  // }, [isBigSize, isMediumSize])

  // return (
  //   <PropositionSection
  //     count={count ?? getItemsCount}
  //     title='Рекомендуемые товары'
  //     getItems={getRecommendRimsItems}
  //     items={recommendRimsItems}
  //     loading={recommendRimsLoading}
  //   />
  // )
})
