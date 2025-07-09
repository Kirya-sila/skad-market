import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from '../BuyerOrderPage.module.scss'
import { SectionCardWrapper } from '../SectionCardWrapper'
import { buyerCabinetStore } from '@/features/buyer'
import { ProfileBuyerInfo } from '@/shared/ui'

export const BuyerInfoSection = observer(() => {
  const { currentOrder } = buyerCabinetStore
  return (
    <SectionCardWrapper>
      <Flex vertical gap={8}>
        <span className={css.sectionTitle}>Данные покупателя</span>
        <ProfileBuyerInfo personalInfo={currentOrder} isOtherPerson={currentOrder.isRecieverOtherPerson} />
        <span className={css.comment}>
          SMS-сообщения со статусом заказа будут поступать получателю на указанный номер телефона. Дляполучения заказа
          потребуется предъявить документ, удостоверяющий личность.
        </span>
      </Flex>
    </SectionCardWrapper>
  )
})
