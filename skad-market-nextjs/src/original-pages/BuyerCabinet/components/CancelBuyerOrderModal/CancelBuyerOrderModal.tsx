import { FC, useMemo } from 'react'
import { Button, Checkbox, CheckboxProps, Flex, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { observer } from 'mobx-react-lite'
import { SecondRow } from '../OrderItem'
import css from './CancelBuyerOrderModal.module.scss'
import { buyerCabinetStore } from '@/features/buyer'
import { IOrderItem } from '@/interfaces'
import { AntCheckbox, BaseModalContainer, SectionTitle } from '@/shared/ui'
import { primaryDarkestGray } from '@/theme'
import { OrderItem } from '@/widgets/OrderItem'

interface ICancelBuyerOrder {
  orderId: string
  orderItems: IOrderItem[]
}

const { Title } = Typography

export const CancelBuyerOrderModal: FC<ICancelBuyerOrder> = observer(({ orderItems, orderId }) => {
  const {
    showCancelOrderModal,
    showConfirmCancelOrderModal,
    setOrderItemsIdsToDelete,
    orderItemsIdsToDelete,
    setCurrentOrderId,
    shouldMoveItemsToCart,
    moveItemsToCart,
  } = buyerCabinetStore

  const allItemsIds = useMemo(() => orderItems.map((item) => item.id), [orderItems])

  const onChange = (checkedValues: string[]) => {
    setOrderItemsIdsToDelete(checkedValues)
  }

  const onCheckAll: CheckboxProps['onChange'] = (e) => {
    setOrderItemsIdsToDelete(e.target.checked ? allItemsIds : [])
  }

  const handleClickCancel = () => {
    setCurrentOrderId(orderId)
    showCancelOrderModal('')
    showConfirmCancelOrderModal(orderId)
  }

  return (
    <BaseModalContainer
      bodyClassName={css.body}
      onClose={() => {
        showCancelOrderModal('')
        setOrderItemsIdsToDelete([])
      }}
    >
      <Flex vertical style={{ padding: '0 40px 40px' }}>
        <Title level={4} style={{ marginBottom: 24, marginTop: 0 }}>
          Отмена заказа
        </Title>
        <Flex vertical gap={24}>
          <SectionTitle style={{ color: primaryDarkestGray }}>Выберите товары, которые хотите отменить</SectionTitle>
          <AntCheckbox onChange={onCheckAll} checked={allItemsIds.length === orderItemsIdsToDelete.length}>
            Выбрать все
          </AntCheckbox>
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={orderItemsIdsToDelete}>
            <Flex vertical gap={16}>
              {orderItems.map((item) => (
                <AntCheckbox key={item.id} value={item.id}>
                  <OrderItem
                    image={item.imageUrl}
                    title={item.offerName}
                    secodRow={<SecondRow item={item} showStatus={false} />}
                  />
                </AntCheckbox>
              ))}
            </Flex>
          </Checkbox.Group>
          <AntCheckbox
            onChange={(e: CheckboxChangeEvent) => {
              moveItemsToCart(e.target.checked)
            }}
            checked={shouldMoveItemsToCart}
            disabled={!orderItemsIdsToDelete.length}
          >
            Отправить отмененные товары в Корзину
          </AntCheckbox>
          <Button
            type='primary'
            danger
            size='large'
            onClick={handleClickCancel}
            disabled={!orderItemsIdsToDelete.length}
          >
            Отменить заказ
          </Button>
        </Flex>
      </Flex>
    </BaseModalContainer>
  )
})
