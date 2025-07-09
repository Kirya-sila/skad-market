import { FC } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import css from './Dots.module.scss'
import { CartIcon, Dots as DotsIcon } from '@/assets/icons'
import { orderStore } from '@/features/order/model/orderStore'
import { Spinner } from '@/shared/ui/Spinner'
import { Tooltip } from '@/shared/ui/Tooltip'

export const Dots: FC<{ orderItemId: string }> = observer(({ orderItemId }) => {
  const { id = '' } = useParams()
  const { deleteOrderItem, deleteOrderItemLoading } = orderStore

  const tooltipContent = (
    <Flex gap={8} align='center'>
      <CartIcon />
      <span className={css.tooltipText} onClick={() => deleteOrderItem(orderItemId, id)}>
        Переместить в Корзину
      </span>
      {
        deleteOrderItemLoading && (
          <Flex style={{ width: 20, height: 20 }} align='center'>
            <Spinner />
          </Flex>
        )
      }
    </Flex>
  )

  return (
    <div className={css.dots}>
      <Tooltip id='order-tooltip' content={tooltipContent} clickable place='bottom'>
        <div>
          <DotsIcon />
        </div>
      </Tooltip>
    </div>
  )
})
