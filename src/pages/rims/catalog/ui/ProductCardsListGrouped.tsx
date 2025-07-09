import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './Catalog.module.scss'
import { GroupedProductCard } from './GroupedProductCard'
import { rimsStore } from '@/entities/Rims'
import { NotFound } from '@/widgets/filters'

export const ProductCardsListGrouped = observer(() => {
  const { resetFilters, filteredGroupRims } = rimsStore

  const onItemClick = () => {
    window.scroll(0, 0)
  }

  if (!filteredGroupRims.length) {
    return <NotFound onResetFilters={resetFilters} className={css.notFound} />
  }

  return (
    <div className={cn(css.cards, { [css.cardsFixWidth]: filteredGroupRims.length < 3 })}>
      {filteredGroupRims.map((rimGroup) => (
        <GroupedProductCard
          key={`${rimGroup.astPerformance}${rimGroup.drawingNumber}`}
          rimGroup={rimGroup}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  )
})
