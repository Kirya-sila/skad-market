import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { IOrderItem } from '@/interfaces'
import { plural } from '@/shared/libs/utils/string'

interface ISecondRow {
  item: IOrderItem
  showWeight?: boolean
  showStatus?: boolean
}

const { Title, Text } = Typography

export const SecondRow: FC<ISecondRow> = ({ item, showWeight = false, showStatus = true }) => {
  return (
    <Flex gap={6}>
      {showWeight && (
        <Text>
          {item?.itemsAmount} {plural(item.itemsAmount, ['товар', 'товара', 'товаров'])} {item?.totalAggregatedWeight}{' '}
          кг
        </Text>
      )}
      <Title level={5} style={{ fontSize: 14, marginTop: 0 }}>
        {item?.aggregatedOrderItemPrice?.toLocaleString()} ₽
      </Title>
      {showStatus && <Text style={{ fontWeight: 600 }}>{item.orderItemStatus}</Text>}
    </Flex>
  )
}
