import React, { FC } from 'react'
import cn from 'classnames'
import css from '../ItemCards.module.scss'

interface IAvailableOnStockText {
  availableOnStock: number
}

const getAvailabilityText = (avilableCount: number) => {
  switch (true) {
    case avilableCount === 0:
      return 'Нет в наличии'
    case avilableCount < 4:
      return `Осталось ${avilableCount}`
    default:
      return 'В наличии'
  }
}

export const AvailableOnStockText: FC<IAvailableOnStockText> = ({ availableOnStock }) => {
  return (
    <span
      className={cn(css.availabilityInfo, {
        [css.fewLeft]: availableOnStock < 10 && availableOnStock > 0,
        [css.available]: availableOnStock >= 10,
      })}
    >
      {getAvailabilityText(availableOnStock)}
    </span>
  )
}
