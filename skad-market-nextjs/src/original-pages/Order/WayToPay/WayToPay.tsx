import {
  InDelivery,
  InDeliveryChecked,
  // Installment,
  // InstallmentChecked,
  // PayOnline,
  // PayOnlineChecked,
} from '@assets/icons'
import css from '../Order.module.scss'
import { SectionWrapper } from '../SectionWrapper'
import { WayToPayItem } from './WayToPayItem'
import { PaymentPlan } from '@/constants'
import { FlexRow } from '@/shared/ui'

export const WayToPay = () => {
  return (
    <SectionWrapper className={css.paymentMethod} title='Способ оплаты'>
      <FlexRow>
        {/* <WayToPayItem
          id={PaymentPlan.Online}
          contextText='Оплата онлайн'
          defaultIcon={<PayOnline />}
          checkedIcon={<PayOnlineChecked />}
        />
        <WayToPayItem
          id={PaymentPlan.Installment}
          contextText='Рассрочка'
          defaultIcon={<Installment />}
          checkedIcon={<InstallmentChecked />}
        /> */}
        <WayToPayItem
          id={PaymentPlan.Delivery}
          contextText='При получении'
          defaultIcon={<InDelivery />}
          checkedIcon={<InDeliveryChecked />}
        />
      </FlexRow>
    </SectionWrapper>
  )
}
