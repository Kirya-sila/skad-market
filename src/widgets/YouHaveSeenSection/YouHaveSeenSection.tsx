import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { PropositionSection, PropositionSectionGrouped } from '../PropositionSection'
import { recommendRimsItemsStore } from '@/features'
import { useProposistionSection } from '@/shared/libs'

interface IYouHaveSeenSection {
  onProductClick?: (itemId: string) => void
  count?: number
}

export const YouHaveSeenSection: FC<IYouHaveSeenSection> = observer(({ count, onProductClick }) => {
  const { isBigSize, isMediumSize } = useProposistionSection()
  const { recommendRimsItemsGrouped, getRecommendRimsItemsGrouped, recommendRimsLoading } = recommendRimsItemsStore

  const itemsCount = useMemo(() => {
    if (isBigSize) return 10
    if (isMediumSize) return 8
    return 6
  }, [isBigSize, isMediumSize])

  return (
    <PropositionSectionGrouped
      count={count ?? itemsCount}
      title='Вы смотрели'
      getItems={getRecommendRimsItemsGrouped}
      items={recommendRimsItemsGrouped}
      onItemClick={onProductClick}
      loading={recommendRimsLoading}
    />
  )

  // const { isBigSize, isMediumSize } = useProposistionSection()
  // const { recommendRimsItems, getRecommendRimsItems, recommendRimsLoading } = recommendRimsItemsStore

  // const itemsCount = useMemo(() => {
  //   if (isBigSize) return 10
  //   if (isMediumSize) return 8
  //   return 6
  // }, [isBigSize, isMediumSize])

  // return (
  //   <PropositionSection
  //     count={count ?? itemsCount}
  //     title='Вы смотрели'
  //     getItems={getRecommendRimsItems}
  //     items={recommendRimsItems}
  //     onItemClick={onProductClick}
  //     loading={recommendRimsLoading}
  //   />
  // )
})
