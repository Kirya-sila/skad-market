import { OrderLayout } from '@/components/order/OrderLayout'
import { OrderSummary } from '@/components/order/OrderSummary'
import { BuyerContainer } from '@/components/order/BuyerContainer'
import { WayToGet } from '@/components/order/WayToGet'
import { WayToPay } from '@/components/order/WayToPay'
import { ButtonBack, Flex, FlexColumn } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { appRoutes } from '@/app-settings'
import { useOrder } from '@/lib/queries'

interface OrderPageProps {
  params: { id: string }
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = params
  const { data: orderData, isLoading } = useOrder(id)

  return (
    <OrderLayout>
      <FlexColumn classname='order'>
        <ButtonBack to={appRoutes.cart}>Вернуться в корзину</ButtonBack>
        <span className='orderTitle'>Оформление заказа</span>
        {!isLoading ? (
          <Flex classname='orderContainer'>
            <FlexColumn classname='orderInfo'>
              <BuyerContainer />
              <WayToGet />
              <WayToPay />
            </FlexColumn>
            <OrderSummary />
          </Flex>
        ) : (
          <Spinner />
        )}
      </FlexColumn>
    </OrderLayout>
  )
}