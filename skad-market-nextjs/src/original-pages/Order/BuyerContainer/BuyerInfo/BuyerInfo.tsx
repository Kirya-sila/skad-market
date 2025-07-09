import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import css from './BuyerInfo.module.scss'
import { LegalBuyerInfo } from './LegalBuyerInfo'
import { PersonalBuyerInfoContainer } from './PersonalBuyerInfoContainer/PersonalBuyerInfoContainer'
import { Buyer } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { useWindowState } from '@/shared/libs'
import { ErrorMessage, FlexColumn, FlexRow, RegularButton } from '@/shared/ui'

interface IBuyerInfo {
  onClick: VoidFunction
}

export const BuyerInfo: FC<IBuyerInfo> = observer(({ onClick }) => {
  const { isMobile } = useWindowState()
  const { submittedForm, submitOrderServerError } = orderStore
  return (
    <FlexColumn classname={css.buyerInfo}>
      <FlexRow classname={css.sectionRow}>
        <FlexColumn>
          <span className={css.sectionTitle}>Данные покупателя</span>
        </FlexColumn>
        {!isMobile && <RegularButton variant='text' text='Изменить' onClick={onClick} />}
      </FlexRow>
      {submittedForm === Buyer.Person && <PersonalBuyerInfoContainer />}
      {submittedForm === Buyer.Legal && <LegalBuyerInfo />}
      {!!submitOrderServerError && <ErrorMessage errorMessage={submitOrderServerError} />}
      <span className={css.comment}>
        SMS-сообщения со статусом заказа будут поступать получателю на указанный номер телефона. Дляполучения заказа
        потребуется предъявить документ, удостоверяющий личность.
      </span>
      {isMobile && <RegularButton variant='text' text='Изменить' onClick={onClick} />}
    </FlexColumn>
  )
})
