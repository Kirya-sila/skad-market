import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { SecondRow } from '../../components'
import { Dots } from './Dots'
import { buyerCabinetStore } from '@/features/buyer'
import { TrackNumber } from '@/widgets'
import { OrderItem } from '@/widgets/OrderItem'

export const BuyerCabinetOrderItems = observer(() => {
  const { currentOrder } = buyerCabinetStore
  return (
    <>
      {currentOrder.allOrderItems?.map((item, i) => (
        <Flex key={item.id} justify='space-between'>
          <OrderItem
            key={item.offerName}
            image={item.imageUrl}
            title={item.offerName}
            secodRow={<SecondRow item={item} showWeight />}
            thirdRow={<TrackNumber trackNumber={currentOrder.trackingNumber} />}
            wheelCode={item.wheelCode}
          />
          <Dots orderItemId={item.id} />
        </Flex>
      ))}
    </>
  )
})
