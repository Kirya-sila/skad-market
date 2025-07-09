import { FC } from 'react'
import { Flex, Typography } from 'antd'
import moment from 'moment'
import { getOrderStatus } from '../../helpers'
import { PaymentStatus } from '../PaymentStatus'
import { IBuyerCabinetOrder } from '@/interfaces'

interface IBuyerOrderCardHeader {
  currentOrder: IBuyerCabinetOrder
}

const { Title } = Typography

export const BuyerOrderCardHeader: FC<IBuyerOrderCardHeader> = ({ currentOrder }) => {
  const { internalNumber, createdAt, status,  totalOrderCost, paymentMethod } = currentOrder

  return (
    <Flex justify='space-between'>
      <Flex vertical>
        <Title level={5} style={{ fontSize: 18, marginTop: 0 }}>{`Заказ № ${internalNumber} от ${moment(
          createdAt,
        ).format('DD.MM.YYYY')}`}</Title>
        {getOrderStatus(status)}
      </Flex>
      <Flex vertical align='flex-end'>
        <Title level={5} style={{ fontSize: 22, marginTop: 0, lineHeight: '26px', textWrap: 'nowrap' }}>
          {totalOrderCost?.toLocaleString()} ₽
        </Title>
        {paymentMethod && <PaymentStatus paymentStatus={paymentMethod} />}
      </Flex>
    </Flex>
  )
}
