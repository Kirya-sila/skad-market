import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { BuyerOrderPaymentStatusEnum } from '../constants'
import { ICQuestionMarkBubble } from '@/assets/icons'

interface IPaymentStatus {}

const { Text } = Typography

export const PaymentStatus: FC<{ paymentStatus: string }> = ({ paymentStatus }) => {
  const getCommnetByPaymentStatus = (paymentStatus: BuyerOrderPaymentStatusEnum) => {
    switch (paymentStatus) {
      case BuyerOrderPaymentStatusEnum.payed:
        return 'Оплачен'
      case BuyerOrderPaymentStatusEnum.refund:
        return 'Деньги отправлены на карту'
      case BuyerOrderPaymentStatusEnum.waitingForPayment:
        return 'Без оплаты заказ будет отменен'
    }
  }

  return (
    <Flex gap={6} align='center'>
      <Text>{paymentStatus}</Text>
      {paymentStatus === BuyerOrderPaymentStatusEnum.refund && <ICQuestionMarkBubble />}
    </Flex>
  )
}
