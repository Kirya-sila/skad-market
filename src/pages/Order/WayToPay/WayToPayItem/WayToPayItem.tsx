import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './WayToPayItem.module.scss'
import { PaymentPlan } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexColumn } from '@/shared/ui'

interface IWayToPayItem {
  contextText: string
  defaultIcon: ReactNode
  checkedIcon: ReactNode
  id: PaymentPlan
}

export const WayToPayItem: FC<IWayToPayItem> = observer(({ contextText, defaultIcon, checkedIcon, id }) => {
  const { wayToPay, setPaymentPlan } = orderStore
  const isChecked = wayToPay === id
  return (
    <FlexColumn
      id={id}
      classname={cn(css.card, { [css.checked]: isChecked })}
      onClick={(e) => setPaymentPlan(e.currentTarget.id as PaymentPlan)}
    >
      <div className={css.icon}>{isChecked ? checkedIcon : defaultIcon}</div>
      <div className={cn(css.text, { [css.textChecked]: isChecked })}>{contextText}</div>
    </FlexColumn>
  )
})
