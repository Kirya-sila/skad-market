import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { getOrderDateString } from '@/helpers'
import { primaryBlack } from '@/theme'

interface IDeliveryDateSection {
  date: Date
  bgColor: string
}

const { Text } = Typography

export const DeliveryDateSection: FC<IDeliveryDateSection> = ({ date, bgColor }) => {
  return (
    <Flex style={{ backgroundColor: bgColor, borderRadius: 10, padding: '10px 16px' }}>
      <Text style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600, color: primaryBlack }}>
        Доставка {getOrderDateString(date)}
      </Text>
    </Flex>
  )
}
