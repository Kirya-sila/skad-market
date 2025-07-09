import React from 'react'
import cn from 'classnames'
import css from './Price.module.scss'

interface PriceProps {
  className?: string
  currentPrice: number
  oldPrice?: number
  supTitle?: string
  isAvailable?: boolean
}

export const Price = ({ className, isAvailable = true, currentPrice, oldPrice, supTitle }: PriceProps) => {
  return (
    <div className={cn(css.priceWrapper, className)}>
      {supTitle && <div className={css.supTitle}>{supTitle}</div>}
      <span className={css.price}>
        <span className={cn(css.currentPrice, { [css.notAvailable]: !isAvailable })}>
          {currentPrice.toLocaleString()} ₽
        </span>
        {oldPrice && <span className={css.oldPrice}>{oldPrice.toLocaleString()} ₽</span>}
      </span>
    </div>
  )
}

Price.displayName = 'ProductCard.Price'
