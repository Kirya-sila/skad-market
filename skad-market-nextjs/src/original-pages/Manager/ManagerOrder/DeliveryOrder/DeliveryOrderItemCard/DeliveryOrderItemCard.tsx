import { FC } from 'react'
import { Divider, Flex } from 'antd'
import { DeliveryOptions } from './DeliveryOptions'
import { DeliveryOrderItem } from './DeliveryOrderItem'
import { IOrderDeliveryTabData } from '@/interfaces'
import { InfoText, SectionTitle } from '@/shared/ui'
import { primaryWhite } from '@/theme'

export const DeliveryOrderItemCard: FC<{ data: IOrderDeliveryTabData }> = ({ data }) => {
  return (
    <Flex vertical style={{ padding: 24, backgroundColor: primaryWhite }}>
      <SectionTitle>{data.warehouseTitle}</SectionTitle>
      <InfoText>{data.warehouseAddress}</InfoText>
      <DeliveryOptions data={data} />
      <Divider />
      <Flex vertical>
        {data.itemDeliveries.map((item) => (
          <Flex vertical key={item.id}>
            <DeliveryOrderItem data={item} />
            <Divider />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
