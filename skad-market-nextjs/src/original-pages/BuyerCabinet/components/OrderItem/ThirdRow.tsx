import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { getOrderDateString } from '@/helpers'
import { IBuyerCabinetOrder, IOrderItem } from '@/interfaces'
import { primaryBlack } from '@/theme'
import { TrackNumber } from '@/widgets'

const { Text } = Typography

export const ThirdRow: FC<{ item: IOrderItem; order: IBuyerCabinetOrder }> = ({ item, order }) => {
  const { trackingNumber, estimatedDeliveryDate, isParcelShop } = order
  return (
    <Flex gap={6}>
      <Text style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{isParcelShop ? 'В пункт выдачи DPD' : 'Курьером DPD'}</Text>
      <Text style={{ fontSize: 12, fontWeight: 600, color: primaryBlack, whiteSpace: 'nowrap' }}>
        {estimatedDeliveryDate && getOrderDateString(estimatedDeliveryDate)}
      </Text>
      {trackingNumber && <TrackNumber trackNumber={trackingNumber} />}
    </Flex>
  )
}
