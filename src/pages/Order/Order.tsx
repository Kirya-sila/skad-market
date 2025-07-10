import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { BuyerContainer } from './BuyerContainer'
import css from './Order.module.scss'
import { OrderLayout } from './OrderLayout/OrderLayout'
import { OrderSummary } from './OrderSummary'
import { WayToGet } from './WayToGet'
import { WayToPay } from './WayToPay'
import { appRoutes } from '@/app-settings'
import { authorizationStore } from '@/features/authorization'
import { orderStore } from '@/features/order/model/orderStore'
import { ButtonBack, Flex, FlexColumn } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

interface OrderProps {
  orderId: string
}

export const Order = observer(({ orderId }: OrderProps) => {
  const { isLoading, getOrder, setLoadingStatus, getBuyerInfo, isBuyerInfoLoading } = orderStore
  const { handleOpenAuthorizationModal } = authorizationStore

  useEffect(() => {
    setLoadingStatus(false)
    handleOpenAuthorizationModal(false)
    getOrder(orderId)
    getBuyerInfo(orderId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  return (
    <OrderLayout>
      <FlexColumn classname={css.order}>
        <ButtonBack to={appRoutes.cart}>Вернуться в корзину</ButtonBack>
        <span className={css.orderTitle}>Оформление заказа</span>
        {!isLoading && !isBuyerInfoLoading ? (
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
})
