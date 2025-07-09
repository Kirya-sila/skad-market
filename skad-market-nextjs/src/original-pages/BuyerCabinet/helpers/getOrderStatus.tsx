import { Flex } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import { BuyerOrderStatusEnum } from '../constants'
import { primaryDarkGray, primaryGreen, primaryOrange, primaryWhite } from '@/theme'

const StyledDeliveryStatus = styled(Flex)({
  padding: '4px 10px',
  borderRadius: 12,
  alignSelf: 'flex-start',
  color: primaryWhite,
  fontSize: 12,
})

export const getOrderStatus = (status: BuyerOrderStatusEnum | string, date: string | null = null) => {
  switch (status) {
    case BuyerOrderStatusEnum.inProgress:
      return <StyledDeliveryStatus style={{ backgroundColor: primaryGreen }}>В работе</StyledDeliveryStatus>
    case BuyerOrderStatusEnum.waitingForPayment:
      return (
        <StyledDeliveryStatus style={{ backgroundColor: primaryOrange }}>
          {date ? `Ожидает оплаты до ${moment(date).format('DD.MM.YYYY')}` : 'Ожидает оплаты'}
        </StyledDeliveryStatus>
      )
    case BuyerOrderStatusEnum.delivered:
      return (
        <StyledDeliveryStatus style={{ backgroundColor: primaryDarkGray, color: primaryWhite }}>{`Получен ${
          date ? moment(date).format('DD.MM.YYYY') : ''
        }`}</StyledDeliveryStatus>
      )
    case BuyerOrderStatusEnum.canceled:
    case BuyerOrderStatusEnum.canceledByByuer:
    case BuyerOrderStatusEnum.canceledByManager:
      return (
        <StyledDeliveryStatus style={{ backgroundColor: primaryDarkGray, color: primaryWhite }}>{`Отменен ${
          date ? moment(date).format('DD.MM.YYYY') : ''
        }`}</StyledDeliveryStatus>
      )
    default:
      return (
        <StyledDeliveryStatus style={{ backgroundColor: primaryDarkGray, color: primaryWhite }}>{`${status} ${
          date ? moment(date).format('DD.MM.YYYY') : ''
        }`}</StyledDeliveryStatus>
      )
  }
}
