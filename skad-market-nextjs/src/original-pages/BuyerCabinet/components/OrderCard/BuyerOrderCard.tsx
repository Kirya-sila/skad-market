import { FC } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { HandleOrderButtons } from '../HandleOrderButtons'
import { SecondRow, ThirdRow } from '../OrderItem'
import { BuyerOrderCardHeader } from './BuyerOrderCardHeader'
import { IBuyerCabinetOrder } from '@/interfaces'
import { OrderItem } from '@/widgets/OrderItem'

interface IBuyerOrderCard {
  currentOrder: IBuyerCabinetOrder
}

export const BuyerOrderCard: FC<IBuyerOrderCard> = observer(({ currentOrder }) => {
  return (
    <Flex gap={40} style={{ width: '100%' }}>
      <Flex vertical gap={24} style={{ width: '100%' }}>
       {currentOrder && <BuyerOrderCardHeader currentOrder={currentOrder} />}
        <Flex vertical gap={16}>
          {currentOrder?.allOrderItems.map((item) => (
            <OrderItem
              key={item.offerName}
              image={item.imageUrl}
              title={item.offerName}
              secodRow={<SecondRow item={item} />}
              thirdRow={<ThirdRow item={item} order={currentOrder} />}
            />
          ))}
        </Flex>
        {currentOrder && <HandleOrderButtons currentOrder={currentOrder} />}
      </Flex>
    </Flex>
  )
})
