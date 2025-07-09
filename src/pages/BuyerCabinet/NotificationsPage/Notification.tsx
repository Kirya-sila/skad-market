import { FC } from 'react'
import { Flex, Typography } from 'antd'
import moment from 'moment'
import { INotification } from '../interfaces'
import { primaryBlack, primaryLightestGray } from '@/theme'

const { Text } = Typography

export const Notification: FC<INotification> = ({  orderNo, orderDate, createdAt, notificationText }) => {
  return (
    <Flex
      vertical
      justify='space-between'
      gap={12}
      style={{ padding: 16, backgroundColor: primaryLightestGray, borderRadius: 10 }}
    >
      <Flex justify='space-between'>
        <Text style={{ color: primaryBlack, fontWeight: 600 }}>{`Заказ № ${orderNo} от ${moment(orderDate).format(
          'DD.MM.YYYY',
        )}`}</Text>
        <Text style={{ fontWeight: 600 }}>{moment(createdAt).format('DD.MM.YYYY')}</Text>
      </Flex>
      <Text style={{ lineHeight: '24px' }}>{notificationText}</Text>
    </Flex>
  )
}
