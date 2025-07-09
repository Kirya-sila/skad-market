import { FC } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { BuyerOrderStatusEnum } from '../constants'
import { CancelBuyerOrderModal } from './CancelBuyerOrderModal'
import { ConfirmCancelOrderModal } from './CancelBuyerOrderModal/ConfirmCancelOrderModal'
import { buyerCabinetStore } from '@/features/buyer'
import { IBuyerCabinetOrder } from '@/interfaces'
import { DangerTextButton, PrimaryTextButton } from '@/shared/ui'

interface IHandleOrderButtons {
  currentOrder: IBuyerCabinetOrder | Record<string, never>
  showPayButton?: boolean
}

export const HandleOrderButtons: FC<IHandleOrderButtons> = observer(({ currentOrder, showPayButton = true }) => {
  const { showCancelOrderModal, openedCancelOrderModalId, openConfirmCancelOrderModal } = buyerCabinetStore
  const orderStatus = currentOrder.status
  const isOrderCanceled =
    orderStatus !== BuyerOrderStatusEnum.canceled &&
    orderStatus !== BuyerOrderStatusEnum.canceledByByuer &&
    orderStatus !== BuyerOrderStatusEnum.canceledByManager

  return (
    <>
      <Flex gap={24} align='center'>
        {isOrderCanceled && (
          <>
            {orderStatus === BuyerOrderStatusEnum.delivered && (
              <DangerTextButton onClick={() => console.log('Оформить возврат')}>Оформить возврат</DangerTextButton>
            )}
            {orderStatus !== BuyerOrderStatusEnum.delivered && (
              <DangerTextButton onClick={() => showCancelOrderModal(currentOrder.id)}>Отменить заказ</DangerTextButton>
            )}
          </>
        )}
        {orderStatus === BuyerOrderStatusEnum.waitingForPayment && showPayButton && (
          <PrimaryTextButton
            onClick={() => {
              console.log('Оплатить заказ')
            }}
          >
            Оплатить
          </PrimaryTextButton>
        )}
        {/* {orderStatus === BuyerOrderStatusEnum.delivered ||
          (orderStatus === BuyerOrderStatusEnum.canceled && (
            <PrimaryTextButton
              onClick={() => {
                console.log('Повторить заказ')
              }}
            >
              Повторить заказ
            </PrimaryTextButton>
          ))} */}
      </Flex>
      {openedCancelOrderModalId === currentOrder.id && (
        <CancelBuyerOrderModal orderId={currentOrder.id} orderItems={currentOrder.allOrderItems} />
      )}
      {openConfirmCancelOrderModal === currentOrder.id && <ConfirmCancelOrderModal orderId={currentOrder.id} />}
    </>
  )
})
