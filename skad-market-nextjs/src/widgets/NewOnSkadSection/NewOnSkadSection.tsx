import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { PropositionSectionGrouped } from '../PropositionSection'
import { newRimsItemsStore } from '@/features'
import { useProposistionSection } from '@/shared/libs'

export const NewOnSkadSection = observer(() => {
  const { newRimsItemsGrouped, getNewRimsItemsGrouped, newRimsLoading } = newRimsItemsStore

  const { isBigSize, isMediumSize } = useProposistionSection()

  const getItemsCount = useMemo(() => {
    if (isBigSize) return 10
    if (isMediumSize) return 8
    return 6
  }, [isBigSize, isMediumSize])

  return (
    <PropositionSectionGrouped
      title='Новинки на SkadMarket'
      count={getItemsCount}
      getItems={getNewRimsItemsGrouped}
      items={newRimsItemsGrouped}
      loading={newRimsLoading}
    />
  )

  // const { newRimsItems, getNewRimsItems, newRimsLoading } = newRimsItemsStore

  // const { isBigSize, isMediumSize } = useProposistionSection()

  // const getItemsCount = useMemo(() => {
  //   if (isBigSize) return 10
  //   if (isMediumSize) return 8
  //   return 6
  // }, [isBigSize, isMediumSize])

  // return (
  //   <PropositionSection
  //     title='Новинки на SkadMarket'
  //     count={getItemsCount}
  //     getItems={getNewRimsItems}
  //     items={newRimsItems}
  //     loading={newRimsLoading}
  //   />
  // )
})
