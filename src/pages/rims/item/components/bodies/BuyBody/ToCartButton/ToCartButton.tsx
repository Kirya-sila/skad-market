import { FC } from 'react'
import css from './ToCartButton.module.scss'
import { observer } from 'mobx-react-lite'
import { cartStore } from '@/features/cart'
import { rimsStore } from '@/entities/Rims'
import { RegularButton } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { primaryGreen } from '@/theme'

interface IToCartButton {
  count: number
}

export const ToCartButton: FC<IToCartButton> = observer(({ count }) => {
  const navigate = useNavigate()
  const { currentRim } = rimsStore
  const { addItemToCart, addedToCartItems } = cartStore

  const addToCart = () => {
    addItemToCart({
      productId: currentRim?.id ?? '',
      productCategoryId: currentRim?.productCategoryId ?? '',
      quantity: count,
    })
  }

  if (addedToCartItems.includes(currentRim?.id ?? '')) {
    return (
      <RegularButton
        onClick={() => navigate(appRoutes.cart)}
        text='Перейти в корзину'
        size='middle'
        style={{ backgroundColor: primaryGreen, width: 116, height: 48, fontSize: 14, fontWeight: 600 }}
      />
    )
  }

  return (
    <div className={css.wrapper}>
      <button className={css.submit} onClick={addToCart}>
        <div className={css.buttonContent}>
          <div className={css.total}>
            Итого:{' '}
            <span className={css.submitPrice}>{((currentRim?.retailPrice ?? 0) * count).toLocaleString()} ₽</span>
          </div>
          <div className={css.submitPrice}>В корзину</div>
        </div>
      </button>
    </div>
  )
})
