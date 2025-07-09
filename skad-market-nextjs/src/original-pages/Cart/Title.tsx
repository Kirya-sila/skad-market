import { observer } from 'mobx-react-lite'
import css from './Cart.module.scss'
import { cartStore } from '@/features/cart'
import { FlexRow } from '@/shared/ui'

export const Title = observer(() => {
  const { totalItemsInCart } = cartStore

  return (
    <FlexRow classname={css.titleContainer}>
      <div className={css.title}>Корзина</div>
      <div className={css.titleCount}>{totalItemsInCart} товаров</div>
    </FlexRow>
  )
})
