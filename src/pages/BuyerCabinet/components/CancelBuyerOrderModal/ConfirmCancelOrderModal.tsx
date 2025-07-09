import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './CancelBuyerOrderModal.module.scss'
import { buyerCabinetStore } from '@/features/buyer'
import { BaseModalContainer, CardTitle } from '@/shared/ui'

interface IConfirmCancelOrderModal {
  orderId: string
}

const { Text } = Typography

export const ConfirmCancelOrderModal: FC<IConfirmCancelOrderModal> = observer(({ orderId }) => {
  const {
    showConfirmCancelOrderModal,
    setOrderItemsIdsToDelete,
    confirmDeleteOrderItems,
    deleteOrderItemsLoading,
  } = buyerCabinetStore

  const handleConfirmOrderCancel = async () => {
    await confirmDeleteOrderItems(orderId)
  }

  const handleCancel = () => {
    setOrderItemsIdsToDelete([])
    showConfirmCancelOrderModal('')
  }

  return (
    <BaseModalContainer bodyClassName={css.confirmDelete} onClose={handleCancel}>
      <Flex vertical style={{ padding: '0 40px 40px' }} gap={24}>
        <CardTitle>Отмена заказа</CardTitle>

        <Text style={{ fontSize: 16 }}>
          Вы уверены, что хотите отменить заказ <br /> выбранных товаров?
        </Text>

        <Flex gap={8}>
          <Button style={{ width: '100%' }} size='large' onClick={handleCancel}>
            Нет
          </Button>
          <Button
            style={{ width: '100%' }}
            type='primary'
            danger
            size='large'
            onClick={handleConfirmOrderCancel}
            loading={deleteOrderItemsLoading}
          >
            Да
          </Button>
        </Flex>
      </Flex>
    </BaseModalContainer>
  )
})
