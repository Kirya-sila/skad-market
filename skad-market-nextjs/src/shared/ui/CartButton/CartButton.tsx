import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './CartButton.module.scss'

export interface CartButtonProps {
  className?: string
  variant?: 'cart' | 'page' | 'icon'
  onClick: VoidFunction
  icon?: ReactNode
  size?: 'large' | 'middle'
  disabled?: boolean
}

export const CartButton = ({
  className,
  icon,
  variant = 'cart',
  size = 'middle',
  onClick,
  disabled,
}: CartButtonProps) => {
  return (
    <button className={cn(css.cartButton, css[size], css[variant], className)} onClick={onClick} disabled={disabled}>
      <div className={css.topLine}>
        {variant !== 'icon' && <span role="cart-button.label">В корзине</span>}
        {icon && <div className={css.iconWrap}>{icon}</div>}
      </div>
      {variant === 'page' && <div className={css.bottomLine}>Перейти</div>}
    </button>
  )
}

CartButton.displayName = 'CartButton'
