import { FC } from 'react'
import { CartItem } from './CartItem'
import css from './ItemCards.module.scss'
import { ICartItems } from '@/interfaces'
import { FlexColumn } from '@/shared/ui'

interface IItemsCards {
  title: string
  data: ICartItems[]
}

export const ItemCards: FC<IItemsCards> = ({ title, data }) => {

  if (!data?.length) {
    return null
  }

  return (
    <FlexColumn classname={css.itemsContainer}>
      <span style={{ marginBottom: '16px' }}>{title}</span>
      {data?.map((card) => <CartItem key={card?.id} cardData={card} />)}
    </FlexColumn>
  )
}
