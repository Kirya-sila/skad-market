import { useState } from 'react'
import { Flex } from 'antd'
import { EditableTextField, InfoText, InfoTitle } from '@/shared/ui'
import { observer } from 'mobx-react-lite'
import { managersOrderStore } from '@/features/manager'
import { OrderStatus } from '@/interfaces'
import { getOrderDateString } from '@/helpers'

// interface IPaymentsCard {}

export const PaymentsCard = observer(() => {
  const {
    paymentsCardData,
    orderStatusInfo: { status, paymentDate },
  } = managersOrderStore
  const [editableStr, setEditableStr] = useState(paymentsCardData.totalDeliveryCost ?? '0')

  const handleEdit = (value: string) => {
    setEditableStr(value)
  }

  return (
    <Flex vertical gap={10}>
      <Flex vertical>
        <InfoTitle>Дата и время оплаты</InfoTitle>
        <InfoText>{paymentDate ? getOrderDateString(paymentDate) : '-'}</InfoText>
      </Flex>
      <Flex vertical>
        <InfoTitle>Способ оплаты</InfoTitle>
        <InfoText>{paymentsCardData.paymentMethod}</InfoText>
      </Flex>
      <Flex vertical>
        <InfoTitle>К оплате за доставку</InfoTitle>
        {status !== OrderStatus.canceled ? (
          // <EditableTextField onChange={handleEdit}>{editableStr} ₽</EditableTextField>
          <InfoText>{paymentsCardData.totalDeliveryCost ? `${paymentsCardData.totalDeliveryCost} ₽` : 'Бесплатно'}</InfoText>
        ) : (
          <InfoText>{paymentsCardData.totalDeliveryCost ? `${paymentsCardData.totalDeliveryCost} ₽` : 'Бесплатно'}</InfoText>
        )}
      </Flex>
    </Flex>
  )
})
