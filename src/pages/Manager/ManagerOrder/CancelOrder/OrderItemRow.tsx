import { FC } from 'react'
import { Flex } from 'antd'
import { InfoText } from '@/shared/ui'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface IOrderItemRow {
  orderItem: { title: string; image: string; count: number }
}

export const OrderItemRow: FC<IOrderItemRow> = ({ orderItem }) => {
  const { title, image, count } = orderItem

  return (
    <Flex gap={12} align='center'>
      <ImageLoader style={{ width: 50, height: 50 }} src={image} />
      <Flex vertical style={{ width: '100%' }}>
        <InfoText>{title}</InfoText>
        <InfoText>{count} шт.</InfoText>
      </Flex>
    </Flex>
  )
}
