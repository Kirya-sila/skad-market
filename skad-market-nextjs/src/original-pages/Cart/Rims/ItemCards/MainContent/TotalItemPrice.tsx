import { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from '../ItemCards.module.scss'
import { cartStore } from '@/features/cart'
import { ICartItems } from '@/interfaces'
import { FlexRow } from '@/shared/ui'

interface ITotalItemPrice {
  cardData: ICartItems
}

export const TotalItemPrice: FC<ITotalItemPrice> = observer(({ cardData }) => {
  const { preferedCount } = cartStore

  return (
    <FlexRow classname={cn(css.summ, { [css.notAvailable]: !cardData.stockAmount })}>
      <span className={css.currentPrice}>
        {(cardData?.retailPrice * preferedCount[cardData.id]).toLocaleString()} ₽
      </span>
    </FlexRow>
  )
})
