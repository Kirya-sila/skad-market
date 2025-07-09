import React, { FC } from 'react'
import css from '../ItemCards.module.scss'
import { FlexRow } from '@/shared/ui'

interface IMinimumUnitsToBuy {
  minimumToBuy: number | undefined
}

export const MinimumUnitsToBuy: FC<IMinimumUnitsToBuy> = ({ minimumToBuy }) => {
  return (
    <FlexRow classname={css.minimumItems}>
      {!!minimumToBuy && <span>{minimumToBuy} шт. минимум</span>}
    </FlexRow>
  )
}
