import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import css from '../ItemCards.module.scss'
import { FlexRow } from '@/shared/ui'

interface ITomorrowCost {
  availableOnStock: number
}

const priceTomorrow = 41990

export const TomorrowCost: FC<ITomorrowCost> = observer(({ availableOnStock }) => {
  return (
    <>
      {!!availableOnStock && (
        <FlexRow classname={css.tomorrowPrice}>
          <span>Завтра будет стоить {priceTomorrow.toLocaleString()}&nbsp;₽</span>
        </FlexRow>
      )}
    </>
  )
})
