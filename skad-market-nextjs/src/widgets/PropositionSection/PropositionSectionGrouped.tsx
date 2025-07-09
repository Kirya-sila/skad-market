import { FC, useEffect } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './PropositionSection.module.scss'
import { IRimItemsGroup } from '@/entities/Rims/model/types'
import { GroupedProductCard } from '@/pages/rims/catalog/ui/GroupedProductCard'
import { Spinner } from '@/shared/ui/Spinner'

interface IPropositionSectionGrouped {
  className?: string
  count?: number
  title: string
  items: IRimItemsGroup[]
  getItems: VoidFunction
  onItemClick?: (id: string) => void
  loading: boolean
}

export const PropositionSectionGrouped: FC<IPropositionSectionGrouped> = observer(
  ({ count, title, items, getItems, loading }) => {
    useEffect(() => {
      getItems()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleProductClick = () => {
      window.scrollTo(0, 0)
    }

    return (
      <Flex vertical>
        <div className={css.title}>{title}</div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={css.body}>
            {items.slice(0, count ?? items.length).map((rimGroup, i) => (
              <GroupedProductCard
                key={`${i + rimGroup.astPerformance}${rimGroup.drawingNumber}`}
                rimGroup={rimGroup}
                onItemClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </Flex>
    )
  },
)
