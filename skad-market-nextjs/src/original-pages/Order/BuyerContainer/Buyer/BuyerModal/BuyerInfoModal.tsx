import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import css from './BuyerInfoModal.module.scss'
import { LegalForm, PersonForm } from './Forms'
import { Tabs } from './Tabs'
import { CloseIcon } from '@/assets/icons'
import { Buyer } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { TSubmitFormValues } from '@/interfaces/order'
import { Flex, FlexColumn, RegularButton, Underlay } from '@/shared/ui'

interface IBuyerInfoModal {
  onClose: VoidFunction
}

export const BuyerInfoModal: FC<IBuyerInfoModal> = observer(({ onClose }) => {
  const { id } = useParams()
  const { currentBuyerTypeTab: currentTab, saveBuyerInfo: setBuyerInfo, setSubmittedForm } = orderStore

  const submitForm = (values: TSubmitFormValues) => {
    setBuyerInfo(values, id ?? '')
    setSubmittedForm(currentTab)
    onClose()
  }
  return (
    <Underlay onClick={onClose}>
      <FlexColumn classname={css.layout} onClick={(e) => e.stopPropagation()}>
        <Flex classname={css.closeIcon}>
          <div style={{ cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon />
          </div>
        </Flex>
        <FlexColumn classname={css.mainContent}>
          <span className={css.h2}>Данные покупателя</span>
          <Tabs />
          {currentTab === Buyer.Person && <PersonForm submitForm={submitForm} />}
          {currentTab === Buyer.Legal && <LegalForm submitForm={submitForm} />}

          <RegularButton type='submit' text='Подтвердить' form='buyer-submit' />
        </FlexColumn>
      </FlexColumn>
    </Underlay>
  )
})
