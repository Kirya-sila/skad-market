import React from 'react'
import { BuyerContainer } from '@/original-pages/Order/BuyerContainer'
import css from '@/original-pages/Order/Order.module.scss'
import { OrderLayout } from '@/original-pages/Order/OrderLayout/OrderLayout'
import { OrderSummary } from '@/original-pages/Order/OrderSummary'
import { WayToGet } from '@/original-pages/Order/WayToGet'
import { WayToPay } from '@/original-pages/Order/WayToPay'
import { appRoutes } from '@/app-settings'
import { ButtonBack, Flex, FlexColumn } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'
import { useOrder } from '@/lib/queries'

interface OrderPageProps {
  params: { id: string }
}

const OrderPage = ({ params }: OrderPageProps) => {
  const { id } = params
  const { data: orderData, isLoading } = useOrder(id)

  return (
    <OrderLayout>
      <FlexColumn classname={css.order}>
        <ButtonBack to={appRoutes.cart}>Вернуться в корзину</ButtonBack>
        <span className={css.orderTitle}>Оформление заказа</span>
        {!isLoading ? (
          <Flex classname={css.orderContainer}>
            <FlexColumn classname={css.orderInfo}>
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

export default OrderPage