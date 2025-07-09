import React, { forwardRef, PropsWithChildren, useRef } from 'react'
import css from './style.module.scss'

export type PriceButtonProps = PropsWithChildren<{
  price: string
  loading?: boolean
  disabled?: boolean
  onClick: VoidFunction
}>

export const PriceButton = forwardRef<HTMLButtonElement, PriceButtonProps>(({ price, disabled, onClick }, ref) => {
  const innerRef = useRef(null)
  const resolvedRef = ref || innerRef

  return (
    <button onClick={onClick} className={css.priceButton} ref={resolvedRef}>
      <span className={css.total}>
        Итого: <span className={css.price}>{price}</span> ₽
      </span>
      <span className={css.action}>В корзину</span>
    </button>
  )
})

PriceButton.displayName = 'PriceButton'
