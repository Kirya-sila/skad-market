'use client'

import { useEffect } from 'react'
import { Flex, Space, Spin, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { CancelOrderConfirmModal, CancelOrderModal, OrderCanceledInfoModal } from './CancelOrder'
import { ChooseManager } from './ChooseManager/ChooseManager'
import { DeliveryOrder } from './DeliveryOrder'
import { HistoryModal } from './History'
import { OrderAdditionalInfoCards } from './OrderAdditionalInfoCards'
import { OrderInfo } from './OrderInfo'
import { OrderMainContentWrapper } from './OrderMainContentWrapper'
import { OrderTabs } from './OrderTabs'
import { StoreOrderItemCard } from './StoreOrderItemCard'
import { OrderTabsTypes } from '@/constants'
import { managersOrderStore } from '@/features/manager'

const { Text, Title } = Typography

interface ManagerOrderProps {
  orderId: string
}

export const ManagerOrder = observer(({ orderId }: ManagerOrderProps) => {
  const {
    ortderTab,
    getManagersOrder,
    orderDataLoading,
    historyModalOpen,
    cancelOrderModalOpen,
    confirmCancelOrderModalOpen,
    orderCanceledInfoModalOpen,
    warehouseData,
    orderNumber,
    trackNumber,
  } = managersOrderStore

  useEffect(() => {
    getManagersOrder(orderId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  if (orderDataLoading) {
    return <Spin />
  }

  return (
    <>
      <Space direction='vertical' size={[0, 32]}>
        <Flex vertical gap={4}>
          <Flex align='center' justify='space-between'>
            <Title level={3} style={{ margin: 0 }}>
              Заказ {orderNumber.internalNumber ?? ''}
            </Title>
            <ChooseManager />
          </Flex>
          <OrderInfo />
        </Flex>

        <Flex gap={24}>
          <OrderMainContentWrapper>
            <Flex justify='space-between' style={{ width: '100%', marginBottom: 24 }}>
              <OrderTabs />
              {ortderTab === OrderTabsTypes.storehouse && (
                <Text>*для снятия и постановки резерва требуется отправить запрос</Text>
              )}
            </Flex>
            {ortderTab === OrderTabsTypes.storehouse && (
              <Flex vertical gap={16}>
                {warehouseData.map((data, i) => (
                  <StoreOrderItemCard key={i} data={data} trackNumber={trackNumber} />
                ))}
              </Flex>
            )}
            {ortderTab === OrderTabsTypes.delivery  && <DeliveryOrder />}
          </OrderMainContentWrapper>
          <OrderAdditionalInfoCards />
        </Flex>
      </Space>
      {historyModalOpen && <HistoryModal />}
      {cancelOrderModalOpen && <CancelOrderModal orderNumber={orderNumber.internalNumber} />}
      {confirmCancelOrderModalOpen && (
        <CancelOrderConfirmModal orderNumber={orderNumber.internalNumber} orderId={orderId} />
      )}
      {orderCanceledInfoModalOpen && <OrderCanceledInfoModal orderNumber={orderNumber.internalNumber} />}
    </>
  )
})
