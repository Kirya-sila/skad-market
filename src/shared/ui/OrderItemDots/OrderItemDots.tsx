import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { DotsWithTooltip } from '../DotsWithTooltip'
import { CartIcon } from '@/assets/icons'
import { Spinner } from '@/shared/ui/Spinner'
import { primaryDarkestGray } from '@/theme'

interface IOrderItemDots {
  orderItemId: string
  removeOrderItem: (orderItemId: string) => void
  loading: boolean
}

const { Text } = Typography

export const OrderItemDots: FC<IOrderItemDots> = observer(({ orderItemId, removeOrderItem, loading }) => {
  const tooltipContent = (
    <Flex gap={8} align='center'>
      <CartIcon />
      <Text
        style={{ fontSize: 14, lineHeight: '24px', fontWeight: 600, color: primaryDarkestGray }}
        onClick={() => removeOrderItem(orderItemId)}
      >
        Переместить в Корзину
      </Text>
      {loading && (
        <Flex style={{ width: 20, height: 20 }} align='center'>
          <Spinner />
        </Flex>
      )}
    </Flex>
  )

  return <DotsWithTooltip tooltipContent={tooltipContent} name={orderItemId} />
})
