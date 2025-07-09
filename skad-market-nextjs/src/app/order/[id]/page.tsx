'use client'

import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { BuyerContainer } from '@/original-pages/Order/BuyerContainer'
import css from '@/original-pages/Order/Order.module.scss'
import { OrderLayout } from '@/original-pages/Order/OrderLayout/OrderLayout'
import { OrderSummary } from '@/original-pages/Order/OrderSummary'
import { WayToGet } from '@/original-pages/Order/WayToGet'
import { WayToPay } from '@/original-pages/Order/WayToPay'
import { appRoutes } from '@/app-settings'
import { authorizationStore } from '@/features/authorization'
import { orderStore } from '@/features/order/model/orderStore'
import { ButtonBack, Flex, FlexColumn } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

interface OrderPageProps {
  params: { id: string }
}

const Order = observer(({ params }: OrderPageProps) => {
  const { id } = params
  const { isLoading, getOrder, setLoadingStatus, getBuyerInfo, isBuyerInfoLoading } = orderStore
  const { handleOpenAuthorizationModal } = authorizationStore

  useEffect(() => {
    setLoadingStatus(false)
    handleOpenAuthorizationModal(false)
    getOrder(id ?? '')
    getBuyerInfo(id ?? '')
  }, [id])

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

export default Order