import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { PropositionSection, PropositionSectionGrouped } from '../PropositionSection'
import { similarRimsItemsStore } from '@/features'
import { useProposistionSection } from '@/shared/libs'

interface IYouMayBeInterested {
  count?: number
}

export const YouMayBeInterestedSection: FC<IYouMayBeInterested> = observer(({ count }) => {
  const { wheelCode = '' } = useParams()
  const { isBigSize, isMediumSize } = useProposistionSection()

  const { getSimilarRimsItemsGrouped, similarRimsItemsGrouped, similarRimsLoading } = similarRimsItemsStore

  const itemsCount = useMemo(() => {
    if (isBigSize) return 10
    if (isMediumSize) return 8
    return 6
  }, [isBigSize, isMediumSize])

  return (
    <PropositionSectionGrouped
      count={count ?? itemsCount}
      title='Вам может понравиться'
      getItems={() => getSimilarRimsItemsGrouped(wheelCode)}
      items={similarRimsItemsGrouped}
      loading={similarRimsLoading}
    />
  )

  // const { wheelCode = '' } = useParams()
  // const { isBigSize, isMediumSize } = useProposistionSection()

  // const { getSimilarRimsItems, similarRimsItems, similarRimsLoading } = similarRimsItemsStore

  // const itemsCount = useMemo(() => {
  //   if (isBigSize) return 10
  //   if (isMediumSize) return 8
  //   return 6
  // }, [isBigSize, isMediumSize])

  // return (
  //   <PropositionSection
  //     count={count ?? itemsCount}
  //     title='Вам может понравиться'
  //     getItems={() => getSimilarRimsItems(wheelCode)}
  //     items={similarRimsItems}
  //     loading={similarRimsLoading}
  //   />
  // )
})
