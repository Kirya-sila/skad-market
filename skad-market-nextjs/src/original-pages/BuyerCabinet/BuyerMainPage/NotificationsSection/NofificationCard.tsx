import { FC } from 'react'
import { Flex, Typography } from 'antd'
import moment from 'moment'
import { INotification } from '../../interfaces'
import { primaryBlack, primaryLightGray } from '@/theme'

const { Text } = Typography

export const NofificationCard: FC<INotification> = ({ orderNo, orderDate, createdAt, notificationText }) => {
  return (
    <Flex
      vertical
      justify='space-between'
      gap={12}
      style={{ padding: 16, border: '1px solid', borderColor: primaryLightGray, borderRadius: 10 }}
    >
      <Flex justify='space-between'>
        <Text style={{ fontSize: 12, color: primaryBlack, fontWeight: 600 }}>{`Заказ № ${orderNo} от ${moment(
          orderDate,
        ).format('DD.MM.YYYY')}`}</Text>
        <Text style={{ fontSize: 12 }}>{moment(createdAt).format('DD.MM.YYYY')}</Text>
      </Flex>
      <Text style={{ lineHeight: '24px' }}>{notificationText}</Text>
    </Flex>
  )
}
