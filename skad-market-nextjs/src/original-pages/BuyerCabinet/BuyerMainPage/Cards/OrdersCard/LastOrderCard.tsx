import { observer } from 'mobx-react-lite'
import { generatePath, useNavigate } from 'react-router-dom'
import { Card } from '../../../components/Card'
import { LastOrderCardWrapper } from './LastOrderCardWrapper'
import { NoOrders } from './NoOrders'
import { appRoutes } from '@/app-settings'
import { buyerCabinetStore } from '@/features/buyer'
import { BuyerOrderCard } from '@/pages'
import { ButtonForward } from '@/shared/ui'

// interface IOrdersCard {}

export const LastOrderCard = observer(() => {
  const navigate = useNavigate()
  const { orders } = buyerCabinetStore

  const titleRightContent = !!orders.length && (
    <ButtonForward to={appRoutes.buyer.orders.root}>Все заказы</ButtonForward>
  )

  const handleOrder = async (orderId: string) => {
    navigate(generatePath(appRoutes.buyer.orders.orderItem, { orderId }))
  }

  const LastOrder = (
    <LastOrderCardWrapper onClick={() => handleOrder(orders[0].id)}>
      <BuyerOrderCard currentOrder={orders[0]} />
    </LastOrderCardWrapper>
  )

  const content = !orders.length ? <NoOrders /> : LastOrder

  return (
    <Card title='Заказы' titleRightContent={titleRightContent}>
      {content}
    </Card>
  )
})
