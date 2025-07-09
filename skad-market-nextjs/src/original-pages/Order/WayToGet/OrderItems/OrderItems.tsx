import { FC } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import css from './OrderItems.module.scss'
import { orderStore } from '@/features/order/model/orderStore'
import { OrderItemData } from '@/interfaces'
import { plural } from '@/shared/libs/utils/string'
import { FlexColumn, FlexRow, OrderItemDots } from '@/shared/ui'
import { OrderItem } from '@/widgets/OrderItem'

interface IOrderItems {
  orderItems: OrderItemData[]
}

export const OrderItems: FC<IOrderItems> = observer(({ orderItems }) => {
  const { id = '' } = useParams()
  const { deleteOrderItem, deleteOrderItemLoading } = orderStore

  const handleRemoveOrderItem = (itemId: string) => {
    deleteOrderItem(itemId, id)
  }

  return (
    <FlexColumn classname={css.itemsContainer}>
      {orderItems.map((item, i) => (
        <FlexRow key={item.productId} classname={css.item}>
          <OrderItem
            title={item.offerName}
            image={item.imageUrl ?? productCardImageSrc3}
            secodRow={
              <FlexRow>
                <span className={css.characteristic}>
                  {item.itemsAmount} {plural(item.itemsAmount, ['товар', 'товара', 'товаров'])}{' '}
                  {item.totalAggregatedWeight} кг
                </span>
                <span className={css.price}>{item.aggregatedOrderItemPrice.toLocaleString()} ₽ </span>
              </FlexRow>
            }
          />
          {orderItems.length > 1 && (
            <OrderItemDots
              removeOrderItem={handleRemoveOrderItem}
              loading={deleteOrderItemLoading}
              orderItemId={item.id}
            />
          )}
        </FlexRow>
      ))}
    </FlexColumn>
  )
})
