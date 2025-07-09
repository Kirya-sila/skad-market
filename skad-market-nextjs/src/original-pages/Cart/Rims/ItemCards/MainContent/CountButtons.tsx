import React, { FC } from 'react'
import { ICMinus, ICPlus } from '@assets/icons'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from '../ItemCards.module.scss'
import { cartStore } from '@/features/cart'
import { ICartItems } from '@/interfaces'
import { IconButton } from '@/shared/ui/IconButton'

interface ICountButtons {
  cardData: ICartItems
}

export const CountButtons: FC<ICountButtons> = observer(({ cardData }) => {
  const { preferedCount, incrementCount, decrementCount } = cartStore

  const disableMinus = preferedCount[cardData.id] === 1
  const disablePlus = preferedCount[cardData.id] === (cardData?.stockAmount ?? 1)

  return (
    <div className={css.counter}>
      <IconButton
        disabled={disableMinus}
        icon={<ICMinus />}
        onClick={() => decrementCount(cardData.id)}
        className={cn(css.plusMinus, { [css.disabled]: disableMinus })}
      />
      <div className={css.count}>{preferedCount[cardData.id]}</div>
      <IconButton
        disabled={disablePlus}
        icon={<ICPlus />}
        onClick={() => incrementCount(cardData.id)}
        className={cn(css.plusMinus, { [css.disabled]: disablePlus })}
      />
    </div>
  )
})
