import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CartIcon } from '@/assets/icons'
import { buyerCabinetStore } from '@/features/buyer'
import { DotsWithTooltip } from '@/shared/ui/DotsWithTooltip'
import { Spinner } from '@/shared/ui/Spinner'
import { primaryDarkestGray } from '@/theme'

interface IDots {
  orderItemId: string
}

const { Text } = Typography

const StyledText = styled(Text)({
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 600,
  color: primaryDarkestGray,
})

export const Dots: FC<IDots> = observer(({ orderItemId }) => {
  const { id = '' } = useParams()
  const { addOrderItemToCart, addItemToCartLoading, /* evaluateProduct */ } = buyerCabinetStore

  const handleRemoveOrderItem = (itemId: string) => {
    addOrderItemToCart(itemId, id)
  }

  const tooltipContent = (
    <Flex vertical gap={8}>
      <Flex gap={8} align='center' onClick={() => handleRemoveOrderItem(orderItemId)}>
        <CartIcon />
        <StyledText>Переместить в Корзину</StyledText>
        {addItemToCartLoading && (
          <Flex style={{ width: 20, height: 20 }} align='center'>
            <Spinner />
          </Flex>
        )}
      </Flex>
      {/* <Flex gap={8} align='center' onClick={() => evaluateProduct(orderItemId, id)}>
        <StarIcon />
        <StyledText>Оценить товар</StyledText>
      </Flex> */}
    </Flex>
  )

  return <DotsWithTooltip tooltipContent={tooltipContent} name={orderItemId} />
})
