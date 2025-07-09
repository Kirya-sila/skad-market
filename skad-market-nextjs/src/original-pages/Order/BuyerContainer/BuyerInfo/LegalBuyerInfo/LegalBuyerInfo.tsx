import { observer } from 'mobx-react-lite'
import css from '../BuyerInfo.module.scss'
import { BuyerRow } from '../BuyerRow'
import { LegalDataRow } from './LegalDataRow'
import { AdditionalBuyerIcon, CompanyIcons } from '@/assets/icons'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexColumn } from '@/shared/ui'

// interface ILegalBuyerInfo {

// }

export const LegalBuyerInfo = observer(() => {
  const {
    buyerInfo: { legal },
  } = orderStore
  return (
    <FlexColumn classname={css.container}>
      <BuyerRow icon={<CompanyIcons />} text={legal.companyName} />
      <LegalDataRow label='КПП' text={legal.kpp} />
      <LegalDataRow label='БИК' text={legal.bic} />
      <LegalDataRow label='Банк' text={legal.bankName} />
      <LegalDataRow label='Р/С' text={legal.account} />
      <LegalDataRow label='К/С' text={legal.correspondedAccount} />
      <LegalDataRow label='Юридический адрес' text={legal.legalAddress} />
      <LegalDataRow label='Фактический адрес' text={legal.address} />
      <>
        <span className={css.additionalBuyer}>Данные получателя</span>
        <BuyerRow icon={<AdditionalBuyerIcon />} text={`${legal.firstName} ${legal.lastName}, ${legal.phone}`} />
      </>
    </FlexColumn>
  )
})
