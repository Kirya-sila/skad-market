import { Button, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { DeliveryOrderItemCard } from './DeliveryOrderItemCard'
import { managersOrderStore } from '@/features/manager'
import { OrderStatus } from '@/interfaces'

export const DeliveryOrder = observer(() => {
  const { orderId = '' } = useParams()
  const {
    deliveryData,
    sendOrderToDelivery,
    sendAllLoading,
    orderStatusInfo: { status },
  } = managersOrderStore

  return (
    <Flex vertical gap={32}>
      <Flex vertical gap={16}>
        {deliveryData?.map((data) => <DeliveryOrderItemCard key={data.id} data={data} />)}
      </Flex>
      {status !== OrderStatus.sent && (
        <Button
          loading={sendAllLoading}
          variant='filled'
          type='primary'
          size='large'
          onClick={() => sendOrderToDelivery(orderId)}
          disabled={deliveryData?.[0].isDeliveryRequestSent || sendAllLoading}
        >
          Отправить все
        </Button>
      )}
    </Flex>
  )
})
