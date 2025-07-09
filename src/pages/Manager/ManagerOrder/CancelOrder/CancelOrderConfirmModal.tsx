import { FC } from 'react'
import { Button, Flex } from 'antd'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './CancelOrderModal.module.scss'
import { managersOrderStore } from '@/features/manager'
import { BaseModalContainer, CardTitle } from '@/shared/ui'

interface ICancelOrderConfirmModal {
  orderNumber: number | undefined
  orderId: string
}

export const CancelOrderConfirmModal: FC<ICancelOrderConfirmModal> = observer(({ orderNumber, orderId }) => {
  const { confirmOrderCancel, handleOpenConfirmCancelOrder } = managersOrderStore

  const handleConfirmOrderCancel = () => {
    confirmOrderCancel(orderId)
  }

  return (
    <BaseModalContainer
      bodyClassName={cn(css.body, css.confirm)}
      onClose={() => {
        handleOpenConfirmCancelOrder(false)
      }}
    >
      <Flex vertical style={{ padding: '0 40px 40px' }} gap={24}>
        <CardTitle>Отменить заказ {orderNumber || ''}?</CardTitle>

        <Flex gap={8}>
          <Button style={{ width: '100%' }} size='large' onClick={() => handleOpenConfirmCancelOrder(false)}>
            Нет
          </Button>
          <Button style={{ width: '100%' }} type='primary' danger size='large' onClick={handleConfirmOrderCancel}>
            Да
          </Button>
        </Flex>
      </Flex>
    </BaseModalContainer>
  )
})
