import { FC } from 'react'
import { InSetYouGet } from '../InSetYouGet'
import { PaymentWays } from '../PaymentWays'
import { SkadShop } from '../SkadShop'
import css from './PaymentConditions.module.scss'
import { RimDTO } from '@/entities/Rims/model/types'

interface IPaymentConditions {
  cap?: RimDTO['cap']
  label?: RimDTO['label']
}

export const PaymentConditions: FC<IPaymentConditions> = ({ cap, label }) => {
  return (
    <div className={css.paymentConditionsContainer}>
      <PaymentWays />
      <InSetYouGet cap={cap} label={label} />
      <SkadShop />
    </div>
  )
}
