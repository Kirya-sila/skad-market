import { FC } from 'react'
import css from '../ItemCards.module.scss'
import { ICartItems } from '@/interfaces'
import { FlexRow } from '@/shared/ui'

interface IOneUnitPrice {
  cardData: ICartItems
}

export const OneUnitPrice: FC<IOneUnitPrice> = ({ cardData }) => {
  return (
    <FlexRow classname={css.oneUnitPrice}>
      <span style={{ whiteSpace: 'nowrap' }}>{cardData?.retailPrice.toLocaleString()} ₽</span>
    </FlexRow>
  )
}
